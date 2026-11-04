import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoPersonOutline, IoLogOutOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { apiRequest } from "@/lib/client";

export default function AccountMenu() {

    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            const response = await apiRequest("/logout", {
                method: "POST",
            });

            if (response.success) {
                setOpen(false);
                router.replace("/login");
                router.refresh();
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* Account Icon */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-label="My Account"
                aria-expanded={open}
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
                <IoPersonOutline size="1.4rem" />
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 top-full z-50 mt-3 w-52 overflow-hidden rounded-xl border border-slate-100 bg-white py-2 shadow-xl">

                    <Link
                        href="/account"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                    >
                        <FiUser size={18} />
                        My Account
                    </Link>

                    <div className="mx-3 border-t border-slate-100" />

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                        <IoLogOutOutline size={19} />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}