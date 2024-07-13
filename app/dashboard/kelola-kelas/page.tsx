'use client'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, ChangeEvent, useEffect } from 'react';
import { HiSearch } from '@react-icons/all-files/hi/HiSearch';
import Link from 'next/link';
import { client } from '@/utils/axiosUtils';
import Swal from 'sweetalert2';
import { Kelas } from '@/interfaces/kelas.interface';


export default function KelolaSiswa() {
    const [kelas, setKelas] = useState<Kelas[]>([])
    const [globalFilter, setGlobalFilter] = useState<string | null>(null);

    const handleGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGlobalFilter(e.target.value);
    };

    const handleDelete = async (id: number | null) => {
        return await client.delete(`/kelas/${id}`)
            .then(() => {
                setKelas(prevData => prevData.filter(data => data.id !== id));
                Swal.fire({
                    title: "Sukses",
                    text: "Sukses hapus kelas",
                    icon: "success"
                });
            }).catch((err) => {
                Swal.fire({
                    title: "Gagal",
                    text: "Gagal hapus kelas",
                    icon: "error"
                });
                console.log(err);
            });
    }

    const editRowTemplate = (kelas: Kelas) => {
        return (
            <div className='flex gap-2'>
                <Link className='bg-blue-200 px-3 py-2 rounded' href={`/dashboard/kelola-kelas/${kelas?.id}`}>View</Link>
                <Link className='bg-yellow-200 px-3 py-2 rounded' href={`/dashboard/kelola-kelas/edit/${kelas?.id}`} >Edit</Link>
                <button className='bg-red-200 px-3 py-2 rounded' onClick={() => {
                    //make confirmation dialog before delete
                    Swal.fire({
                        title: 'Apakah Anda Yakin?',
                        text: 'Menghapus Kelas sama dengan menghapus semua data siswa yang terkait dengan kelas ini. Data yang dihapus tidak dapat dikembalikan !',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Ya, Hapus',
                        cancelButtonText: 'Batal'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            handleDelete(kelas.id)
                        }
                    })
                }}>Delete</button>
            </div>
        )
    }

    useEffect(() => {
        const getKelas = async () => {
            return await client.get('/kelas').then(res => {
                setKelas(prevData => {
                    return res.data.data.map((kelas: any) => {
                        return {
                            id: kelas.id,
                            nama: kelas.nama,
                            jurusan: kelas.jurusan.nama,
                            jumlahSiswa: kelas.siswa.length,
                            tahunAjaran: kelas.tahunAjaran.tahun
                        }
                    })
                })
            }).catch(err => {
                console.log(err)
            })
        }
        getKelas()
    }, [])
    return (
        <>
            <div className="card bg-white shadow-md p-5 border-t-4 border-t-blue-400 rounded-md">
                <div className="flex justify-between mb-4 items-center">
                    <h1 className='font-semibold'>Data Kelas</h1>
                    <div className="action flex gap-3">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <HiSearch />
                            </span>
                            <input type="text" placeholder='Cari ...' className='border px-3 py-2 w-full focus:outline-none' onChange={e => handleGlobalFilterChange(e)} />
                        </div>
                        <Link href={'/dashboard/kelola-kelas/add'} className='bg-blue-400 text-white font-semibold px-3 py-2'>Tambah</Link>
                    </div>
                </div>
                <DataTable value={kelas} tableStyle={{ minWidth: '50rem' }}
                    paginator
                    showGridlines
                    rows={10}
                    globalFilter={globalFilter}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    removableSort
                    filterDisplay='menu'
                >
                    <Column field="nama" header="Nama Kelas" filterPlaceholder="Cari Kelas" sortable></Column>
                    <Column field="jurusan" header="Jurusan" filterPlaceholder="Cari JURUSAN" sortable></Column>
                    <Column field="tahunAjaran" header="Tahun Ajaran" filterPlaceholder="Cari Tahun Ajaran" sortable></Column>
                    <Column field="jumlahSiswa" header="Jumlah Siswa" filterPlaceholder="Cari Jumlah Siswa" sortable></Column>
                    <Column field="id" header="Aksi" body={editRowTemplate} ></Column>
                </DataTable>
            </div>
        </>
    )
}
