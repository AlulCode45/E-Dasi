'use client'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, ChangeEvent } from 'react';
import { HiSearch } from '@react-icons/all-files/hi/HiSearch';
import Link from 'next/link';


interface Student {
    nisn: string;
    nama: string;
    nis: number;
    tanggalLahir: string;
    alamat: string;
    jenisKelamin: string;
}

export default function KelolaSiswa() {
    const students: Student[] = [
        { nisn: "0012345678", nama: "Ahmad Zaki", nis: 12345, tanggalLahir: "01-01-2005", alamat: "Jl. Merdeka 1", jenisKelamin: "Laki-Laki" },
        { nisn: "0012345679", nama: "Budi Santoso", nis: 12346, tanggalLahir: "02-02-2006", alamat: "Jl. Merdeka 2", jenisKelamin: "Laki-Laki" },
        { nisn: "0012345680", nama: "Citra Dewi", nis: 12347, tanggalLahir: "03-03-2005", alamat: "Jl. Merdeka 3", jenisKelamin: "Perempuan" },
        { nisn: "0012345681", nama: "Deni Susanto", nis: 12348, tanggalLahir: "04-04-2006", alamat: "Jl. Merdeka 4", jenisKelamin: "Laki-Laki" },
        { nisn: "0012345682", nama: "Eka Putri", nis: 12349, tanggalLahir: "05-05-2005", alamat: "Jl. Merdeka 5", jenisKelamin: "Perempuan" },
        { nisn: "0012345683", nama: "Fajar Pratama", nis: 12350, tanggalLahir: "06-06-2006", alamat: "Jl. Merdeka 6", jenisKelamin: "Laki-Laki" },
        { nisn: "0012345684", nama: "Gita Rahma", nis: 12351, tanggalLahir: "07-07-2005", alamat: "Jl. Merdeka 7", jenisKelamin: "Perempuan" },
        { nisn: "0012345685", nama: "Hendra Gunawan", nis: 12352, tanggalLahir: "08-08-2006", alamat: "Jl. Merdeka 8", jenisKelamin: "Laki-Laki" },
        { nisn: "0012345686", nama: "Indah Permata", nis: 12353, tanggalLahir: "09-09-2005", alamat: "Jl. Merdeka 9", jenisKelamin: "Perempuan" },
        { nisn: "0012345687", nama: "Joko Setiawan", nis: 12354, tanggalLahir: "10-10-2006", alamat: "Jl. Merdeka 10", jenisKelamin: "Laki-Laki" },
        { nisn: "0012345688", nama: "Kiki Amalia", nis: 12355, tanggalLahir: "11-11-2005", alamat: "Jl. Merdeka 11", jenisKelamin: "Perempuan" },
        { nisn: "0012345689", nama: "Lukman Hakim", nis: 12356, tanggalLahir: "12-12-2006", alamat: "Jl. Merdeka 12", jenisKelamin: "Laki-Laki" },
        { nisn: "0012345690", nama: "Maya Sari", nis: 12357, tanggalLahir: "13-01-2005", alamat: "Jl. Merdeka 13", jenisKelamin: "Perempuan" },
        { nisn: "0012345691", nama: "Nanda Kusuma", nis: 12358, tanggalLahir: "14-02-2006", alamat: "Jl. Merdeka 14", jenisKelamin: "Laki-Laki" },
        { nisn: "0012345692", nama: "Oki Firmansyah", nis: 12359, tanggalLahir: "15-03-2005", alamat: "Jl. Merdeka 15", jenisKelamin: "Laki-Laki" },
        { nisn: "0012345693", nama: "Putri Ayu", nis: 12360, tanggalLahir: "16-04-2006", alamat: "Jl. Merdeka 16", jenisKelamin: "Perempuan" },
        { nisn: "0012345694", nama: "Qori Rahmat", nis: 12361, tanggalLahir: "17-05-2005", alamat: "Jl. Merdeka 17", jenisKelamin: "Laki-Laki" },
        { nisn: "0012345695", nama: "Rina Oktavia", nis: 12362, tanggalLahir: "18-06-2006", alamat: "Jl. Merdeka 18", jenisKelamin: "Perempuan" },
        { nisn: "0012345696", nama: "Satria Budi", nis: 12363, tanggalLahir: "19-07-2005", alamat: "Jl. Merdeka 19", jenisKelamin: "Laki-Laki" },
        { nisn: "0012345697", nama: "Tari Utami", nis: 12364, tanggalLahir: "20-08-2006", alamat: "Jl. Merdeka 20", jenisKelamin: "Perempuan" },
    ];

    const [listJenisKelamin] = useState([
        'Laki-Laki',
        'Perempuan'
    ])

    const [globalFilter, setGlobalFilter] = useState<string | null>(null);

    const handleGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGlobalFilter(e.target.value);
    };

    const editRowTemplate = (siswa: Student) => {
        return (
            <Link className='bg-blue-200 px-3 py-2 rounded' href={`/dashboard/kelola-siswa/edit/${siswa?.nisn}`} >Edit</Link>
        )
    }

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
