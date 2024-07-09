'use client'
import { HiOutlineOfficeBuilding } from "@react-icons/all-files/hi/HiOutlineOfficeBuilding";
import { getToken } from "next-auth/jwt";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { HTMLAttributes, useEffect, useState } from "react";

interface TopbarProps extends HTMLAttributes<HTMLDivElement> {
    setSideopen: (open: boolean) => void;
}

export default function Topbar({ setSideopen, ...props }: TopbarProps) {
    const [openMenu, setOpenMenu] = useState(false)
    const { data: session, status } = useSession()

    return (
        <nav className="bg-white p-3 w-full flex justify-between items-center gap-3 rounded-md mb-5" {...props}>
            <div className="page-title">
                <div className="flex gap-2 items-center">
                    <HiOutlineOfficeBuilding onClick={() => setSideopen(true)} className="cursor-pointer" />
                    <h1 className="text-xl hidden lg:block">Dashbord Admin</h1>
                </div>
            </div>
            <div className="header-profile flex items-center gap-3">
                <span className="block text-xs">
                    {session?.user.nama}
                </span>
                <div className="relative">
                    <Image src={'https://picsum.photos/200'} alt="" width={50} height={50} className="w-[40px] h-[40px] rounded-full border"
                        onClick={() => {
                            setOpenMenu(prev => !prev)
                        }}
                    />
                    <div className={`${openMenu ? 'z-50 opacity-100' : '-z-50 opacity-0'} transition-all ease-in-out duration-150 absolute bg-white p-5 right-0 shadow w-52`}>
                        <ul className="flex flex-col gap-2">
                            <li className="text-sm hover:bg-gray-100 rounded transition-all ease-in py-3 px-2 border-b">Profile</li>
                            <li className="text-sm hover:bg-gray-100 rounded transition-all ease-in py-3 px-2" onClick={() => signOut({
                                callbackUrl: '/',
                                redirect: true
                            })}>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
