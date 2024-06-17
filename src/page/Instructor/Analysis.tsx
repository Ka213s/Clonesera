import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import SalesChart from './SalesChart';
import UserActivityChart from './UserActivityChart';
import { FaChartLine } from 'react-icons/fa';

const Analyics = () => {
    return (
        <MainLayout>
            <div className="bg-gray-100 p-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <FaChartLine className="h-6 w-6 text-gray-700" />
                        <h1 className="text-2xl font-bold">Analytics</h1>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-2xl font-bold">839</p>
                        <h2 className="text-gray-700 text-lg font-bold">Subscribers</h2>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-2xl font-bold">950</p>
                        <h2 className="text-gray-700 text-lg font-bold">Weekly Visitors</h2>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <p className="text-2xl font-bold">20</p>
                        <h2 className="text-gray-700 text-lg font-bold">Weekly Sales</h2>
                    </div>
                </div>

               

                <SalesChart />
                <UserActivityChart />
            </div>
        </MainLayout>
    );
};

export default Analyics;
