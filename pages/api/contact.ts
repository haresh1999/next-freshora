import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";
import { errorResponse, unknownMethod } from "@/lib/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // 1. Only allow POST requests
    if (req.method !== "POST") {
        return unknownMethod(res);
    }

    try {
        const { name, email, subject, order_number, message } = req.body || {};

        const errors: Record<string, string[]> = {};

        if (typeof name !== "string" || !name.trim()) {
            errors.name = ["Name is required."];
        }

        if (
            typeof email !== "string" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ) {
            errors.email = ["A valid email is required."];
        }

        if (typeof subject !== "string" || !subject.trim()) {
            errors.subject = ["Subject is required."];
        }

        if (typeof message !== "string" || !message.trim()) {
            errors.message = ["Message is required."];
        }

        if (order_number !== undefined && typeof order_number !== "string") {
            errors.order_number = ["Invalid order number."];
        }

        if (Object.keys(errors).length > 0) {
            return res.status(422).json({
                message: "Please check the submitted form.",
                errors,
            });
        }

        // 2. Execute SQL query with all 5 placeholders
        const [result] = await pool.execute(
            `INSERT INTO contacts
        (name, email, subject, order_number, message)
       VALUES (?, ?, ?, ?, ?)`,
            [
                name.trim(),
                email.trim(),
                subject.trim(),
                order_number?.trim() || null,
                message.trim(),
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Your enquiry was received successfully!",
            data: result,
        });
    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "Something went wrong.";

        return errorResponse(res, message);
    }
}