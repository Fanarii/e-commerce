import * as z from "zod"

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: 'Password is required'
    }).regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter'
    }).regex(/[0-9]/, {
        message: 'Password must contain at least one number'
    }).min(8, {
        message: 'Password must be at least 8 characters long'
    })
})

export const registerSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required'
    }),
    email: z.string().email(),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters long'
    }).regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter'
    }).regex(/[0-9]/, {
        message: 'Password must contain at least one number'
    })
})
