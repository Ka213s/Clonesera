import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const UserActivityChart: React.FC = () => {
    const lineData: ChartData<'line'> = {
        labels: ['4 Apr', '5 Apr', '6 Apr', '7 Apr', '8 Apr', '9 Apr', '10 Apr'],
        datasets: [
            {
                label: 'Users',
                data: [50, 75, 60, 80, 90, 100, 90],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Sessions',
                data: [50, 55, 75, 85, 120, 160, 140],
                borderColor: 'rgba(255, 205, 86, 1)',
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                fill: true,
                tension: 0.4,
                borderDash: [5, 5],
            },
        ],
    };

    const barData: ChartData<'bar'> = {
        labels: Array.from({ length: 30 }, (_, i) => i + 1),
        datasets: [
            {
                label: 'Ave Page views per minute',
                data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 60)),
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

    const lineOptions: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'User Activity',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const barOptions: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Current Users',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
                <Line data={lineData} options={lineOptions} />
            </div>
            <div className="bg-white p-4 rounded shadow">
                <Bar data={barData} options={barOptions} />
            </div>
        </div>
    );
};

export default UserActivityChart;
