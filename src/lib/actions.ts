"user server"

import axios from "axios"

export const createBrand = async (formData: FormData) => {
    const name = formData.get("name")
    await axios.post('http://localhost:3000/api/brand', {
        name: name
    })
}

export const createCategory = async (formData: FormData) => {
    const name = formData.get("name")
    await axios.post('http://localhost:3000/api/category', {
        name: name
    })
}