import { USER_LOGIN, USER_PASSWORD } from "@/consts/consts";
import { NextResponse } from "next/server";

export const POST = async (req: Request) =>{
    const body = await req.json()
    const {user, password} = body
    await new Promise((resolve) => setTimeout(resolve, 2000))
    if (user === USER_LOGIN && password === USER_PASSWORD) {
        const res = NextResponse.json(
            { success: true, message: "Login realizado com sucesso!" },
            { status: 200 }
        )
        res.cookies.set("user", user, { httpOnly: true, path: "/" });
        return res
    }

    return NextResponse.json(
        { success: false, message: "Credenciais inválidas." },
        { status: 401 }
    )
}