import { prisma } from "@/utils/prismaUtils"
import { responseApi } from "@/utils/toolsUtils"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

async function POST(req: Request) {
    try {
        const header = headers()
        const token = header.get('Authorization')?.split(' ')[1]

        const user = await prisma.operator.findFirst({
            where: {
                token: token
            }
        })
        if (user) {
            await prisma.operator.update({
                where: {
                    id: user.id
                },
                data: {
                    token: null
                }
            })

            await prisma.$disconnect()
            return NextResponse.json({
                message: "Logout success"
            }, {
                status: 200
            })
        } else {
            throw new Error()
        }
    } catch (error) {
        return responseApi({
            code: 401,
            message: "Please login !!"
        })
    }

}
export {
    POST
}