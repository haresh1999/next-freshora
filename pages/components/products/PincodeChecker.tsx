import React, { useState } from "react";
import {
    FiMapPin,
    FiTruck,
    FiCheckCircle,
    FiAlertCircle,
    FiLoader
} from "react-icons/fi";

export default function PincodeChecker() {

    const [pincode, setPincode] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "available" | "unavailable">("idle");
    const [deliveryDetails, setDeliveryDetails] = useState<{
        estimatedDays?: string;
        codAvailable?: boolean;
    } | null>(null);

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pincode.trim().length !== 6) return;

        setLoading(true);
        setStatus("idle");

        try {
            // Simulate API call (replace with your backend endpoint)
            // const res = await fetch(`/api/check-pincode?pincode=${pincode}`);
            await new Promise((resolve) => setTimeout(resolve, 600));

            // Example dummy logic
            if (pincode.startsWith("0") || pincode.startsWith("9")) {
                setStatus("unavailable");
                setDeliveryDetails(null);
            } else {
                setStatus("available");
                setDeliveryDetails({
                    estimatedDays: "2-4 Business Days",
                    codAvailable: true,
                });
            }
        } catch {
            setStatus("unavailable");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm mt-3 pt-3 border-t border-slate-200">
            {/* Title */}
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                <FiMapPin className="text-slate-500 text-sm" />
                <span>Check Delivery</span>
            </div>

            {/* Input Group */}
            <form onSubmit={handleCheck} className="relative flex items-center">
                <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, ""); // Allow numbers only
                        setPincode(val);
                        if (status !== "idle") setStatus("idle");
                    }}
                    placeholder="Enter 6-digit Pincode"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />

                <button
                    type="submit"
                    disabled={pincode.length !== 6 || loading}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 flex items-center justify-center min-w-[60px]"
                >
                    {loading ? (
                        <FiLoader className="animate-spin text-sm" />
                    ) : (
                        "Check"
                    )}
                </button>
            </form>

            {/* Available State */}
            {status === "available" && (
                <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 text-xs text-emerald-950">
                    <div className="flex items-center gap-2 font-semibold text-emerald-800">
                        <FiCheckCircle className="text-emerald-600 text-base shrink-0" />
                        <span>Serviceable to {pincode}</span>
                    </div>

                    <div className="mt-2 space-y-1 pl-6 text-slate-700">
                        <div className="flex items-center gap-1.5">
                            <FiTruck className="text-slate-500 text-sm shrink-0" />
                            <span>
                                Delivery in:{" "}
                                <strong className="text-slate-900">
                                    {deliveryDetails?.estimatedDays}
                                </strong>
                            </span>
                        </div>

                        {deliveryDetails?.codAvailable && (
                            <p className="text-slate-600">
                                Cash on Delivery (COD):{" "}
                                <strong className="text-slate-900">Available</strong>
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Unavailable State */}
            {status === "unavailable" && (
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50/70 p-3 text-xs text-rose-800">
                    <FiAlertCircle className="text-rose-600 text-base shrink-0" />
                    <span>Sorry, delivery is not available for pincode {pincode}.</span>
                </div>
            )}
        </div>
    );
}