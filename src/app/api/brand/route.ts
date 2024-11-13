import db from "../db";
import { NextResponse } from "next/server";

const prisma = db

// get all barnds
export const GET = async (): Promise<NextResponse> => {
    const response = await prisma.brand.findMany()
    return NextResponse.json(response)
}

// create brand
export const POST = async (req: Request): Promise<NextResponse> => {
    const body = await req.json()

    try {
        const response = await prisma.brand.create({
            data: {
                name: body.name,
            }
        })

        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json(error)
    }
}
