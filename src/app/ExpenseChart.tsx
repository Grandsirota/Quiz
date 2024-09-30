import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const ExpenseChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get('/api/expenses/chart');
                
                // ตรวจสอบและตั้งค่า chartData ให้ตรงตามโครงสร้างที่ต้องการ
                const data = response.data;
                setChartData({
                    labels: data.labels, // เช่น ชื่อเดือน
                    datasets: [
                        {
                            label: 'Expenses',
                            data: data.expenses, // ข้อมูลรายจ่าย
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Income',
                            data: data.income, // ข้อมูลรายรับ
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchChartData();
    }, []);

    return (
        <div>
            <h2>Expense and Income Chart (Last 2 months)</h2>
            <Line data={chartData} />
        </div>
    );
};

export default ExpenseChart;
