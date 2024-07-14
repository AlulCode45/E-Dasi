'use client'

import { StudentData } from "@/interfaces/siswa.interface";
import { client } from "@/utils/axiosUtils";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ViewSiswa() {
    const { idSiswa } = useParams()
    const [kelas, setKelas] = useState([])
    const [formData, setFormData] = useState<StudentData>({
        nisn: null,
        nis: null,
        nama: null,
        tanggalLahir: null,
        alamat: null,
        jenisKelamin: null,
        kelasId: null
    })

    const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

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
    useEffect(() => {
        const getData = async () => {
            return await client.get(`${process.env.API_URL}/siswa/${idSiswa}`).then(res => {
                console.log(res.data)
                setFormData({
                    nisn: res.data.data.nisn,
                    nis: res.data.data.nis,
                    nama: res.data.data.nama,
                    tanggalLahir: new Date(res.data.data.tanggalLahir).toISOString().split('T')[0],
                    alamat: res.data.data.alamat,
                    jenisKelamin: res.data.data.jenisKelamin,
                    kelasId: res.data.data.kelasId
                })
            }).catch(err => {
                console.error(err)
            })
        }
        getData()
    }, [idSiswa])

    return (
        <>
            <div className="bg-white p-5 shadow rounded-md">
                <form>
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl">Data Siswa</h1>
                        <Link href={`/dashboard/kelola-siswa/edit/${idSiswa}`} className='bg-blue-400 text-white font-semibold px-3 py-2'>Edit Siswa</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">NISN</label>
                            <input type="number" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan NISN" name="nisn" value={formData.nisn ?? ''} readOnly disabled />
                        </div>

                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">NIS</label>
                            <input type="text" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan NIS" name="nis" value={formData.nis ?? ''} readOnly disabled />
                        </div>
                    </div>
                    <div className="my-2">
                        <label htmlFor="" className="block text-sm mb-1">Nama Lengkap</label>
                        <input type="text" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan Nama Lengkap" name="nama" value={formData.nama ?? ''} readOnly disabled />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">Tanggal Lahir</label>
                            <input type="date" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan Tanggal Lahir" name="tanggalLahir" value={formData.tanggalLahir ?? ''} readOnly disabled />
                        </div>
                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">Jenis Kelamin</label>
                            <select className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400 bg-gray-100" name="jenisKelamin" value={formData.jenisKelamin ?? ''} disabled>
                                <option value="Laki-Laki">Laki-Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                    </div>
                    <div className="my-2">
                        <label htmlFor="" className="block text-sm mb-1">Kelas</label>
                        <select className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400 bg-gray-100" value={formData.kelasId ?? ""} name="kelasId" onChange={handleForm} disabled>
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
                        <textarea className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan Alamat" name="alamat" value={formData.alamat ?? ''} readOnly disabled />
                    </div>
                </form>
            </div >
        </>
    )
}
