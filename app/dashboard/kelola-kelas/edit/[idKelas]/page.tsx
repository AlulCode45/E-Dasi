'use client'

export default function EditSiswa() {
    return (
        <>
            <div className="bg-white p-5 shadow rounded-md">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl">Tambah Siswa</h1>
                    <button type="submit" className='bg-blue-400 text-white font-semibold px-3 py-2'>Simpan</button>
                </div>
                <form onSubmit={() => { }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">NISN</label>
                            <input type="number" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan NISN" />
                        </div>

                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">NIS</label>
                            <input type="text" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan NIS" />
                        </div>
                    </div>
                    <div className="my-2">
                        <label htmlFor="" className="block text-sm mb-1">Nama Lengkap</label>
                        <input type="number" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan Nama Lengkap" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">Tanggal Lahir</label>
                            <input type="date" className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan Tanggal Lahir" />
                        </div>
                        <div className="my-2">
                            <label htmlFor="" className="block text-sm mb-1">Jenis Kelamin</label>
                            <select className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400">
                                <option value="Laki-Laki">Laki-Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>
                    </div>
                    <div className="my-2">
                        <label htmlFor="" className="block text-sm mb-1">Alamat</label>
                        <textarea className="w-full p-2 border focus:outline-blue-200 focus:shadow-blue-400" placeholder="Masukan Alamat" />
                    </div>
                </form>
            </div>
        </>
    )
}
