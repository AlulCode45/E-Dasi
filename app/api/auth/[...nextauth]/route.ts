import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(process.env.API_URL + "/auth/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });

                if (!res.ok) {
                    return null;
                }

                const user = await res.json();

                // Ensure user data structure matches what you're expecting
                if (user && user.data) {
                    return user.data;
                }

                return null;
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            if (user) {
                token.nama = user.nama ?? null;
                token.username = user.username ?? null;
                token.fotoProfile = user.fotoProfile ?? null;
                token.role = user.role ?? null;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                // Add token info to the session
                session.user.nama = token.nama ?? null;
                session.user.fotoProfile = token.fotoProfile ?? null;
                session.user.role = token.role ?? null;
                session.user.username = token.username ?? null;
            }
            return session;
        },
    },
    pages: {
        signIn: '/',
        error: '/'
    }
});

export { handler as GET, handler as POST };
