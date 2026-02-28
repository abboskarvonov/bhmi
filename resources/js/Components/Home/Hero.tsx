import { Journal } from "@/types/journal";
import { Link } from "@inertiajs/react";
import { FaArrowRight, FaEnvelope } from "react-icons/fa6";
import { FaPaperPlane, FaPhoneAlt } from "react-icons/fa";
import { FiBookOpen, FiUsers, FiFileText } from "react-icons/fi";

const stats = [
    {
        icon: <FiBookOpen className="h-4 w-4" />,
        label: "Jurnal sonlari",
        href: "/archive",
    },
    {
        icon: <FiFileText className="h-4 w-4" />,
        label: "Ilmiy maqolalar",
        href: "/article",
    },
    {
        icon: <FiUsers className="h-4 w-4" />,
        label: "Tahririyat a'zolari",
        href: route("members"),
    },
];

function Hero({ latest_journal }: { latest_journal: Journal }) {
    return (
        <section
            className="relative overflow-hidden"
            style={{
                background:
                    "linear-gradient(45deg, #022c22 0%, #064e3b 28%, #0d7a5f 50%, #064e3b 72%, #022c22 100%)",
            }}
        >
            {/* Dot grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.045]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #fff 2px, transparent 2px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Shine lines — tepadan ~65% pastga */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0"
                style={{
                    height: "65%",
                    backgroundImage:
                        "repeating-linear-gradient(45deg, transparent 0px, transparent 200px, rgba(255,255,255,0.045) 200px, rgba(255,255,255,0.045) 201.5px, transparent 201.5px)",
                }}
            />
            {/* Shine lines — pastdan ~70% yuqoriga */}
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0"
                style={{
                    height: "70%",
                    backgroundImage:
                        "repeating-linear-gradient(45deg, transparent 0px, transparent 180px, rgba(255,255,255,0.035) 180px, rgba(255,255,255,0.035) 181.5px, transparent 181.5px)",
                }}
            />

            <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
                <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
                    {/* Left — content */}
                    <div className="flex flex-1 flex-col gap-6">
                        {/* Logo + Title */}
                        <div className="space-y-4">
                            <img
                                src="/img/logo.webp"
                                className="w-36 drop-shadow-lg"
                                alt="BHMI jurnal logotipi"
                                width={144}
                                height={54}
                                loading="eager"
                            />
                            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                                Journal of{" "}
                                <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                                    Accounting
                                </span>
                                <br />
                                and Financial Economics
                            </h1>
                            <p className="max-w-md text-base text-white/80 lg:text-lg">
                                Buxlateriya hisobi va moliyaviy iqtisod
                                sohasidagi ilmiy tadqiqotlar va maqolalar
                                nashri.
                            </p>
                        </div>

                        {/* Contacts */}
                        <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                            <a
                                href="tel:+998937279555"
                                className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
                            >
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                                    <FaPhoneAlt
                                        className="h-3 w-3"
                                        aria-hidden="true"
                                    />
                                </span>
                                +998 93 727 95 55
                            </a>
                            <a
                                href="mailto:buxglateriyahisobi@gmail.com"
                                className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
                            >
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                                    <FaEnvelope
                                        className="h-3 w-3"
                                        aria-hidden="true"
                                    />
                                </span>
                                buxglateriyahisobi@gmail.com
                            </a>
                        </div>

                        {/* CTA buttons */}
                        <div className="flex flex-wrap gap-3">
                            {latest_journal && (
                                <Link href={`/archive/${latest_journal.slug}`}>
                                    <button className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emerald-900 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-emerald-900/30 active:scale-95">
                                        Oxirgi son
                                        <FaArrowRight
                                            className="h-3.5 w-3.5"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </Link>
                            )}
                            <Link href="/article">
                                <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95">
                                    Maqolalar
                                </button>
                            </Link>
                            <Link href={route("submissions.create")}>
                                <button className="flex items-center gap-2 rounded-xl border border-emerald-300/40 bg-emerald-500/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-emerald-500/30 active:scale-95">
                                    <FaPaperPlane className="h-3.5 w-3.5" aria-hidden="true" />
                                    Maqola yuborish
                                </button>
                            </Link>
                        </div>

                        {/* Stats row */}
                        <div className="mt-2 flex flex-wrap gap-4 border-t border-white/20 pt-6">
                            {stats.map((stat) => (
                                <Link
                                    key={stat.label}
                                    href={stat.href}
                                    className="group flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-all group-hover:border-white/40 group-hover:bg-white/20">
                                        {stat.icon}
                                    </span>
                                    {stat.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right — image */}
                    <div className="relative flex-shrink-0 lg:w-2/5">
                        {/* Glow behind image */}
                        <div className="absolute inset-0 rounded-3xl bg-emerald-400/10 blur-2xl" />

                        {/* Frame ring */}
                        <div className="relative rounded-2xl p-1 ring-1 ring-white/10">
                            <img
                                src="/img/page.webp"
                                className="h-[460px] w-full rounded-xl object-cover shadow-2xl lg:h-[520px]"
                                alt="BHMI jurnal sahifasi"
                                width={480}
                                height={520}
                                fetchPriority="high"
                                loading="eager"
                                decoding="async"
                            />
                            {/* Overlay gradient on image bottom */}
                            <div className="absolute inset-x-0 bottom-0 h-24 rounded-b-xl bg-gradient-to-t from-emerald-700/60 to-transparent" />

                            {/* Floating badge on image */}
                            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-xl border border-white/10 bg-emerald-700/80 px-3 py-2 backdrop-blur-md">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                <span className="text-xs font-medium text-emerald-100">
                                    {latest_journal?.name ?? "So'nggi son"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom wave separator */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
        </section>
    );
}

export default Hero;
