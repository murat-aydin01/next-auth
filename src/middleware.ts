import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    const session = await auth()
    
    const protectedRoutes = ["/protected-page", "/another-protected-page", "/dashboard"]
    
    const isProtectedRoute = protectedRoutes.some(route => 
        request.nextUrl.pathname.startsWith(route)
    )

    if (isProtectedRoute && !session) {
        const redirectUrl = new URL("/login", request.url)
        redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
    }
    if (session && request.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/api/:path*",
        "/login",
    ]
}