import { apiRequest } from "@/lib/client";
import Head from "next/head";
import Link from "next/link";
import { useState, SubmitEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [loginType, setLoginType] = useState<"email" | "mobile">("email");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const payload = {
                username: form.username,
                password: form.password,
                remember: rememberMe
            };

            const response = await apiRequest("/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.success) {
                setSuccess("Login successful! Redirecting...");

                window.dispatchEvent(new Event("auth-changed"));

                router.replace("/account");
            } else {
                setError(response.message || "Login failed.");
            }

        } catch (err) {
            try {
                const error = JSON.parse(
                    err instanceof Error ? err.message : String(err)
                );

                setError(error.message || "Something went wrong.");
            } catch {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong."
                );
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Head>
                <title>Login to Freshora | Your Fresh Grocery Store</title>
                <meta
                    name="description"
                    content="Login to your Freshora account to shop fresh groceries and manage your orders."
                />
            </Head>

            <main className="min-h-screen bg-slate-50">
                <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">

                    {/* Left: Branding */}
                    <div className="relative hidden min-h-162.5 overflow-hidden rounded-4xl bg-linear-to-br from-emerald-950 via-emerald-800 to-green-700 p-10 lg:flex lg:flex-col lg:justify-between">
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
                                    Welcome back!
                                </span>

                                <h1 className="mt-7 text-5xl font-extrabold leading-tight text-white">
                                    Fresh food.
                                    <br />
                                    Fresh choices.
                                    <br />
                                    <span className="text-lime-300">Fresh living.</span>
                                </h1>

                                <p className="mt-6 max-w-md text-base leading-8 text-emerald-100">
                                    Sign in to your Freshora account and enjoy a simple way
                                    to shop for your everyday grocery essentials.
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

                    {/* Right: Login form */}
                    <div className="mx-auto w-full max-w-md">
                        <div className="mb-8 text-center lg:hidden">
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
                                    Your account
                                </p>
                                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                                    Welcome Back!
                                </h2>
                                <p className="mt-2 text-sm text-slate-500">
                                    Please enter your details to sign in.
                                </p>
                            </div>

                            {/* Login type */}
                            <div className="mt-8 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLoginType("email");
                                        setError("");
                                    }}
                                    className={`rounded-lg py-3 text-sm font-bold transition ${loginType === "email"
                                        ? "bg-white text-emerald-800 shadow-sm"
                                        : "text-slate-500 hover:text-slate-800"
                                        }`}
                                >
                                    Email Address
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLoginType("mobile");
                                        setError("");
                                    }}
                                    className={`rounded-lg py-3 text-sm font-bold transition ${loginType === "mobile"
                                        ? "bg-white text-emerald-800 shadow-sm"
                                        : "text-slate-500 hover:text-slate-800"
                                        }`}
                                >
                                    Mobile Number
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                                {/* Email */}
                                {loginType === "email" ? (
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="username"
                                            value={form.username}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />
                                    </div>
                                ) : (
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
                                                name="username"
                                                value={form.username}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        username: e.target.value.replace(/\D/g, "").slice(0, 10),
                                                    })
                                                }
                                                placeholder="Enter mobile number"
                                                autoComplete="tel-national"
                                                inputMode="numeric"
                                                pattern="[0-9]{10}"
                                                required
                                                className="min-w-0 flex-1 px-4 py-3.5 text-sm outline-none"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Password */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label className="text-sm font-semibold text-slate-700">
                                            Password
                                        </label>
                                        <Link
                                            href="/forgot-password"
                                            className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-14 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-emerald-700"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember me */}
                                <label className="flex cursor-pointer items-center gap-2.5">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 rounded accent-emerald-700"
                                    />
                                    <span className="text-sm text-slate-600">
                                        Remember me
                                    </span>
                                </label>

                                {/* Messages */}
                                {error && (
                                    <div role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                        {success}
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? "Signing In..." : "Sign In"}
                                    {!loading && <span>→</span>}
                                </button>
                            </form>

                            <div className="my-7 flex items-center gap-4">
                                <div className="h-px flex-1 bg-slate-200" />
                                <span className="text-xs font-medium text-slate-400">
                                    NEW TO FRESHORA?
                                </span>
                                <div className="h-px flex-1 bg-slate-200" />
                            </div>

                            <Link
                                href="/signup"
                                className="flex w-full items-center justify-center rounded-xl border border-emerald-700 px-5 py-3.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
                            >
                                Create New Account
                            </Link>
                        </div>

                        <p className="mt-6 text-center text-xs leading-6 text-slate-400">
                            By continuing, you agree to Freshora's{" "}
                            <Link href="/terms" className="font-semibold text-emerald-700 hover:underline">
                                Terms & Conditions
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="font-semibold text-emerald-700 hover:underline">
                                Privacy Policy
                            </Link>.
                        </p>

                        <p className="mt-4 text-center text-sm text-slate-500">
                            <Link href="/" className="font-semibold text-emerald-700 hover:underline">
                                ← Back to Home
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
