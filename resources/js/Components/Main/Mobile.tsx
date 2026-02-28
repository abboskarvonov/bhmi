import { Link } from "@inertiajs/react";
import { IoMenu } from "react-icons/io5";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";

const navLinks = [
    { label: "Jurnal haqida", route: "home" },
    { label: "Tahririyat a'zolari", route: "members" },
    { label: "Maqola talablari", route: "requirements" },
    { label: "Tahririyat nizomi", route: "statue" },
    { label: "Maqolalar", route: "article" },
    { label: "Arxiv", route: "archive" },
];

function Mobile() {
    return (
        <div className="block lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <button
                        aria-label="Menyuni ochish"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                        <IoMenu size={22} />
                    </button>
                </SheetTrigger>

                <SheetContent
                    className="border-l-emerald-700 bg-gradient-to-b from-emerald-900 to-teal-800 text-white [&>button]:text-white [&>button]:opacity-80 [&>button:hover]:opacity-100"
                >
                    <SheetHeader>
                        {/* Logo area */}
                        <div className="flex items-center gap-3 pb-6 pt-2">
                            <div className="rounded-xl bg-white p-1.5">
                                <img
                                    src="/img/logo_min.webp"
                                    className="w-10"
                                    alt="BHMI logotipi"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <SheetTitle className="text-left text-base font-bold leading-tight text-white">
                                Journal of Accounting<br />
                                <span className="text-sm font-medium text-emerald-200">
                                    and Financial Economics
                                </span>
                            </SheetTitle>
                        </div>

                        {/* Top accent line */}
                        <div className="h-px w-full bg-gradient-to-r from-emerald-400 via-teal-300 to-transparent" />

                        {/* Nav links */}
                        <nav className="mt-4 flex flex-col gap-1" aria-label="Mobil navigatsiya">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.route}
                                    href={route(link.route)}
                                    className="group flex items-center gap-3 rounded-lg px-3 py-3 text-emerald-100 transition-all hover:bg-white/10 hover:text-white"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default Mobile;
