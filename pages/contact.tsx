import Head from "next/head";
import Link from "next/link";
import { useState, SubmitEvent } from "react";

const contactOptions = [
    {
        icon: "✉",
        title: "Email Us",
        detail: "Send us your questions",
        value: "support@freshora.com",
        href: "mailto:support@freshora.com",
    },
    {
        icon: "☎",
        title: "Call Us",
        detail: "Speak with our team",
        value: "+91 00000 00000",
        href: "tel:+910000000000",
    },
    {
        icon: "📍",
        title: "Our Location",
        detail: "We're here to help",
        value: "Add your business address",
        href: "",
    },
];

export default function Contact() {

    const initialForm = {
        name: "",
        email: "",
        subject: "",
        order_number: "",
        message: "",
    };


    const [form, setForm] = useState(initialForm);

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [submitted, setSubmitted] = useState(false);

    async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsLoading(true);
        setSubmitted(false);
        setError("");

        try {

            const payload = form;

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/contact`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to submit your enquiry."
                );
            }

            setForm(initialForm);
            setSubmitted(true);

        } catch (err: unknown) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setIsLoading(false);
            setSubmitted(false);
        }
    }

    return (
        <>
            <Head>
                <title>Contact Us | Freshora</title>
                <meta
                    name="description"
                    content="Contact Freshora for grocery order questions, product enquiries and customer support."
                />
            </Head>

            <main className="min-h-screen bg-slate-50">
                {/* Hero */}
                <section className="relative overflow-hidden bg-linear-to-br from-emerald-900 via-emerald-800 to-green-700">
                    <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime-300/10 blur-3xl" />
                    <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                        <nav className="mb-6 text-sm text-emerald-100">
                            <Link href="/" className="hover:text-white">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="font-semibold text-white">Contact Us</span>
                        </nav>

                        <div className="max-w-3xl">
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-50">
                                We're here for you
                            </span>

                            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Let's Start a
                                <span className="block text-lime-300">Conversation.</span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-base leading-8 text-emerald-50 sm:text-lg">
                                Have a question about your groceries, an order, or our
                                products? Send us a message and our team will be happy to help.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact cards */}
                <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {contactOptions.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-6"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl text-emerald-700">
                                    {item.icon}
                                </div>

                                <h2 className="mt-4 text-lg font-extrabold text-slate-900">
                                    {item.title}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">{item.detail}</p>

                                {item.href ? (
                                    <a
                                        href={item.href}
                                        className="mt-3 inline-block wrap-break-word text-sm font-bold text-emerald-700 hover:text-emerald-900"
                                    >
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className="mt-3 text-sm font-bold text-slate-700">
                                        {item.value}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Form and help panel */}
                <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-10 lg:px-8">
                    <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
                        {/* Contact form */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
                            <div className="mb-8">
                                <span className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                                    Send a message
                                </span>

                                <h2 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                                    How can we help you?
                                </h2>

                                <p className="mt-3 text-sm leading-7 text-slate-500">
                                    Fill in the form below with your enquiry.
                                </p>
                            </div>

                            {submitted ? (
                                <div
                                    role="status"
                                    className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
                                >
                                    <div className="text-3xl">✓</div>
                                    <h3 className="mt-3 text-xl font-bold text-emerald-900">
                                        Form submitted in demo mode
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-emerald-800">
                                        No message has been sent yet. Connect this form to your
                                        backend to receive enquiries.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setSubmitted(false)}
                                        className="mt-5 text-sm font-bold text-emerald-800 underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={onSubmit} className="space-y-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="mb-2 block text-sm font-semibold text-slate-700"
                                            >
                                                Full Name *
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                autoComplete="name"
                                                required
                                                maxLength={100}
                                                placeholder="Enter your name"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                                                value={form.name}
                                                onChange={(e) =>
                                                    setForm({ ...form, name: e.target.value })
                                                }
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="mb-2 block text-sm font-semibold text-slate-700"
                                            >
                                                Email Address *
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                maxLength={254}
                                                placeholder="you@example.com"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                                                value={form.email}
                                                onChange={(e) =>
                                                    setForm({ ...form, email: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            Enquiry Type *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                                            value={form.subject}
                                            onChange={(e) =>
                                                setForm({ ...form, subject: e.target.value })
                                            }
                                        >
                                            <option>General Enquiry</option>
                                            <option>Order Status</option>
                                            <option>Missing or Damaged Item</option>
                                            <option>Product Enquiry</option>
                                            <option>Payment Issue</option>
                                            <option>Feedback or Suggestion</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="orderNumber"
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            Order Number{" "}
                                            <span className="font-normal text-slate-400">
                                                (Optional)
                                            </span>
                                        </label>
                                        <input
                                            id="orderNumber"
                                            name="orderNumber"
                                            type="text"
                                            maxLength={100}
                                            placeholder="e.g. FR-10025"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                                            value={form.order_number}
                                            onChange={(e) =>
                                                setForm({ ...form, order_number: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            Your Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            required
                                            minLength={10}
                                            maxLength={3000}
                                            placeholder="Tell us how we can help..."
                                            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                                            value={form.message}
                                            onChange={(e) =>
                                                setForm({ ...form, message: e.target.value })
                                            }
                                        />
                                    </div>

                                    <button type="submit" disabled={isLoading} className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 sm:w-auto">

                                        {isLoading ? (
                                            "Loading..."
                                        ) : (
                                            <>
                                                Submit Enquiry <span className="ml-2">→</span>
                                            </>
                                        )}

                                    </button>
                                    <p className="text-xs leading-5 text-slate-400">
                                        This demo form does not send or store messages until a
                                        backend endpoint is connected.
                                    </p>
                                </form>
                            )}
                        </div>

                        {/* Help panel */}
                        <aside className="space-y-6">
                            <div className="rounded-3xl bg-emerald-900 p-6 text-white sm:p-8">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                                    💬
                                </div>

                                <h2 className="mt-6 text-2xl font-extrabold">
                                    We're happy to help
                                </h2>

                                <p className="mt-4 text-sm leading-7 text-emerald-100">
                                    Whether you have a question about a product or need help
                                    with an order, send us your enquiry and we'll help you find
                                    the right next step.
                                </p>

                                <div className="mt-6 border-t border-white/15 pt-5">
                                    <p className="text-sm font-bold">Looking for groceries?</p>
                                    <Link
                                        href="/categories"
                                        className="mt-3 inline-flex items-center font-bold text-lime-300 hover:text-white"
                                    >
                                        Explore Categories <span className="ml-2">→</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                                <h3 className="text-lg font-extrabold text-slate-900">
                                    Quick Links
                                </h3>

                                <div className="mt-4 space-y-3">
                                    {[
                                        { label: "Shop Products", href: "/product" },
                                        { label: "Explore Categories", href: "/categories" },
                                        { label: "About Freshora", href: "/about" },
                                    ].map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                                        >
                                            {item.label}
                                            <span>→</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
            </main>
        </>
    );
}
