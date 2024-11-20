import type { NextAuthConfig } from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
 
import { loginSchema } from "./schema/auth"
import { getUserByEmail } from "./actions/auth"

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Facebook,
    Credentials({
        async authorize(credentials) {
            const validatedFields = loginSchema.safeParse(credentials)

            if (validatedFields.success) {
                const { email, password } = validatedFields.data

                const user = await getUserByEmail(email)
                if (!user || !user.password) return null

                if (password == user.password) {
                    return user
                }
            }

            return null
        }
    })
  ],
} satisfies NextAuthConfig