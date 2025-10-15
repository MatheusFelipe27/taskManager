import { USER_LOGIN, USER_PASSWORD } from "@/consts/consts";
import { NextResponse } from "next/server";

export const simulateLogin = async (user: string, password: string) =>{
    await new Promise((resolve) => setTimeout(resolve, 2000))
    if (user === USER_LOGIN && password === USER_PASSWORD) {
        return NextResponse.json(
            { success: true, message: "Login realizado com sucesso!" },
            { status: 200 }
        )
    }

    return NextResponse.json(
        { success: false, message: "Credenciais inválidas." },
        { status: 401 }
    )
}