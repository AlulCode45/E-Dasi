import { headers } from "next/headers";
import { NextApiRequest } from "next";

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

const getToken = (req: NextApiRequest): string | null => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return null;
    }
    // Assuming the token is in the format "Bearer <token>"
    const token = authorizationHeader.split(' ')[1];
    return token;
};


export {
    generate_token,
    getToken
}