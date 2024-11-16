import db from "../db";
import { NextResponse } from "next/server";

const prisma = db

// get all products
export const GET = async (): Promise<NextResponse> => {
    try {
        const products = await prisma.product.findMany({
            include: {
                brand: true,
                category: true,
            }
        });

        const formattedProducts = products.map(product => ({
            id: product.id.toString(),
            name: product.name,
            price: product.price.toString(),
            brand: product.brand.name,
            category: product.category.name,
            status: product.status,
        }));

        return NextResponse.json(formattedProducts)
    } catch (error) {
        return NextResponse.json({ msg: "internal server error"}, { status: 500 })
    }
}

// create products
export const POST = async (req: Request): Promise<NextResponse> => {
    try {
        const body = await req.json()

        if (!body.name || !body.price || !body.stockQuantity || !body.brandId || !body.categoryId) {
            return NextResponse.json({ msg: "Missing required fields" }, { status: 400 })
        }

        const price = Number(body.price)
        const stockQuantity = Number(body.stockQuantity)

        if (isNaN(price) || isNaN(stockQuantity)) {
            return NextResponse.json({ msg: "Price and stockQuantity must be valid numbers" }, { status: 400 })
        }

        if (typeof body.brandId !== 'number' || typeof body.categoryId !== 'number') {
            return NextResponse.json({ msg: "brandId and categoryId must be integers" }, { status: 400 })
        }

        if (body.status && !["active", "inactive", "discontinued"].includes(body.status)) {
            return NextResponse.json({ msg: "Invalid status value" }, { status: 400 })
        }

        const newProduct = await prisma.product.create({
            data: {
                name: body.name,
                description: body.description || null,
                price,
                sku: body.sku || null,
                stockQuantity,
                imageUrl: body.imageUrl || null,
                status: body.status || 'active',
                brand: { connect: { id: body.brandId } },
                category: { connect: { id: body.categoryId } }
            }
        })

        return NextResponse.json(newProduct, { status: 201 })
    } catch (error) {
        console.error("Error creating product:", error)
        return NextResponse.json({ msg: "Internal server error", error: error || error }, { status: 500 })
    }
}