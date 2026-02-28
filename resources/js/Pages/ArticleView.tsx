import Right from "@/Components/Home/Right";
import MainLayout from "@/Layouts/MainLayout";
import { stripHtml } from "@/lib/utils";
import { Article } from "@/types/article";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import {
    FaArrowRight,
    FaCalendarDays,
    FaDownload,
    FaFileLines,
    FaUserTie,
} from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";

interface Props {
    article: Article;
    articles: Article[];
    related_articles: Article[];
}

function ArticleView({ article, articles, related_articles }: Props) {
    const description = article.annotations
        ? stripHtml(article.annotations, 160)
        : `${article.name} — Muallif: ${article.author}. BHMI ilmiy jurnal maqolasi.`;

    return (
        <MainLayout title={article.name} description={description}>
            {/* ── Article Hero ───────────────────────────────────── */}
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
                            href="/article"
                            className="transition-colors hover:text-emerald-300"
                        >
                            Maqolalar
                        </Link>
                        <span>/</span>
                        <span className="line-clamp-1 max-w-xs text-emerald-300/40">
                            {article.name}
                        </span>
                    </nav>

                    {/* Title */}
                    <h1 className="max-w-3xl text-xl font-bold leading-snug text-white sm:text-2xl lg:text-[1.75rem]">
                        {article.name}
                    </h1>

                    {/* Meta pills */}
                    <div className="mt-6 flex flex-wrap gap-2.5">
                        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur-sm">
                            <FaUserTie className="h-3 w-3 shrink-0 text-emerald-300" />
                            {article.author}
                        </span>
                        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
                            <FaCalendarDays className="h-3 w-3 shrink-0 text-emerald-300" />
                            {format(article.date, "dd.MM.yyyy")}
                        </span>
                        {article.pages && (
                            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
                                <FaFileLines className="h-3 w-3 shrink-0 text-emerald-300" />
                                {article.pages}
                            </span>
                        )}
                        {article.journal && (
                            <Link
                                href={`/archive/${article.journal.slug}`}
                                className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-700/40 px-3 py-1.5 text-xs text-emerald-200 backdrop-blur-sm transition-colors hover:bg-emerald-700/60"
                            >
                                <FiBookOpen className="h-3 w-3 shrink-0" />
                                {article.journal.name}
                            </Link>
                        )}
                    </div>

                    {/* Download CTA */}
                    {article.file_url && (
                        <a
                            href={`/storage/${article.file_url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-emerald-900 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-emerald-900/20 active:scale-95"
                        >
                            <FaDownload className="h-3.5 w-3.5" />
                            Yuklab olish (PDF)
                        </a>
                    )}
                </div>

                {/* Bottom fade */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
            </div>

            {/* ── Main grid ──────────────────────────────────────── */}
            <div className="container mx-auto grid min-h-[400px] max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-3 lg:gap-16 lg:px-4">
                <div className="col-span-1 space-y-6 md:col-span-2">
                    {/* Keywords */}
                    {article.keywords && (
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="h-6 w-1 rounded-full bg-gradient-to-b from-emerald-700 to-teal-600" />
                                <h2 className="text-base font-bold text-gray-900">
                                    Kalit so'zlar
                                </h2>
                            </div>
                            <div
                                className="prose prose-sm prose-gray prose-p:text-gray-700 prose-strong:text-gray-900
                                    max-w-none text-gray-700"
                                dangerouslySetInnerHTML={{
                                    __html: article.keywords,
                                }}
                            />
                        </div>
                    )}

                    {/* Annotations */}
                    {article.annotations && (
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="h-6 w-1 rounded-full bg-gradient-to-b from-emerald-700 to-teal-600" />
                                <h2 className="text-base font-bold text-gray-900">
                                    Annotatsiya
                                </h2>
                            </div>
                            <div
                                className="prose prose-gray prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-700
                                    prose-strong:text-gray-900 max-w-none
                                    leading-relaxed text-gray-700"
                                dangerouslySetInnerHTML={{
                                    __html: article.annotations,
                                }}
                            />
                        </div>
                    )}

                    {/* PDF viewer */}
                    {article.file_url && (
                        <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-3">
                                <div className="flex items-center gap-2">
                                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                    <span className="text-sm font-medium text-gray-600">
                                        Maqola — PDF
                                    </span>
                                </div>
                                <a
                                    href={`/storage/${article.file_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 transition-colors hover:text-emerald-900"
                                >
                                    <FaDownload className="h-3 w-3" />
                                    Yuklab olish
                                </a>
                            </div>
                            <iframe
                                src={`/storage/${article.file_url}`}
                                className="h-[650px] w-full"
                                title={`${article.name} — PDF fayl`}
                                loading="lazy"
                            />
                        </div>
                    )}

                    {/* ── Related articles ────────────────────────── */}
                    {related_articles.length > 0 && (
                        <div className="pt-4">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="h-7 w-1 rounded-full bg-gradient-to-b from-emerald-700 to-teal-600" />
                                <h2 className="text-xl font-bold text-gray-900">
                                    O'xshash maqolalar
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {related_articles.map((rel) => (
                                    <Link
                                        key={rel.id}
                                        href={`/article/${rel.slug}`}
                                        className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                                    >
                                        {/* Journal badge */}
                                        {rel.journal && (
                                            <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-200/60">
                                                <FiBookOpen className="h-2.5 w-2.5 shrink-0" />
                                                <span className="line-clamp-1 max-w-[180px]">
                                                    {rel.journal.name}
                                                </span>
                                            </span>
                                        )}

                                        {/* Title */}
                                        <h3 className="line-clamp-3 flex-1 text-sm font-semibold leading-snug text-gray-800 transition-colors group-hover:text-emerald-800">
                                            {rel.name}
                                        </h3>

                                        {/* Footer meta */}
                                        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <FaUserTie className="h-2.5 w-2.5 shrink-0 text-gray-400" />
                                                    <span className="max-w-[120px] truncate">
                                                        {rel.author}
                                                    </span>
                                                </span>
                                                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                                                    <FaCalendarDays className="h-2.5 w-2.5 shrink-0" />
                                                    {format(
                                                        rel.date,
                                                        "dd.MM.yyyy",
                                                    )}
                                                </span>
                                            </div>
                                            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 transition-all group-hover:gap-2">
                                                Ko'rish
                                                <FaArrowRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <Right articles={articles} />
            </div>
        </MainLayout>
    );
}

export default ArticleView;
