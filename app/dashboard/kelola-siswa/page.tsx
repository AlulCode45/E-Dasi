'use client'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, ChangeEvent, useEffect } from 'react';
import { HiSearch } from '@react-icons/all-files/hi/HiSearch';
import Link from 'next/link';
import { client } from '@/utils/axiosUtils';
import Swal from 'sweetalert2';
import { Student } from '@/interfaces/siswa.interface';

export default function KelolaSiswa() {
    const [students, setStudents] = useState<Student[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string | null>(null);

    const handleDelete = async (nisn: string) => {
        try {
            await client.delete(`/siswa/${nisn}`);
            Swal.fire({
                title: "Sukses",
                text: "Sukses hapus siswa",
                icon: "success"
            });
            setStudents((prevData) => prevData.filter((d) => d.nisn !== nisn));
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Gagal",
                text: "Gagal hapus siswa",
                icon: "error"
            });
        }
    }

    const handleGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGlobalFilter(e.target.value);
    };

    const editRowTemplate = (siswa: Student) => {
        return (
            <div className='flex gap-2'>
                <Link className='bg-blue-200 px-3 py-2 rounded' href={`/dashboard/kelola-siswa/${siswa?.nisn}`} >View</Link>
                <Link className='bg-yellow-200 px-3 py-2 rounded' href={`/dashboard/kelola-siswa/edit/${siswa?.nisn}`} >Edit</Link>
                <button className='bg-red-200 px-3 py-2 rounded' onClick={() => handleDelete(siswa.nisn)}>Delete</button>
            </div>
        );
    }

    useEffect(() => {
        const getStudent = async () => {
            try {
                const res = await client.get('/siswa');
                const studentsData = res.data.data.map((d: Student) => ({
                    nisn: d.nisn,
                    nis: d.nis,
                    nama: d.nama,
                    alamat: d.alamat,
                    jenisKelamin: d.jenisKelamin,
                    tanggalLahir: new Date(d.tanggalLahir).toISOString().split('T')[0]
                }));
                setStudents(studentsData);
            } catch (err) {
                console.error(err);
            }
        }
        getStudent();
    }, []);

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
                            <input type="text" placeholder='Cari ...' className='border px-3 py-2 w-full focus:outline-none' onChange={handleGlobalFilterChange} />
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
    );
}
