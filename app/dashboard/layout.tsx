'use client'
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useState } from "react";
import { usePathname } from "next/navigation";


import "primereact/resources/themes/lara-light-cyan/theme.css";
import { FilterMatchMode, PrimeReactProvider } from "primereact/api";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const [sideopen, setSideopen] = useState(false);
    const path = usePathname();

    // Menentukan menu yang aktif berdasarkan URL
    const getActiveMenu = () => {
        if (path === "/dashboard") return 0;
        if (path === "/dashboard/kelola-siswa") return 1;
        if (path === "/dashboard/kelola-kelas") return 2;
        if (path === "/dashboard/kelola-guru") return 3;
        return -1;
    };

    const menuActive = getActiveMenu();

    return (
        <PrimeReactProvider
        // value={{
        // filterMatchModeOptions: {
        //     text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
        //     numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
        //     date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
        // },
        // }}
        >
            <html lang="en">
                <body className={inter.className}>
                    <div className="lg:flex h-screen">
                        <Sidebar sideopen={sideopen} setSideOpen={setSideopen} menuActive={menuActive} />
                        <main className="p-5 w-full lg:w-4/5 h-screen overflow-y-auto">
                            <Topbar setSideopen={setSideopen} />
                            {children}
                        </main>
                    </div>
                </body>
            </html>
        </PrimeReactProvider>
    );
}
