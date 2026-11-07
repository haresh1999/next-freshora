import { useState } from "react";
import Link from "next/link";

export default function FAQSection({ faqs }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="bg-slate-50 py-16 sm:py-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="mb-10 text-center sm:mb-12">
                    <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                        Need help?
                    </span>

                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Frequently Asked{" "}
                        <span className="text-emerald-600">Questions</span>
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                        Everything you need to know about shopping with Freshora.
                    </p>
                </div>

                {/* FAQ accordion */}
                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={faq.question}
                                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${isOpen
                                    ? "border-emerald-200 shadow-md shadow-emerald-900/5"
                                    : "border-slate-200 hover:border-emerald-200"
                                    }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${index}`}
                                    className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                                >
                                    <span className="flex items-start gap-3">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-700">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <span className="pt-1 text-sm font-bold leading-6 text-slate-800 sm:text-base">
                                            {faq.question}
                                        </span>
                                    </span>

                                    <span
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${isOpen
                                            ? "rotate-180 bg-emerald-600 text-white"
                                            : "bg-slate-100 text-slate-600"
                                            }`}
                                        aria-hidden="true"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="h-4 w-4"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                d="m6 9 6 6 6-6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                </button>

                                {isOpen && (
                                    <div id={`faq-answer-${index}`} className="px-5 pb-5 pl-16 sm:px-6 sm:pb-6 sm:pl-18">
                                        <p className="text-sm leading-7 text-slate-500">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Support CTA */}
                <div className="mt-8 rounded-2xl bg-emerald-900 p-6 text-center sm:p-8">
                    <h3 className="text-xl font-bold text-white">
                        Still have questions?
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-emerald-100">
                        Our team is here to help with your Freshora shopping experience.
                    </p>

                    <Link
                        href={"/contact"}
                        className="mt-5 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
                    >
                        Contact Support <span className="ml-2">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
