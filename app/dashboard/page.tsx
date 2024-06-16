import Image from "next/image";
import { HiOutlineUsers } from "@react-icons/all-files/hi/HiOutlineUsers";
import { HiOutlineOfficeBuilding } from "@react-icons/all-files/hi/HiOutlineOfficeBuilding";
import { HiOutlineUser } from "@react-icons/all-files/hi/HiOutlineUser";
import { HiOutlineHome } from "@react-icons/all-files/hi/HiOutlineHome";

export default function Dashboard() {
    return (
        <>
            <div className="flex h-screen">
                <aside className="w-1/5 bg-white rounded-3xl -translate-x-full md:translate-x-0">
                    <div className="icon pb-3  flex justify-center  p-5">
                        <Image src={'/assets/icon.png'} alt="" width={200} height={200} className="w-[14rem]" />
                    </div>
                    <div className="menu-app mt-5">
                        <div className="text-sm flex flex-col w-full px-2 gap-1">
                            <div className="py-4 px-5 bg-blue-100 font-semibold text-blue-500 flex gap-2 items-center rounded-md">
                                <HiOutlineHome />Dashboard
                            </div>
                            <div className="py-4 px-5 border-b flex gap-2 items-center hover:bg-blue-100 hover:font-semibold hover:text-blue-500  transition-all ease-in-out duration-150 rounded-md">
                                <HiOutlineUsers />Kelola Siswa
                            </div>
                            <div className="py-4 px-5 border-b flex gap-2 items-center hover:bg-blue-100 hover:font-semibold hover:text-blue-500  transition-all ease-in-out duration-150 rounded-md">
                                <HiOutlineOfficeBuilding />Kelola Kelas
                            </div>
                            <div className="py-4 px-5 border-b flex gap-2 items-center hover:bg-blue-100 hover:font-semibold hover:text-blue-500  transition-all ease-in-out duration-150 rounded-md">
                                <HiOutlineUser />Kelola Guru
                            </div>
                        </div>
                        <div className="logout absolute bottom-10 left-5 w-[300px]">
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
                <main className="p-5 w-4/5">
                    <nav className="bg-white p-3 w-full flex justify-between items-center gap-3 rounded-md">
                        <div className="page-title">
                            <div className="flex gap-2 items-center">
                                <HiOutlineOfficeBuilding />
                                <h1 className="text-xl">Dashbord Admin</h1>
                            </div>
                            <span className="text-xs mt-2 block flex gap-2">
                                <HiOutlineHome />  / Dashboard
                            </span>
                        </div>
                        <div className="header-profile flex items-center gap-3">
                            <span className="block text-xs">Muhammad Khoyron Ahlaqul Firdaus</span>
                            <Image src={'https://picsum.photos/200'} alt="" width={50} height={50} className="w-[40px] h-[40px] rounded-full border" />
                        </div>
                    </nav>
                    <div className="topbar"></div>
                </main>
            </div>
        </>
    )
}
