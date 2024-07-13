'use client'
import { HiOutlineHome } from '@react-icons/all-files/hi/HiOutlineHome';
import { HiOutlineOfficeBuilding } from '@react-icons/all-files/hi/HiOutlineOfficeBuilding';
import { HiOutlineUser } from '@react-icons/all-files/hi/HiOutlineUser';
import { HiOutlineUsers } from '@react-icons/all-files/hi/HiOutlineUsers';
import { HiOutlineCalendar } from '@react-icons/all-files/hi/HiOutlineCalendar';
import { HiOutlineBookOpen } from '@react-icons/all-files/hi/HiOutlineBookOpen';
import Image from 'next/image';
import Link from 'next/link';

interface SidebarProps {
    sideopen: boolean;
    setSideOpen: (open: boolean) => void;
    menuActive: number;
}

export default function Sidebar({ sideopen, setSideOpen, menuActive }: SidebarProps) {
    return (
        <aside className={`absolute lg:static lg:w-1/5 lg:block bg-white rounded-3xl ${!sideopen ? '-translate-x-full' : ''} lg:translate-x-0 h-screen transition-all ease-in-out duration-300`}>
            <div className="icon pb-3 flex justify-center p-5">
                <Image src={'/assets/icon.png'} alt="" width={200} height={200} className="w-[14rem]" />
                <svg
                    fill="#000000"
                    width="25px"
                    height="25px"
                    viewBox="-0.188 -0.188 0.75 0.75"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMinYMin"
                    className="jam jam-close block lg:hidden"
                    onClick={() => setSideOpen(false)}
                >
                    <path d="m0.229 0.184 0.11 -0.111A0.031 0.031 0 1 0 0.295 0.03L0.184 0.14 0.074 0.03A0.031 0.031 0 1 0 0.03 0.074l0.11 0.11L0.03 0.295a0.031 0.031 0 1 0 0.044 0.044l0.11 -0.11 0.111 0.11a0.031 0.031 0 1 0 0.044 -0.044L0.229 0.184z" />
                </svg>
            </div>
            <div className="menu-app mt-5">
                <div className="text-sm flex flex-col w-full px-2 gap-1">
                    <Link className={`py-4 px-5 flex gap-2 items-center rounded-md transition-all ease-in-out duration-150 ${menuActive === 0 ? 'bg-blue-100 font-semibold text-blue-500' : 'hover:bg-blue-100 hover:font-semibold hover:text-blue-500'}`} href={'/dashboard'}>
                        <HiOutlineHome />Dashboard
                    </Link>
                    <Link className={`py-4 px-5 flex gap-2 items-center rounded-md transition-all ease-in-out duration-150 ${menuActive === 1 ? 'bg-blue-100 font-semibold text-blue-500' : 'hover:bg-blue-100 hover:font-semibold hover:text-blue-500'}`} href={'/dashboard/kelola-siswa'}>
                        <HiOutlineUsers />Kelola Siswa
                    </Link>
                    <Link className={`py-4 px-5 flex gap-2 items-center rounded-md transition-all ease-in-out duration-150 ${menuActive === 2 ? 'bg-blue-100 font-semibold text-blue-500' : 'hover:bg-blue-100 hover:font-semibold hover:text-blue-500'}`} href={'/dashboard/kelola-kelas'}>
                        <HiOutlineOfficeBuilding />Kelola Kelas
                    </Link>
                    <Link className={`py-4 px-5 flex gap-2 items-center rounded-md transition-all ease-in-out duration-150 ${menuActive === 3 ? 'bg-blue-100 font-semibold text-blue-500' : 'hover:bg-blue-100 hover:font-semibold hover:text-blue-500'}`} href={'/dashboard/kelola-guru'}>
                        <HiOutlineUser />Kelola Guru
                    </Link>
                    <Link className={`py-4 px-5 flex gap-2 items-center rounded-md transition-all ease-in-out duration-150 ${menuActive === 4 ? 'bg-blue-100 font-semibold text-blue-500' : 'hover:bg-blue-100 hover:font-semibold hover:text-blue-500'}`} href={'/dashboard/kelola-jurusan'}>
                        <HiOutlineBookOpen />Kelola Jurusan
                    </Link>
                    <Link className={`py-4 px-5 flex gap-2 items-center rounded-md transition-all ease-in-out duration-150 ${menuActive === 5 ? 'bg-blue-100 font-semibold text-blue-500' : 'hover:bg-blue-100 hover:font-semibold hover:text-blue-500'}`} href={'/dashboard/kelola-tahun-ajaran'}>
                        <HiOutlineCalendar />Kelola Tahun Ajaran
                    </Link>
                </div>
                <div className="logout absolute bottom-10 left-5">
                    <div className="flex gap-3 items-center">
                        <Image src={'https://picsum.photos/200'} alt="" width={50} height={50} className="w-[40px] h-[40px] rounded-full border" />
                        <div>
                            <span className="block text-xs">Muhammad Khoyron Ahlaqul Firdaus</span>
                            <span className="block font-semibold text-xs">(Operator)</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
