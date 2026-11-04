import { NextRequest, NextResponse } from "next/server";
import { isAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
    const authenticated = await isAuth(request);

    return NextResponse.json({
        authenticated
    });
}