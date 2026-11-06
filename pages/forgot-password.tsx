import { apiRequest } from "@/lib/client";
import Head from "next/head";
import Link from "next/link";
import { useState, SubmitEvent } from "react";
import { useRouter } from "next/router";

export default function ForgotPasswordPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await apiRequest("/forgot-password", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, mobile: mobile }),
            });

            if (response.success) {
                setSuccess(response.message || "If an account exists with this email, password reset instructions will be sent.");
                setUserId(response.user_id);
                setIsSubmitted(true);
            } else {
                setError(response.message);
            }

        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmitPassword(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (password !== cPassword) {

            setError('Password and Confirm Password do not match.');
            setLoading(false);
            return;
        }

        try {
            const response = await apiRequest("/update-password", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: userId, password: password }),
            });

            if (response.success) {
                setSuccess(response.message || "Password updated successfully. You can now log in with your new password.");
                router.replace("/login");
            } else {
                setError(response.message);
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Head>
                <title>Forgot Password | Freshora</title>
                <meta
                    name="description"
                    content="Reset your Freshora account password securely."
                />
            </Head>

            <main className="bg-slate-50">
                <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

                    <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-2">

                        {/* Left Branding */}
                        <div className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-emerald-950 via-emerald-800 to-green-700 p-10 lg:flex">
                            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime-300/10 blur-3xl" />

                            <Link href="/" className="relative flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300 text-2xl">
                                    🛒
                                </div>
                                <span className="text-2xl font-extrabold text-white">
                                    Freshora
                                </span>
                            </Link>

                            <div className="relative">
                                <div className="text-6xl">🔐</div>

                                <h1 className="mt-8 text-4xl font-extrabold leading-tight text-white">
                                    Secure your
                                    <br />
                                    <span className="text-lime-300">Freshora account.</span>
                                </h1>

                                <p className="mt-5 max-w-sm text-base leading-8 text-emerald-100">
                                    Don't worry! It happens. Follow a few simple steps to
                                    regain access to your account and continue shopping.
                                </p>
                            </div>

                            <p className="relative text-sm text-emerald-200">
                                Fresh food. Fresh choices. Fresh living.
                            </p>
                        </div>

                        {/* Right Form */}
                        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
                            <div className="w-full max-w-md">

                                {/* Mobile Logo */}
                                <div className="mb-10 text-center lg:hidden">
                                    <Link href="/" className="inline-flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-xl">
                                            🛒
                                        </div>
                                        <span className="text-2xl font-extrabold text-emerald-900">
                                            Freshora
                                        </span>
                                    </Link>
                                </div>

                                {/* Icon */}
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
                                    ✉️
                                </div>

                                <p className="mt-7 text-sm font-bold uppercase tracking-widest text-emerald-700">
                                    Account Recovery
                                </p>

                                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                                    Forgot Password?
                                </h2>

                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    No worries! Enter the email address associated with your
                                    account and we'll send you instructions to reset your password.
                                </p>

                                {error && (
                                    <div
                                        role="alert"
                                        className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 mt-5"
                                    >
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div
                                        role="status"
                                        className="rounded-xl bg-emerald-50 px-4 py-4 text-sm leading-6 text-emerald-800 mt-4"
                                    >
                                        {/* <div className="mb-1 font-bold">
                                            ✓ Request submitted
                                        </div> */}
                                        {success}
                                    </div>
                                )}

                                {!isSubmitted ? (
                                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                                Email Address
                                            </label>

                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your registered email"
                                                autoComplete="email"
                                                required
                                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                                Mobile
                                            </label>

                                            <input
                                                type="text"
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
                                                placeholder="Enter your registered mobile"
                                                autoComplete="mobile"
                                                required
                                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {loading ? "Sending Instructions..." : "Send Reset Link"}
                                            {!loading && <span>→</span>}
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleSubmitPassword} className="mt-8 space-y-5">
                                        <input type="hidden" name="user_id" value={userId} />
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                                New Password
                                            </label>

                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter new password"
                                                autoComplete="password"
                                                required
                                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                                Confirm Password
                                            </label>

                                            <input
                                                type="password"
                                                value={cPassword}
                                                onChange={(e) => setCPassword(e.target.value)}
                                                placeholder="Enter Confirm Password"
                                                autoComplete="password"
                                                required
                                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {loading ? "Sending Instructions..." : "Send Reset Link"}
                                            {!loading && <span>→</span>}
                                        </button>
                                    </form>
                                )}

                                <div className="mt-8 border-t border-slate-100 pt-7 text-center">
                                    <Link
                                        href="/login"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition hover:text-emerald-900"
                                    >
                                        <span>←</span> Back to Login
                                    </Link>
                                </div>

                                <p className="mt-8 text-center text-xs text-slate-400">
                                    Need help? Contact our support team.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
