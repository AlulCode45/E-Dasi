'use client'

import { client } from "@/utils/axiosUtils";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Student {
    nisn: number | null;  // sesuai dengan skema Prisma
    nama: string | null;
    nis: string | null;   // sesuai dengan skema Prisma
    tanggalLahir: string | null;
    alamat: string | null;
    jenisKelamin: string | null;
    kelasId: number | null;  // sesuai dengan skema Prisma
}

export default function TambahSiswa() {
    const [formData, setFormData] = useState<Student>({
        nisn: null,
        nis: null,
        nama: null,
        alamat: null,
        jenisKelamin: null,
        tanggalLahir: null,
        kelasId: null
    })

    const [kelas, setKelas] = useState([])

    useEffect(() => {
        const getKelas = async () => {
            return await client.get('/kelas').then(res => {
                setKelas(res.data.data)
            }).catch(err => {
                console.log(err)
            })
        }
        getKelas()
    }, [])

    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        return await client.post('/siswa', formData).then(res => {
            Swal.fire({
                title: "Berhasil",
                text: "Sukses Menambahkan Data Siswa",
                icon: "success"
            })
            setFormData({
                nisn: null,
                nis: null,
                nama: null,
                alamat: null,
                jenisKelamin: null,
                tanggalLahir: null,
                kelasId: null
            })
        }).catch(err => {
            Swal.fire({
                title: "Gagal",
                text: "Gagal Menambahkan Data Siswa",
                icon: "error"
            })
            console.log(err)
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="bg-white p-5 shadow rounded-md">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl">Tambah Siswa</h1>
                        <button type="submit" className='bg-blue-400 text-white font-semibold px-3 py-2'>Simpan</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">NISN</label>
                            <input type="number" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan NISN" value={formData.nisn ?? ""} name="nisn" onChange={handleInput} />
                        </div>

                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">NIS</label>
                            <input type="text" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan NIS" value={formData.nis ?? ""} name="nis" onChange={handleInput} />
                        </div>
                    </div>
                    <div className="my-2">
                        <label htmlFor="" className="block text-sm mb-1">Nama Lengkap</label>
                        <input type="text" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan Nama Lengkap" value={formData.nama ?? ""} name="nama" onChange={handleInput} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">Tanggal Lahir</label>
                            <input type="date" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan Tanggal Lahir" value={formData.tanggalLahir ?? ""} name="tanggalLahir" onChange={handleInput} />
                        </div>
                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">Jenis Kelamin</label>
                            <select className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" value={formData.jenisKelamin ?? ""} name="jenisKelamin" onChange={handleInput}>
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="Laki-Laki">Laki-Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                    </div>
                    <div className="my-2">
                        <label htmlFor="" className="block text-sm mb-1">Kelas</label>
                        <select className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" value={formData.kelasId ?? ""} name="kelasId" onChange={handleInput}>
                            <option value="">Pilih Kelas</option>
                            {
                                kelas?.map((d: any, i) => (
                                    <option value={d?.id} key={i}>{d?.nama} - {d?.tahunAjaran.tahun}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="my-2">
                        <label htmlFor="" className="block text-sm mb-1">Alamat</label>
                        <textarea className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan Alamat" value={formData.alamat ?? ""} name="alamat" onChange={handleInput} />
                    </div>
                </div>
            </form>
        </>
    )
}
