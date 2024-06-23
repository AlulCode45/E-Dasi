import { getToken } from '@/utils/authUtils'
import { responseApi } from '@/utils/toolsUtils'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from './utils/prismaUtils';

export async function middleware(req: NextRequest) {
    const token = getToken();
    if (!token) {
        return responseApi({
            message: "Unauthorized",
            code: 401,
        })
    }
    try {
        // const user = await prisma.operator.findFirst({
        //     where: {
        //         token: token
        //     }
        // })
        // if (!user) {
        //     throw new Error("Please login !")
        // }
        return NextResponse.next();
    } catch (error) {
        return responseApi({
            message: "Failed : " + error,
            code: 401
        })
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/api/operator/:path*'],
}