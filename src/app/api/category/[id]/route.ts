import db from "../../db";
import { NextResponse } from "next/server";

const prisma = db

// get category by id
export const GET = async (req: Request, {params}: {params: {id: string}}): Promise<NextResponse> => {
    const id = Number(params.id)
    try {
        const response = await prisma.category.findUnique({
            where: {id: id}
        })
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({ msg: "internal server error"}, { status: 500 })
    }
}

// update category(by id)
export const PATCH = async (req: Request, {params}: {params: {id: string}}): Promise<NextResponse> => {
    const id = Number(params.id)
    const body = await req.json()

    const category = await prisma.category.findUnique({
        where: {id: id}
    })

    if (category == null) return NextResponse.json({msg: "category not found"}, {status: 404})

    try {
        const response = await prisma.category.update({
            where: {id: id},
            data: {
                name: body.name || category.name
            }
        })
        return NextResponse.json({msg: "product updated", response})
    } catch (error) {
        return NextResponse.json({ msg: "internal server error"}, { status: 500 })
    }
}

// delete category(by id)
export const DELETE = async (req: Request, {params}: {params: {id: string}}): Promise<NextResponse> => {
    const id = Number(params.id)

    try {
        const response = await prisma.category.delete({
            where: {id: id}
        })
        return NextResponse.json({msg: "category deleted", response})
    } catch (error) {
        return NextResponse.json({ msg: "internal server error"}, { status: 500 })
    }
}