'use client'
import { Student } from "@/interfaces/siswa.interface"
import { client } from "@/utils/axiosUtils"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import Swal from "sweetalert2"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { HiSearch } from "@react-icons/all-files/hi/HiSearch"


export default function ViewKelas() {
    const { idKelas } = useParams()
    const [students, setStudents] = useState<Student[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        nama: null,
        jurusan: null,
        tahunAjaran: null
    })


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
        const getKelas = async () => {
            return await client.get(`/kelas/${idKelas}`).then(res => {
                setFormData(prev => {
                    return {
                        ...prev,
                        nama: res.data.data.nama,
                        jurusan: res.data.data.jurusan.nama,
                        tahunAjaran: res.data.data.tahunAjaran.tahun
                    }
                })
                setStudents(res.data.data.siswa)
                console.log(res.data.data)
            }).catch(err => {
                console.log(err)
            })
        }
        getKelas()
    }, [idKelas])

    return (
        <>
            <div className="bg-white p-5 shadow rounded-md">
                <form>
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl">Data Kelas</h1>
                    </div>
                    <div className="my-2">
                        <label htmlFor="" className="block text-sm mb-1">Nama Kelas</label>
                        <input type="text" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan Nama Kelas" name="nama" value={formData.nama ?? ''} disabled readOnly />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">Jurusan</label>
                            <input type="text" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan Jurusan" name="jurusan" value={formData.jurusan ?? ''} disabled readOnly />
                        </div>
                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">Tahun Ajaran</label>
                            <input type="text" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan Nama Kelas" name="tahunAjaran" value={formData.tahunAjaran ?? ''} disabled readOnly />
                        </div>
                    </div>
                </form>
                <hr className="my-4" />
                <div className="flex justify-end mt-5 mb-2">
                    <div className="p-inputgroup w-1/3">
                        <span className="p-inputgroup-addon">
                            <HiSearch />
                        </span>
                        <input type="text" placeholder='Cari ...' className='border px-3 py-2 w-full focus:outline-none' onChange={handleGlobalFilterChange} />
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
