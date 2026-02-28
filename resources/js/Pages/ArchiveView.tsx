import Right from "@/Components/Home/Right";
import MainLayout from "@/Layouts/MainLayout";
import { Article } from "@/types/article";
import { Journal } from "@/types/journal";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import {
    FaArrowRight,
    FaCalendarDays,
    FaDownload,
    FaUserTie,
} from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";

interface Props {
    journal: Journal;
    articles: Article[];
}

function ArchiveView({ journal, articles }: Props) {
    const articleCount = journal.articles?.length ?? 0;
    const description = `${journal.name} — BHMI jurnalining ushbu sonida ${articleCount} ta ilmiy maqola mavjud.`;

    return (
        <MainLayout title={journal.name} description={description}>
            {/* ── Journal Hero ────────────────────────────────────── */}
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

                <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-28">
                    {/* Mini breadcrumb */}
                    <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-emerald-300/60">
                        <Link
                            href="/"
                            className="transition-colors hover:text-emerald-300"
                        >
                            Bosh sahifa
                        </Link>
                        <span>/</span>
                        <Link
                            href="/archive"
                            className="transition-colors hover:text-emerald-300"
                        >
                            Arxiv
                        </Link>
                        <span>/</span>
                        <span className="line-clamp-1 max-w-xs text-emerald-300/40">
                            {journal.name}
                        </span>
                    </nav>

                    {/* Journal name */}
                    <h1 className="max-w-3xl text-xl font-bold leading-snug text-white sm:text-2xl lg:text-[1.75rem]">
                        {journal.name}
                    </h1>

                    {/* Meta pills */}
                    <div className="mt-6 flex flex-wrap gap-2.5">
                        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur-sm">
                            <FaCalendarDays className="h-3 w-3 shrink-0 text-emerald-300" />
                            {format(journal.date, "dd.MM.yyyy")}
                        </span>
                        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
                            <FiFileText className="h-3 w-3 shrink-0 text-emerald-300" />
                            {articleCount} ta maqola
                        </span>
                    </div>

                    {/* Download button */}
                    {journal.file_url && (
                        <a
                            href={`/storage/${journal.file_url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-emerald-900 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-emerald-900/20 active:scale-95"
                        >
                            <FaDownload className="h-3.5 w-3.5" />
                            Jurnalni yuklash
                        </a>
                    )}
                </div>

                {/* Bottom fade */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
            </div>

            {/* ── Main grid ──────────────────────────────────────── */}
            <div className="container mx-auto grid min-h-[400px] max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-3 lg:gap-16 lg:px-4">
                <div className="col-span-1 space-y-6 md:col-span-2">
                    {/* Articles list */}
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-700 to-teal-600" />
                            <h2 className="text-xl font-bold text-gray-900">
                                Jurnaldagi maqolalar
                            </h2>
                            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-sm font-semibold text-emerald-800">
                                {articleCount}
                            </span>
                        </div>

                        {articleCount > 0 ? (
                            <div className="space-y-3">
                                {journal.articles.map((article, index) => (
                                    <Link
                                        key={article.id}
                                        href={`/article/${article.slug}`}
                                        className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                                    >
                                        {/* Left accent bar */}
                                        <div className="absolute inset-y-0 left-0 w-0.5 scale-y-0 rounded-full bg-gradient-to-b from-emerald-600 to-teal-500 transition-transform duration-300 group-hover:scale-y-100" />

                                        {/* Index badge */}
                                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200/70 transition-all group-hover:bg-emerald-700 group-hover:text-white group-hover:ring-emerald-700">
                                            {index + 1}
                                        </span>

                                        <div className="flex-1 space-y-2">
                                            <h3 className="font-semibold leading-snug text-gray-900 transition-colors group-hover:text-emerald-800">
                                                {article.name}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1.5">
                                                    <FaUserTie className="h-3 w-3 shrink-0 text-emerald-600" />
                                                    {article.author}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <FaCalendarDays className="h-3 w-3 shrink-0 text-emerald-600" />
                                                    {format(
                                                        article.date,
                                                        "dd.MM.yyyy",
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <FaArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-16 text-center">
                                <FiFileText className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                                <p className="text-gray-400">
                                    Bu sonda hali maqolalar mavjud emas
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <Right articles={articles} />
            </div>
        </MainLayout>
    );
}

export default ArchiveView;
