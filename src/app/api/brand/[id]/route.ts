import db from "../../db";
import { NextResponse } from "next/server";

const prisma = db

// get brand by id
export const GET = async (req: Request, { params }: { params: { id: string }}): Promise<NextResponse> => {
    const id = Number(params.id)
    try {
        const response = await prisma.brand.findUnique({
            where: { id: id }
        })
    
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json(error)
    }
}

// update brand(by id)
export const PATCH = async (req: Request, { params }: { params: { id: string }}): Promise<NextResponse> => {
    const id = Number(params.id)
    const body = await req.json()
    const brand = await prisma.brand.findUnique({
        where: { id: id }
    })

    if (brand == null) return NextResponse.json({ msg: 'Product not found' }, { status: 404 })

    try {
        const response = await prisma.brand.update({
            where: { id: Number(brand.id) },
            data: { name: body.name}
        })

        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({ msg: 'error' }, { status: 500})
    }

}
    

// delete product(by id)
export const DELETE = async (req: Request, { params }: { params: { id: string }}): Promise<NextResponse> => {
    const id = Number(params.id)
    try {
        const response = await prisma.brand.delete({
            where: { id: id}
        })

        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json(error)
    }
}