import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = () => {
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<string>('');
    const [type, setType] = useState<string>('income');
    const [note, setNote] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newRecord = { amount, date, type, note };
        
        // ส่งข้อมูลไปยัง API
        try {
            await axios.post('/api/expenses', newRecord);
            alert('Record added successfully!');
        } catch (error) {
            console.error('Error saving record:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} required />
            </div>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
                <label>Type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <div>
                <label>Note:</label>
                <input type="text" value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
            <button type="submit">Add Record</button>
        </form>
    );
};

export default ExpenseForm;
