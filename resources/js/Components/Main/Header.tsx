import { Link, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { FaUser, FaUserPlus } from "react-icons/fa6";
import { FiLogIn, FiLogOut, FiSearch } from "react-icons/fi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Mobile from "./Mobile";

const navLinks = [
    { label: "Jurnal haqida", route: "home" },
    { label: "Tahririyat a'zolari", route: "members" },
    { label: "Maqola talablari", route: "requirements" },
    { label: "Tahririyat nizomi", route: "statue" },
    { label: "Maqolalar", route: "article" },
    { label: "Arxiv", route: "archive" },
];

function Header() {
    const { post } = useForm();
    const user = usePage().props.auth.user;
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setSearchQuery("");
        }
    }, [open]);

    const handleLogout = () => {
        post(route("logout"));
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            setOpen(false);
            router.get(route("search"), { q: searchQuery.trim() });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-800 shadow-lg">
            {/* Top accent line */}
            <div className="h-0.5 w-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400" />

            <div className="container flex items-center justify-between py-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex max-w-80 items-center gap-3 text-lg font-bold text-white transition-opacity hover:opacity-90"
                    aria-label="BHMI bosh sahifaga o'tish"
                >
                    <div className="rounded-xl bg-white p-1">
                        <img
                            src="/img/logo_min.webp"
                            className="w-12"
                            alt="BHMI logotipi"
                            width={48}
                            height={48}
                            loading="eager"
                        />
                    </div>
                    <span className="leading-tight text-emerald-50">
                        Journal of Accounting
                        <br />
                        <span className="text-sm font-medium text-emerald-200">
                            and Financial Economics
                        </span>
                    </span>
                </Link>

                {/* Nav + actions */}
                <nav
                    className="flex items-center gap-3 text-sm font-medium"
                    aria-label="Asosiy navigatsiya"
                >
                    {/* Desktop nav links */}
                    <div className="hidden items-center gap-1 lg:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.route}
                                href={route(link.route)}
                                className="group relative px-3 py-2 text-emerald-100 transition-colors hover:text-white"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 scale-x-0 rounded-full bg-emerald-300 transition-transform duration-300 group-hover:scale-x-100" />
                            </Link>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="mx-2 hidden h-6 w-px bg-emerald-600 lg:block" />

                    {/* Search button */}
                    <button
                        onClick={() => setOpen(true)}
                        aria-label="Qidirish"
                        className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-emerald-100 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
                    >
                        <FiSearch className="h-4 w-4" aria-hidden="true" />
                    </button>

                    {/* Divider */}
                    <div className="mx-1 h-6 w-px bg-emerald-600" />

                    {/* Auth buttons */}
                    {user ? (
                        <>
                            <Link href={route("dashboard")}>
                                <button
                                    aria-label="Boshqaruv paneli"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-emerald-100 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
                                >
                                    <FaUser
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                </button>
                            </Link>
                            <button
                                onClick={handleLogout}
                                aria-label="Chiqish"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-emerald-100 backdrop-blur-sm transition-all hover:bg-red-500/30 hover:text-red-200"
                            >
                                <FiLogOut
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href={route("login")}>
                                <button
                                    aria-label="Kirish"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-emerald-100 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
                                >
                                    <FiLogIn
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                </button>
                            </Link>
                            <Link href={route("register")}>
                                <button
                                    aria-label="Ro'yxatdan o'tish"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-emerald-100 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
                                >
                                    <FaUserPlus
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                </button>
                            </Link>
                        </>
                    )}

                    <Mobile />
                </nav>
            </div>

            {/* Search modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Qidirish</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center gap-2 pt-2">
                        <div className="relative flex-1">
                            <FiSearch
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                aria-hidden="true"
                            />
                            <input
                                ref={inputRef}
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Kalit so'z kiriting..."
                                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                aria-label="Qidiruv maydoni"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            aria-label="Qidirish tugmasi"
                            className="flex items-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
                        >
                            <FiSearch className="h-4 w-4" aria-hidden="true" />
                            Qidirish
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </header>
    );
}

export default Header;
