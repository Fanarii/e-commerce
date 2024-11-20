"use server"
import db from "@/app/api/db"
import { registerSchema } from "@/schema/auth"
import * as z from "zod"
import { getUserByEmail } from "./auth"

export const register = async (values: z.infer<typeof registerSchema>) => {
    const validatedFields = registerSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: 'Invalid fields!'}
    }

    const {name, email, password} = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return {error: 'Email taken!'}
    }
    

    await db.user.create({
        data: {
            name,
            email,
            password
        }
    })

    return {success: 'Account created!'}
}