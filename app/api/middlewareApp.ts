import { prisma } from "@/utils/prismaUtils";
import { getToken } from "@/utils/tokenUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

// Menambahkan properti user ke NextApiRequest
declare module 'next' {
    interface NextApiRequest {
        user?: any; // Anda bisa mengganti any dengan tipe user yang sesuai
    }
}

async function middlewareAPI(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
    try {
        const token = getToken(req);

        if (!token) {
            return res.status(401).json({ message: "Token not provided" });
        }

        const user = await prisma.operator.findFirst({
            where: {
                token: token
            }
        });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Set user information in request object for further use
        req.user = user;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        console.error("Middleware error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export {
    middlewareAPI
}
