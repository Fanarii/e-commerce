"use client"
import { createCategory } from '@/lib/actions'
import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Form from 'next/form'

const BrandForm = () => {
  return (
    <Form action={createCategory} className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Tambah Kategori Baru</h2>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1">
          <Label htmlFor="name">Nama Kategori</Label>
          <Input
            id="name"
            name="name"
            placeholder="Masukkan nama kategori..."
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
