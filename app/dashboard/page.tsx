'use client'

import CardHeader from "@/components/CardHeader";
import { HiOutlineOfficeBuilding } from "@react-icons/all-files/hi/HiOutlineOfficeBuilding";
import { HiOutlineUser } from "@react-icons/all-files/hi/HiOutlineUser";
import { HiOutlineUsers } from "@react-icons/all-files/hi/HiOutlineUsers";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
}
    from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Perkembangan Masuk Siswa',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const dataChart = {
    labels,
    datasets: [{
        label: 'Dataset 1',
        data: labels.map(() => faker.number.int({ min: 10, max: 1000 })),
        backgroundColor: 'rgba(66, 135, 245, 0.5)',
    },
    ],
};

export default function Dashboard() {
    const cardData = [
        {
            title: "Jumlah Siswa",
            icon: <HiOutlineUser className="text-4xl text-blue-500" />,
            count: 1200,
            color: 'blue',
            unit: 'siswa'
        },
        {
            title: "Jumlah Kelas",
            icon: <HiOutlineOfficeBuilding className="text-4xl text-red-500" />,
            count: 11,
            color: 'red',
            unit: 'kelas'
        },
        {
            title: "Jumlah Guru",
            icon: <HiOutlineUsers className="text-4xl text-yellow-500" />,
            count: 100,
            color: 'yellow',
            unit: 'guru'
        }
    ];

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
                {cardData.map((d, i) => (
                    <CardHeader card={d} key={i} className="border p-4 rounded" />
                ))}
            </div>
            <div className="bg-white w-full mt-5 p-5">
                <Bar options={options} data={dataChart} />
            </div>
        </>
    );
}
