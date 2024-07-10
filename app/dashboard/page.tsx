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
import { useEffect, useState } from "react";
import axios from "axios";
import { client } from "@/utils/axiosUtils";

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
    const [kelas, setKelas] = useState([])
    const [siswa, setSiswa] = useState([])
    const [guru, setGuru] = useState([])

    useEffect(() => {
        const getKelas = async () => {
            return await client.get('/kelas').then(res => {
                setKelas(res.data.data)
            }).catch(err => {
                console.log(err)
            })
        }

        const getSiswa = async () => {
            return await client.get('/siswa').then(res => {
                setSiswa(res.data.data)
            }).catch(err => {
                console.log(err)
            })
        }
        const getGuru = async () => {
            return await client.get('/guru').then(res => {
                setGuru(res.data.data)
            }).catch(err => {
                console.log(err)
            })
        }
        getKelas()
        getSiswa()
        getGuru()

    }, [])

    const cardData = [
        {
            title: "Jumlah Siswa",
            icon: <HiOutlineUser className="text-4xl text-blue-500" />,
            count: siswa.length,
            color: 'blue',
            unit: 'siswa'
        },
        {
            title: "Jumlah Kelas",
            icon: <HiOutlineOfficeBuilding className="text-4xl text-red-500" />,
            count: kelas.length,
            color: 'red',
            unit: 'kelas'
        },
        {
            title: "Jumlah Guru",
            icon: <HiOutlineUsers className="text-4xl text-yellow-500" />,
            count: guru.length,
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
