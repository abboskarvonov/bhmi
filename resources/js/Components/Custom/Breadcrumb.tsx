import { Link } from "@inertiajs/react";
import { FaChevronRight, FaHouse } from "react-icons/fa6";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface Props {
    title: string;
    items?: BreadcrumbItem[];
}

function Breadcrumb({ title, items = [] }: Props) {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-800">
            {/* Diagonal stripe */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(-55deg, transparent, transparent 8px, rgba(255,255,255,0.6) 8px, rgba(255,255,255,0.6) 9px)",
                }}
            />
            {/* Glow blobs */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-12 bottom-0 h-56 w-56 rounded-full bg-teal-400/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-36">
                {/* Breadcrumb nav */}
                <nav
                    className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-emerald-300/60"
                    aria-label="Breadcrumb"
                >
                    <Link
                        href={route("home")}
                        className="flex items-center gap-1 transition-colors hover:text-emerald-300"
                    >
                        <FaHouse className="h-3 w-3" />
                        Bosh sahifa
                    </Link>

                    {items.map((item) => (
                        <span
                            key={item.href}
                            className="flex items-center gap-1.5"
                        >
                            <FaChevronRight className="h-2 w-2 text-emerald-400/40" />
                            <Link
                                href={item.href}
                                className="transition-colors hover:text-emerald-300"
                            >
                                {item.label}
                            </Link>
                        </span>
                    ))}

                    <span className="flex items-center gap-1.5">
                        <FaChevronRight className="h-2 w-2 text-emerald-400/40" />
                        <span className="max-w-xs truncate text-emerald-300/40">
                            {title}
                        </span>
                    </span>
                </nav>

                {/* Title */}
                <h1 className="max-w-3xl text-xl font-bold leading-snug text-white sm:text-2xl lg:text-[1.75rem]">
                    {title}
                </h1>
            </div>

            {/* Bottom fade */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        </div>
    );
}

export default Breadcrumb;
