'use client'

import { Jurusan } from "@/interfaces/jurusan.interface"
import { KelasData } from "@/interfaces/kelas.interface"
import { TahunAjaran } from "@/interfaces/tahunAjaran.interface"
import { client } from "@/utils/axiosUtils"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function TambahKelas() {
    const [tahunAjaran, setTahunAjaran] = useState<TahunAjaran[]>([])
    const [jurusan, setJurusan] = useState<Jurusan[]>([])
    const [formData, setFormData] = useState<KelasData>({
        nama: null,
        jurusanId: null,
        tahunAjaranId: null
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        return await client.post('/kelas', formData).then(res => {
            Swal.fire({
                title: 'Sukses',
                text: 'Berhasil menambahkan kelas',
                icon: 'success'
            })
        }).catch(err => {
            console.log(err)
            Swal.fire({
                title: 'Gagal',
                text: 'Gagal menambahkan kelas',
                icon: 'error'
            })
        })
    }

    useEffect(() => {
        const getTahunAjaran = async () => {
            return await client.get('/tahun-ajaran').then(res => {
                console.log(res.data.data)
                setTahunAjaran(res.data.data)
            }).catch(err => {
                console.log(err)
            })
        }
        const getJurusan = async () => {
            return await client.get('/jurusan').then(res => {
                setJurusan(res.data.data)
            }).catch(err => {
                console.log(err)
            })
        }

        getTahunAjaran()
        getJurusan()
    }, [])

    return (
        <>
            <div className="bg-white p-5 shadow rounded-md">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl">Tambah Kelas</h1>
                        <button type="submit" className='bg-blue-400 text-white font-semibold px-3 py-2'>Simpan</button>
                    </div>
                    <div className="my-2">
                        <label htmlFor="" className="block text-sm mb-1">Nama Kelas</label>
                        <input type="text" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan Nama Kelas" name="nama" value={formData.nama ?? ''} onChange={handleInput} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">Jurusan</label>
                            <select className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" name="jurusanId" value={formData.jurusanId ?? ''} onChange={handleInput}>
                                {
                                    jurusan.map((j, i) => (
                                        <option key={i} value={j.id}>{j.nama}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">Tahun Ajaran</label>
                            <select className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" name="tahunAjaranId" value={formData.tahunAjaranId ?? ''} onChange={handleInput}>
                                {
                                    tahunAjaran.map((t, i) => (
                                        <option key={i} value={t.id}>{t.tahun}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
