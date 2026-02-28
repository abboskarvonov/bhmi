import Breadcrumb from "@/Components/Custom/Breadcrumb";
import Right from "@/Components/Home/Right";
import MainLayout from "@/Layouts/MainLayout";
import { Article } from "@/types/article";
import { Journal } from "@/types/journal";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import {
    FaAngleLeft,
    FaAngleRight,
    FaArrowRight,
    FaCalendarDays,
} from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";

interface ArchivePagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: Journal[];
}

export interface ArchiveProps {
    archives: ArchivePagination;
    articles: Article[];
}

function Archive({ archives, articles }: ArchiveProps) {
    const { data, current_page, last_page, total } = archives;

    return (
        <MainLayout
            title="Jurnal sonlari"
            description="BHMI — Buxlateriya hisobi va moliyaviy iqtisod jurnalining barcha sonlari arxivi."
        >
            <Breadcrumb title="Jurnal sonlari" />

            <div className="container mx-auto grid min-h-[550px] max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-3 lg:gap-16 lg:px-4">
                <div className="col-span-1 md:col-span-2">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-700 to-teal-600" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            Barcha jurnal sonlari
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {data.map((archive) => (
                            <Link
                                key={archive.id}
                                href={`/archive/${archive.slug}`}
                                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-xl"
                            >
                                {/* Editorial cover header */}
                                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-800 px-5 py-6">
                                    {/* Diagonal stripe pattern */}
                                    <div
                                        className="pointer-events-none absolute inset-0 opacity-[0.08]"
                                        style={{
                                            backgroundImage:
                                                "repeating-linear-gradient(-55deg, transparent, transparent 8px, rgba(255,255,255,0.6) 8px, rgba(255,255,255,0.6) 9px)",
                                        }}
                                    />
                                    {/* Glow blob */}
                                    <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-teal-400/10 blur-2xl" />

                                    <div className="relative flex items-start justify-between gap-3">
                                        <h3 className="line-clamp-3 flex-1 text-sm font-semibold leading-snug text-white/90">
                                            {archive.name}
                                        </h3>

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/20">
                                            <FiBookOpen className="h-5 w-5 text-white" />
                                        </div>
                                    </div>

                                    <p className="relative mt-4 text-right text-xs font-bold tracking-widest text-white/20">
                                        {format(archive.date, "yyyy")}
                                    </p>
                                </div>

                                {/* Card footer */}
                                <div className="flex items-center justify-between px-5 py-3">
                                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                                        <FaCalendarDays className="h-3 w-3" />
                                        {format(archive.date, "dd.MM.yyyy")}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 transition-all group-hover:gap-2">
                                        Ko'rish
                                        <FaArrowRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {total > 10 && (
                        <div className="mt-10 flex items-center justify-center gap-2">
                            <Link
                                href={current_page !== 1 ? `/archive?page=${current_page - 1}` : "#"}
                                aria-label="Oldingi sahifa"
                            >
                                <button
                                    disabled={current_page === 1}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-all hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <FaAngleLeft className="h-3.5 w-3.5" />
                                </button>
                            </Link>

                            <div className="flex items-center gap-1.5">
                                {[...Array(last_page)].map((_, index) => {
                                    const page = index + 1;
                                    return (
                                        <Link
                                            key={page}
                                            href={`/archive?page=${page}`}
                                            aria-label={`${page}-sahifa`}
                                        >
                                            <button
                                                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                                                    page === current_page
                                                        ? "bg-emerald-700 text-white shadow-sm"
                                                        : "border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700"
                                                }`}
                                                aria-current={page === current_page ? "page" : undefined}
                                            >
                                                {page}
                                            </button>
                                        </Link>
                                    );
                                })}
                            </div>

                            <Link
                                href={current_page !== last_page ? `/archive?page=${current_page + 1}` : "#"}
                                aria-label="Keyingi sahifa"
                            >
                                <button
                                    disabled={current_page === last_page}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-all hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <FaAngleRight className="h-3.5 w-3.5" />
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                <Right articles={articles} />
            </div>
        </MainLayout>
    );
}

export default Archive;
