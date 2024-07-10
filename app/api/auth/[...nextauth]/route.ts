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
                    console.log(user)
                    return user;
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
                token.nama = user?.data?.nama ?? null;
                token.username = user.data.username ?? null;
                token.fotoProfile = user.data.fotoProfile ?? null;
                token.role = user.data.role ?? null;
                token.apiToken = user.token ?? null
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
                session.user.apiToken = token.apiToken ?? null
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
