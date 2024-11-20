import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes"

const { auth } = NextAuth(authConfig)

export default auth(async (req, ctx) => {
    const isLoggedIn = !!req.auth
    const { nextUrl } = req

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return undefined
    }

    if (isAuthRoutes) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return undefined
    }

    if (!isLoggedIn && !isPublicRoutes) {
        return Response.redirect(new URL('/login', nextUrl))
    }

    return undefined
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
