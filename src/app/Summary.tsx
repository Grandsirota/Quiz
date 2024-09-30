import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Summary = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axios.get('/api/expenses/summary');
                setTotalIncome(response.data.totalIncome);
                setTotalExpense(response.data.totalExpense);
            } catch (error) {
                console.error('Error fetching summary:', error);
            }
        };

        fetchSummary();
    }, []);

    return (
        <div>
            <h2>Summary</h2>
            <p>Total Income: ${totalIncome}</p>
            <p>Total Expense: ${totalExpense}</p>
        </div>
    );
};

export default Summary;
