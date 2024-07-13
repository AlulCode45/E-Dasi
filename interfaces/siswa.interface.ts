export interface Student {
    nisn: string;
    nama: string;
    nis: string;
    tanggalLahir: string;
    alamat: string;
    jenisKelamin: string;
}

export interface StudentData {
    nisn: number | null;  // sesuai dengan skema Prisma
    nama: string | null;
    nis: string | null;   // sesuai dengan skema Prisma
    tanggalLahir: string | null;
    alamat: string | null;
    jenisKelamin: string | null;
    kelasId: number | null;  // sesuai dengan skema Prisma
}