import { prisma } from "@/utils/prismaUtils";
import { NextResponse } from "next/server"
import bcrypt from "bcrypt";
import { generate_token } from "@/utils/tokenUtils";

async function POST(request: Request) {
    try {
        const res = await request.json();

        if (!res.username || !res.password) {
            await prisma.$disconnect()
            return NextResponse.json({
                message: 'Username / password wrong'
            }, { status: 400 });
        }

        const { username, password } = res;

        const user = await prisma.operator.findFirst({
            where: { username }
        });

        if (!user || !await bcrypt.compare(password, user.password)) {
            await prisma.$disconnect()
            return NextResponse.json({
                message: 'Username / password wrong'
            }, { status: 401 });
        }

        const token = generate_token(40)

        await prisma.operator.update({
            where: {
                id: user.id
            },
            data: {
                token: token
            }
        })

        await prisma.$disconnect()
        return NextResponse.json({
            data: {
                nama: user.nama,
                username: user.username,
                fotoProfile: user.fotoProfile,
                role: user.role
            },
            token: token
        });


    } catch (error) {
        await prisma.$disconnect()
        return NextResponse.json({
            message: 'An error occurred',
        }, { status: 500 });
    }
}

export { POST }
