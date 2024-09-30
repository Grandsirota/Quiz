import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('income');
  const [note, setNote] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  // เช็คการยืนยันตัวตนจาก token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
    fetchTransactions(); // ดึงรายการเมื่อเข้าสู่ระบบสำเร็จ
  }, []);

  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions');
    const data = await response.json();
    setTransactions(data);
    calculateTotals(data);
  };

  const calculateTotals = (data) => {
    const income = data
      .filter((item) => item.type === 'income')
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const expense = data
      .filter((item) => item.type === 'expense')
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    setTotalIncome(income);
    setTotalExpense(expense);
  };

  const handleAddTransaction = async () => {
    const newTransaction = { amount, date, type, note };
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction),
    });
    if (response.ok) {
      fetchTransactions(); // อัปเดตรายการเมื่อบันทึกสำเร็จ
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Add Transaction</h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
        />
        <button onClick={handleAddTransaction}>Add</button>
      </div>

      <div>
        <h3>Transactions List</h3>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              {transaction.date} - {transaction.type} - {transaction.amount} - {transaction.note}
            </li>
          ))}
        </ul>
        <h4>Total Income: {totalIncome}</h4>
        <h4>Total Expense: {totalExpense}</h4>
      </div>
    </div>
  );
};

export default Dashboard;
