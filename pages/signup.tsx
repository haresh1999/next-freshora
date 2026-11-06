import { apiRequest } from "@/lib/client";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        password_confirmation: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((previous) => ({ ...previous, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (form.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (form.password !== form.password_confirmation) {
            setError("Password and confirm password do not match.");
            return;
        }

        if (!/^[0-9]{10}$/.test(form.mobile)) {
            setError("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (!agreeTerms) {
            setError("Please accept the Terms & Conditions.");
            return;
        }

        setLoading(true);

        try {
            const response = await apiRequest("/signup", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (response.success) {
                setSuccess("Your account has been created successfully!");
                window.location.href = "/login";
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

    return (
        <>
            <Head>
                <title>Create Account | Freshora</title>
                <meta
                    name="description"
                    content="Create your Freshora account and shop fresh groceries online."
                />
            </Head>

            <main className="min-h-screen bg-slate-50">
                <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-14">

                    {/* Left Branding Section */}
                    <div className="relative hidden min-h-175 overflow-hidden rounded-4xl bg-linear-to-br from-emerald-950 via-emerald-800 to-green-700 p-10 lg:flex lg:flex-col lg:justify-between">
                        <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

                        <div className="relative">
                            <Link href="/" className="inline-flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300 text-2xl">
                                    🛒
                                </div>
                                <span className="text-2xl font-extrabold tracking-tight text-white">
                                    Freshora
                                </span>
                            </Link>

                            <div className="mt-20">
                                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-lime-200">
                                    Join the Freshora family
                                </span>

                                <h1 className="mt-7 text-5xl font-extrabold leading-tight text-white">
                                    Fresh food.
                                    <br />
                                    Fresh choices.
                                    <br />
                                    <span className="text-lime-300">Fresh living.</span>
                                </h1>

                                <p className="mt-6 max-w-md text-base leading-8 text-emerald-100">
                                    Create your account and discover a simpler way to shop
                                    for your everyday grocery essentials.
                                </p>
                            </div>
                        </div>

                        <div className="relative grid grid-cols-3 gap-3">
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                                <div className="text-2xl">🥑</div>
                                <p className="mt-2 text-sm font-semibold text-white">Fresh Produce</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                                <div className="text-2xl">🥛</div>
                                <p className="mt-2 text-sm font-semibold text-white">Daily Essentials</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                                <div className="text-2xl">🍎</div>
                                <p className="mt-2 text-sm font-semibold text-white">Good Choices</p>
                            </div>
                        </div>
                    </div>

                    {/* Signup Form */}
                    <div className="mx-auto w-full max-w-md">
                        <div className="mb-7 text-center lg:hidden">
                            <Link href="/" className="inline-flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-2xl">
                                    🛒
                                </div>
                                <span className="text-2xl font-extrabold text-emerald-900">
                                    Freshora
                                </span>
                            </Link>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                                    Create your account
                                </p>

                                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                                    Get Started!
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    Fill in your details to create your Freshora account.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-7 space-y-4">

                                {/* Full Name */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        autoComplete="name"
                                        minLength={2}
                                        maxLength={100}
                                        required
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                    />
                                </div>

                                {/* Mobile */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Mobile Number
                                    </label>

                                    <div className="flex overflow-hidden rounded-xl border border-slate-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                                        <span className="flex items-center border-r border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-600">
                                            +91
                                        </span>

                                        <input
                                            type="tel"
                                            name="mobile"
                                            value={form.mobile}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                                                })
                                            }
                                            placeholder="Enter 10-digit mobile number"
                                            autoComplete="tel-national"
                                            inputMode="numeric"
                                            pattern="[0-9]{10}"
                                            required
                                            className="min-w-0 flex-1 px-4 py-3.5 text-sm outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            placeholder="Create a password"
                                            autoComplete="new-password"
                                            minLength={8}
                                            required
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pr-16 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-emerald-700"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    <p className="mt-1.5 text-xs text-slate-400">
                                        Minimum 8 characters.
                                    </p>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Confirm Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="password_confirmation"
                                            value={form.password_confirmation}
                                            onChange={handleChange}
                                            placeholder="Confirm your password"
                                            autoComplete="new-password"
                                            minLength={8}
                                            required
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3.5 pr-16 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-emerald-700"
                                        >
                                            {showConfirmPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>

                                {/* Terms */}
                                <label className="flex cursor-pointer items-start gap-3 pt-1">
                                    <input
                                        type="checkbox"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        className="mt-1 h-4 w-4 shrink-0 rounded accent-emerald-700"
                                    />

                                    <span className="text-xs leading-5 text-slate-500">
                                        I agree to the{" "}
                                        <Link
                                            href="/terms"
                                            className="font-bold text-emerald-700 hover:underline"
                                        >
                                            Terms & Conditions
                                        </Link>{" "}
                                        and{" "}
                                        <Link
                                            href="/privacy"
                                            className="font-bold text-emerald-700 hover:underline"
                                        >
                                            Privacy Policy
                                        </Link>.
                                    </span>
                                </label>

                                {/* Messages */}
                                {error && (
                                    <div
                                        role="alert"
                                        className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700"
                                    >
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div
                                        role="status"
                                        className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                                    >
                                        {success}
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? "Creating Account..." : "Create Account"}
                                    {!loading && <span>→</span>}
                                </button>
                            </form>

                            <div className="mt-7 border-t border-slate-100 pt-6 text-center">
                                <p className="text-sm text-slate-500">
                                    Already have an account?{" "}
                                    <Link
                                        href="/login"
                                        className="font-bold text-emerald-700 hover:text-emerald-900"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <p className="mt-6 text-center text-sm text-slate-500">
                            <Link
                                href="/"
                                className="font-semibold text-emerald-700 hover:underline"
                            >
                                ← Back to Home
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}