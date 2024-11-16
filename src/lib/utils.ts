import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);
};

// methods for brand
export const getCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/category")
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
  }
}

export const getBrands = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/brand")
    return response.data
  } catch (error) {
    console.error("Error fetching brands:", error)
    throw error
  }
}

//methods for products
export const getProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/product")
    return response.data
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

export const getProductById = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/product/${id}`)
    return response.data
  } catch (error) {
    
  }
}