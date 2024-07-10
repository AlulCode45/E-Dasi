import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            nama: string | null,
            username: string | null,
            fotoProfile: string | null,
            role: string | null,
            apiToken: string | null
        }
    }

    interface Account {
        nama: string | null,
        username: string | null,
        fotoProfile: string | null,
        role: string | null,
        apiToken: string | null
    }

    interface User {
        data: {
            nama: string | null,
            username: string | null,
            fotoProfile: string | null,
            role: string | null,
            apiToken: string | null
        },
        token: string | null
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        idToken?: string,
        nama: string | null,
        username: string | null,
        fotoProfile: string | null,
        role: string | null,
        apiToken: string | null
    }
}