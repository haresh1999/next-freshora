import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function proxy(request: NextRequest) {

    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    // Protected routes
    const protectedRoutes = [
        "/account",
        "/checkout",
    ];

    const isProtectedRoute = protectedRoutes.some(
        route => pathname === route || pathname.startsWith(`${route}/`)
    );

    // Guest-only routes
    const guestRoutes = [
        "/login",
        "/signup",
    ];

    const isGuestRoute = guestRoutes.some(
        route => pathname === route || pathname.startsWith(`${route}/`)
    );

    // Verify token if present
    let user = null;

    if (token) {
        user = await verifyToken(token);
    }

    // Protected route authentication
    if (isProtectedRoute && !user) {
        const response = NextResponse.redirect(
            new URL("/login", request.url)
        );

        if (token) {
            response.cookies.delete("token");
        }

        return response;
    }

    // Guest-only route authentication
    if (isGuestRoute && user) {
        return NextResponse.redirect(
            new URL("/account", request.url)
        );
    }

    // Invalid token: clear cookie and allow guest access
    if (isGuestRoute && token && !user) {
        const response = NextResponse.next();
        response.cookies.delete("token");
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/account/:path*",
        "/checkout/:path*",
        "/login/:path*",
        "/signup/:path*",
    ],
};
