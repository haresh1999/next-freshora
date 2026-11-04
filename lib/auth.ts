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

export async function getAuthUser(token?: string) {
    if (!token) {
        return null;
    }

    try {
        const user = await verifyToken(token);
        return user || null;
    } catch {
        return null;
    }
}

export async function isAuth(token?: string): Promise<boolean> {
    const user = await getAuthUser(token);
    return !!user;
}