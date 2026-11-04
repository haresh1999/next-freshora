import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
);

export async function generateToken(user: { id: number; username: string }) {

    return await new SignJWT({ email: user.username })
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(String(user.id))
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch {
        return null;
    }
}

export async function isAuth(request) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return false;
    }

    const user = await verifyToken(token);
    if (!user) {
        return false;
    }

    return true;
}