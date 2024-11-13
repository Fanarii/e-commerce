import db from "../db";
import { NextResponse } from "next/server";

const prisma = db

// get all categories
export const GET = async (): Promise<NextResponse> => {
    try {
        const response = await prisma.category.findMany()
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({ msg: 'error' }, { status: 500})
    }
}

// create categories
export const POST = async (req: Request): Promise<NextResponse> => {
    const body = await req.json()
    try {
        const response = await prisma.category.create({
            data: {
                name: body.name,
            }
        })
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({ msg: "internal server error"}, { status: 500 })
    }
}