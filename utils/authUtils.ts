import { headers } from "next/headers";
import { NextApiRequest } from "next";
import { prisma } from "./prismaUtils";
import { responseApi } from "./toolsUtils";

function generate_token(length: number) {
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i = 0; i < length; i++) {
        var j: any = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}
// utils/tokenUtils.ts

const getToken = () => {
    const authorizationHeader = headers()
    const token = authorizationHeader?.get('Authorization')?.split(' ')[1];
    return token;
};

async function getUserByToken(token: string) {
    try {
        const user = await prisma.operator.findFirstOrThrow({
            where: {
                token: token
            }
        })
        return user
    } catch (error) {
        return responseApi({
            message: "Failed : " + error,
            code: 401
        })
    }
}

export {
    generate_token,
    getToken,
    getUserByToken
}