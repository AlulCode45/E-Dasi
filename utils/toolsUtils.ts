import { NextResponse } from "next/server"

interface responseData {
    data?: object | string | null
    code: number
    message?: string | null
}
function responseApi({ message, data, code }: responseData) {
    return NextResponse.json({
        data: data,
        message: message,
    }, {
        status: code
    })
}

export {
    responseApi
}