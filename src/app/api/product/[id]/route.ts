import db from "../../db";
import { NextResponse } from "next/server";

const prisma = db

// get product by id
export const GET = async (req: Request, { params }: { params: { id: string }}): Promise<NextResponse> => {
    const id = Number(params.id)
    try {
        const response = await prisma.product.findUnique({
            where: { id: id }
        })
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({ msg: "internal server error"}, { status: 500 })
    }
}

// delete product(by id)
export const DELETE = async (req: Request, { params }: { params: {id: string}}): Promise<NextResponse> => {
    const id = Number(params.id)
    try {
        const response = await prisma.product.delete({
            where: { id: id }
        })
        return NextResponse.json({ msg: "product deleted ", response})
    } catch (error) {
        return NextResponse.json({ msg: "internal server error"}, { status: 500 })
    }
}

// update product(by id)
export const PATCH = async (req: Request, { params }: { params: {id: string}}): Promise<NextResponse> => {
    const id = Number(params.id)
    const body = await req.json()
    const product = await prisma.product.findUnique({
        where: { id: id }
    })

    if (product == null) return NextResponse.json({msg: "product not found"}, {status: 404})

    try {
        const response = await prisma.product.update({
            where: { id: id },
            data: {
                name: body.name || product.name,
                description: body.description || product.description,
                brandId: body.brandId || product.brandId,
                price: Number(body.price) || product.price,
                stockQuantity: Number(body.stockQuantity) || product.stockQuantity,
                categoryId: body.categoryId || product.categoryId,
                status: body.status || product.status
            }
        })

        return NextResponse.json({ msg: "product updated", response})
    } catch (error) {
        return NextResponse.json({ msg: "internal server error"}, { status: 500 })
    }
}