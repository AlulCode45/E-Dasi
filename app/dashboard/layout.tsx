'use client'
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useState } from "react";
import { usePathname } from "next/navigation";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from "primereact/api";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, session }: Readonly<{
    children: React.ReactNode;
    session: Session
}>) {
    const [sideopen, setSideopen] = useState(false);
    const path = usePathname();

    // Menentukan menu yang aktif berdasarkan URL
    const getActiveMenu = () => {
        if (path === "/dashboard") return 0;
        if (path.startsWith("/dashboard/kelola-siswa")) return 1; // Deteksi semua turunan dari /dashboard/kelola-siswa
        if (path.startsWith("/dashboard/kelola-kelas")) return 2; // Deteksi semua turunan dari /dashboard/kelola-kelas
        if (path.startsWith("/dashboard/kelola-guru")) return 3; // Deteksi semua turunan dari /dashboard/kelola-guru
        return -1;
    };

    const menuActive = getActiveMenu();

    return (
        <SessionProvider session={session}>
            <PrimeReactProvider>
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
        </SessionProvider>
    );
}
