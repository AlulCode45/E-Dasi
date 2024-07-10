'use client'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, ChangeEvent, useEffect } from 'react';
import { HiSearch } from '@react-icons/all-files/hi/HiSearch';
import Link from 'next/link';
import { client } from '@/utils/axiosUtils';


interface Student {
    nisn: string;
    nama: string;
    nis: number;
    tanggalLahir: string;
    alamat: string;
    jenisKelamin: string;
}

export default function KelolaSiswa() {
    const [students, setStudent] = useState<Student[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string | null>(null);

    const handleGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGlobalFilter(e.target.value);
    };

    const editRowTemplate = (siswa: Student) => {
        return (
            <Link className='bg-blue-200 px-3 py-2 rounded' href={`/dashboard/kelola-siswa/edit/${siswa?.nisn}`} >Edit</Link>
        )
    }

    useEffect(() => {
        const getStudent = async () => {
            return await client.get('/siswa').then(res => {
                res.data.data.map((d: Student) => {
                    setStudent(prevData => {
                        return [...prevData, {
                            nisn: d.nisn,
                            nis: d.nis,
                            nama: d.nama,
                            alamat: d.alamat,
                            jenisKelamin: d.jenisKelamin,
                            tanggalLahir: d.tanggalLahir
                        }]
                    })
                })
            }).catch(err => {
                console.log(err)
            })
        }
        getStudent()
    }, [])

    return (
        <>
            <div className="card bg-white shadow-md p-5 border-t-4 border-t-blue-400 rounded-md">
                <div className="flex justify-between mb-4 items-center">
                    <h1 className='font-semibold'>Data Siswa</h1>
                    <div className="action flex gap-3">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <HiSearch />
                            </span>
                            <input type="text" placeholder='Cari ...' className='border px-3 py-2 w-full focus:outline-none' onChange={e => handleGlobalFilterChange(e)} />
                        </div>
                        <Link href={'/dashboard/kelola-siswa/add'} className='bg-blue-400 text-white font-semibold px-3 py-2'>Tambah</Link>
                    </div>
                </div>
                <DataTable value={students} tableStyle={{ minWidth: '50rem' }}
                    paginator
                    showGridlines
                    rows={10}
                    globalFilter={globalFilter}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    removableSort
                    filterDisplay='menu'
                >
                    <Column field="nisn" header="NISN" filterPlaceholder="Cari NISN" sortable></Column>
                    <Column field="nis" header="NIS" filterPlaceholder="Cari NIS" sortable></Column>
                    <Column field="nama" header="Nama" filterPlaceholder="Cari Nama" sortable></Column>
                    <Column field="tanggalLahir" header="Tanggal Lahir" filterPlaceholder="Cari Tanggal Lahir" sortable></Column>
                    <Column field="alamat" header="Alamat" filterPlaceholder="Cari Alamat" sortable></Column>
                    <Column field="jenisKelamin" header="Jenis Kelamin" sortable></Column>
                    <Column field="nisn" header="Aksi" body={editRowTemplate} ></Column>
                </DataTable>
            </div>
        </>
    )
}
