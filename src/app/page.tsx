"use client";  // เพิ่มบรรทัดนี้เพื่อระบุให้ไฟล์นี้ทำงานในฝั่ง Client

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const IncomeExpenseTracker: React.FC = () => {
  // สร้าง state สำหรับเก็บข้อมูลต่างๆ
  const [entries, setEntries] = useState<any[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [type, setType] = useState<string>('income');
  const [note, setNote] = useState<string>('');

  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  // ฟังก์ชันสำหรับเพิ่มรายการใหม่
  const handleAddEntry = () => {
    const newEntry = {
      amount: parseFloat(amount.toString()),
      date: date,
      type: type,
      note: note
    };

    setEntries([...entries, newEntry]);
  };

  // คำนวณยอดรวมรายรับและรายจ่าย
  useEffect(() => {
    const income = entries
      .filter(entry => entry.type === 'income')
      .reduce((acc, entry) => acc + entry.amount, 0);
    const expense = entries
      .filter(entry => entry.type === 'expense')
      .reduce((acc, entry) => acc + entry.amount, 0);

    setTotalIncome(income);
    setTotalExpense(expense);
  }, [entries]);

  // ข้อมูลสำหรับกราฟ
  const chartData = {
    labels: entries.map(entry => entry.date),
    datasets: [
      {
        label: 'รายรับ',
        data: entries
          .filter(entry => entry.type === 'income')
          .map(entry => entry.amount),
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'รายจ่าย',
        data: entries
          .filter(entry => entry.type === 'expense')
          .map(entry => entry.amount),
        borderColor: 'red',
        fill: false,
      }
    ],
  };

  return (
    <div className="container">
      <h1>โปรแกรมบันทึกรายรับรายจ่าย</h1>

      {/* ฟอร์มสำหรับบันทึกรายการ */}
      <div className="form">
        <input
          type="number"
          placeholder="จำนวนเงิน"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">รายรับ</option>
          <option value="expense">รายจ่าย</option>
        </select>
        <input
          type="text"
          placeholder="โน้ต"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={handleAddEntry}>เพิ่มรายการ</button>
      </div>

      {/* แสดงยอดรวมรายรับและรายจ่าย */}
      <div className="summary">
        <h2>ยอดรวมรายรับ: {totalIncome} บาท</h2>
        <h2>ยอดรวมรายจ่าย: {totalExpense} บาท</h2>
      </div>

      {/* แสดงรายการที่บันทึก */}
      <div className="entries">
        <h3>รายการที่บันทึก:</h3>
        <ul>
          {entries.map((entry, index) => (
            <li key={index}>
              {entry.date} - {entry.type === 'income' ? 'รายรับ' : 'รายจ่าย'}: {entry.amount} บาท (โน้ต: {entry.note})
            </li>
          ))}
        </ul>
      </div>

      {/* แสดงกราฟ */}
      <div className="chart">
        <h3>กราฟรายรับและรายจ่าย</h3>
        <Line data={chartData} />
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .form {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .summary, .entries, .chart {
          margin-bottom: 20px;
        }
        input, select, button {
          padding: 10px;
          font-size: 16px;
        }
        button {
          background-color: blue;
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default IncomeExpenseTracker;
