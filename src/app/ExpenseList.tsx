import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('/api/expenses');
                setExpenses(response.data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    return (
        <div>
            <h2>Expense List</h2>
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>
                        {expense.date} - {expense.type === 'income' ? '+' : '-'}${expense.amount}: {expense.note}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
