'use client'
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHeader,
    TableRow,
    TableHead
} from "@/components/ui/table"
import Link from 'next/link';

interface Product {
    id: string,
    name: string,
    brand: string,
    price: string,
    category: string,
    status: string
}

const getProducts = async () => {
    const response = await axios.get('http://localhost:3000/api/product')
    return response.data;
}

const deleteProduct = async (productId: string) => {
    try {
        await axios.delete(`http://localhost:3000/api/product/${productId}`);
        alert("Product successfully deleted.");
        return true;  // Return true if the deletion was successful
    } catch (error) {
        alert("Failed to delete the product.");
        return false;  // Return false if the deletion failed
    }
}

const Page = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProducts();
            setProducts(products);
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        const isDeleted = await deleteProduct(id);
        if (isDeleted) {
            setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
        }
    };

    return (
        <div className="flex h-screen w-screen">
            <Sidebar />
            <div className="p-4 gap-4 w-full m-4">
                <div className="flex justify-between w-full">
                    <div className="flex text-center gap-4">
                        <h2 className="text-xl font-bold">Products</h2>
                        <Link href={'/dashboard/products/add'}><Button>Tambah</Button></Link>
                    </div>
                    <div>
                        <Button>Filter</Button>
                    </div>
                </div>
                <Table className='mt-3 bg-slate-100 rounded-xl shadow-lg'>
                    <TableCaption>A list of your recent products.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Operation</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.status}</TableCell>
                                <TableCell>
                                    <Link href={`/dashboard/products/${product.id}`}>
                                        <Button variant={'outline'}>Edit</Button>
                                    </Link>
                                    <Button variant={'destructive'} onClick={() => handleDelete(product.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Page;
