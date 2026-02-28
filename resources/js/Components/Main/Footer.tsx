import { Link } from "@inertiajs/react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";

const navLinks = [
    { label: "Jurnal haqida", route: "home" },
    { label: "Tahririyat a'zolari", route: "members" },
    { label: "Maqola talablari", route: "requirements" },
    { label: "Tahririyat nizomi", route: "statue" },
    { label: "Maqolalar", route: "article" },
    { label: "Arxiv", route: "archive" },
];

const contacts = [
    {
        icon: (
            <FaLocationDot className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
        ),
        content:
            "Samarqand viloyati, Samarqand shahri, Obod maskan mfy, Qorasuv mavzesi, 140-Uy, 53-xonadon.",
        href: null,
    },
    {
        icon: <FaPhone className="h-4 w-4 shrink-0 text-emerald-400" />,
        content: "+998 93 727 95 55",
        href: "tel:+998937279555",
    },
    {
        icon: <FaTelegramPlane className="h-4 w-4 shrink-0 text-emerald-400" />,
        content: "t.me/BHMIJ_UZ",
        href: "https://t.me/BHMIJ_UZ",
    },
    {
        icon: <FaEnvelope className="h-4 w-4 shrink-0 text-emerald-400" />,
        content: "buxglateriyahisobi@gmail.com",
        href: "mailto:buxglateriyahisobi@gmail.com",
    },
    {
        icon: <TbWorldWww className="h-4 w-4 shrink-0 text-emerald-400" />,
        content: "www.bhmi.uz",
        href: null,
    },
];

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-700/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-teal-600/20 blur-3xl" />

            {/* Top accent line */}
            <div className="h-0.5 w-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400" />

            <div className="relative mx-auto max-w-screen-xl px-6 py-14 lg:px-8">
                {/* Main grid */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    {/* Col 1 — Logo + tavsif */}
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-white p-1.5">
                                <img
                                    src="/img/logo_min.webp"
                                    className="w-12"
                                    alt="BHMI logotipi"
                                    width={48}
                                    height={48}
                                />
                            </div>
                            <div>
                                <p className="font-bold leading-tight text-white">
                                    Journal of Accounting
                                </p>
                                <p className="text-sm font-medium text-emerald-200">
                                    and Financial Economics
                                </p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-emerald-200/80">
                            Buxlateriya hisobi va moliyaviy iqtisod sohasidagi
                            ilmiy tadqiqotlarni chop etuvchi peer-reviewed
                            jurnal.
                        </p>
                        {/* Telegram badge */}
                        <a
                            href="https://t.me/BHMIJ_UZ"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Telegram kanalimiz"
                            className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/40 bg-white/10 px-4 py-2 text-sm text-emerald-100 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
                        >
                            <FaTelegramPlane className="h-4 w-4" />
                            Telegram
                        </a>
                    </div>

                    {/* Col 2 — Navigatsiya */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-emerald-300">
                            Sahifalar
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <li key={link.route}>
                                    <Link
                                        href={route(link.route)}
                                        className="group flex items-center gap-2 text-sm text-emerald-100 transition-all hover:text-white"
                                    >
                                        <span className="h-px w-4 bg-emerald-500 transition-all group-hover:w-6 group-hover:bg-teal-300" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 — Bog'lanish */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-emerald-300">
                            Bog'lanish
                        </h3>
                        <ul className="flex flex-col gap-4">
                            {contacts.map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-3 text-sm text-emerald-100"
                                >
                                    {item.icon}
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target={
                                                item.href.startsWith("http")
                                                    ? "_blank"
                                                    : undefined
                                            }
                                            rel="noopener noreferrer"
                                            className="transition-colors hover:text-white"
                                        >
                                            {item.content}
                                        </a>
                                    ) : (
                                        <span>{item.content}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom separator + copyright */}
                <div className="mt-12 flex flex-col items-center gap-3 border-t border-emerald-700/50 pt-8">
                    <div className="h-px w-16 bg-gradient-to-r from-emerald-400 to-teal-300" />
                    <p className="text-center text-sm text-emerald-300/70">
                        &copy; 2025 – {currentYear} Buxlateriya hisobi va
                        moliyaviy iqtisod jurnali. Barcha huquqlar himoyalangan.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
