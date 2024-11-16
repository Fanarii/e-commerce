'use client'

import * as React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { getCategories, getBrands } from "@/lib/utils"
import { Brand, Category } from "@/lib/interfaces"

const Page = () => {
  const [brands, setBrands] = useState<Brand[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    stock: 0,
    categoryId: 0,
    brandId: 0,
    status: "active",
  })

  useEffect(() => {
    const fetchBrands = async () => {
      const brands = await getBrands()
      const categories = await getCategories()
      setBrands(brands)
      setCategories(categories)
    }

    fetchBrands()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "price" || id === "stock" ? +value : value,
    }))
  }

  const handleSelectChange = (value: string, field: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: +value,  // Ensure the values are numeric for categoryId, brandId
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form data
    if (!formData.name || !formData.price || !formData.stock || !formData.categoryId || !formData.brandId || !formData.status) {
        alert("Please fill in all fields")
        return
    }

    const formDataToSend = {
        name: formData.name,
        price: Number(formData.price),
        stockQuantity: Number(formData.stock),
        description: formData.description,
        status: formData.status,
        categoryId: formData.categoryId,
        brandId: formData.brandId
    }

    try {
        const response = await axios.post("http://localhost:3000/api/product", formDataToSend)
        alert("Product created successfully")
    } catch (error) {
        console.error("Error creating product:", error)
        alert("Failed to create product")
    }
  }

  const handleReset = () => {
    setFormData({
      name: "",
      price: 0,
      description: "",
      stock: 0,
      categoryId: 0,
      brandId: 0,
      status: "active",
    })
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Masukkan Produk Baru</CardTitle>
          <CardDescription>Masukkan produk dalam satu klik.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nama produk"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Harga</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Harga produk"
                  type="number"
                  step="0.01"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Deskripsi</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Deskripsi produk"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="stock">Stok</Label>
                <Input
                  id="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="Stok produk"
                  type="number"
                />
              </div>
              <div className="flex flex-col space-y-1.5 gap-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={formData.categoryId.toString()}
                  onValueChange={(value) => handleSelectChange(value, "categoryId")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Kategori" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Label htmlFor="brand">Brand</Label>
                <Select
                  value={formData.brandId.toString()}
                  onValueChange={(value) => handleSelectChange(value, "brandId")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Brand" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id.toString()}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange(value, "status")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="discontinued">Discontinued</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleReset}>
                Cancel
              </Button>
              <Button type="submit">
                Deploy
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
