import Link from "next/link"

export default function Announcement() {
    return (
        <div className="bg-slate-950 px-4 py-2 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
            Free shipping on orders over ₹999
            <span className="mx-1 text-emerald-400">•</span>
            <Link href={'/shop'} className="underline underline-offset-4 hover:text-emerald-300">
                Shop now
            </Link>
        </div>
    )
}