"use client"
import { createBrand } from '@/lib/actions'
import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Form from 'next/form'

const BrandForm = () => {
    return (
        <Form action={createBrand} className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">Tambah Brand Baru</h2>

            <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-1">
                    <Label htmlFor="name">Nama Brand</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Masukkan nama brand..."
                        required
                        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <Button>Submit</Button>
        </Form>
    )
}

export default BrandForm
