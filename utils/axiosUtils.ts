import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

// Membuat instansi Axios dengan konfigurasi dasar
const client = axios.create({
    baseURL: process.env.API_URL
});

// Inisialisasi session dengan async/await
let session: Session | null;

const initializeSessionAndClient = async () => {
    session = await getSession();

    //Alternatif jika menggunakan axios biasa
    // session = await axios.get('/api/auth/session').then(res => res?.data);

    // Menambahkan interceptor setelah session telah diinisialisasi
    client.interceptors.request.use((config) => {
        if (session?.user?.apiToken) {
            config.headers.Authorization = `Bearer ${session.user.apiToken}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
};

// Panggil fungsi untuk menginisialisasi session dan menambahkan interceptor
initializeSessionAndClient();

export { client };
