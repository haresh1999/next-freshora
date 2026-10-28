import type { NextApiRequest, NextApiResponse } from "next";

type ContactResponse = {
    message: string;
    errors?: Record<string, string[]>;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ContactResponse>
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({
            message: "Method not allowed",
        });
    }

    const { name, email, subject, order_number, message } = req.body ?? {};

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

    if (
        order_number !== undefined &&
        typeof order_number !== "string"
    ) {
        errors.order_number = ["Invalid order number."];
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            message: "Please check the submitted form.",
            errors,
        });
    }

    // TODO: Save the enquiry to a database or send an email.
    console.log("New contact enquiry:", {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        order_number: order_number?.trim() || "",
        message: message.trim(),
    });

    return res.status(200).json({
        message: "Your enquiry was received successfully!",
    });
}
