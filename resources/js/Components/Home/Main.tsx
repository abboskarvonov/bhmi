import { About } from "@/types/about";
import { Article } from "@/types/article";
import { Journal } from "@/types/journal";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { FaArrowRight, FaCalendarDays, FaUserTie } from "react-icons/fa6";
import { FiBookOpen, FiFileText } from "react-icons/fi";
import Right from "./Right";

interface Props {
    about: About;
    journals: Journal[];
    articles: Article[];
}

function SectionHeading({
    title,
    href,
    linkLabel = "Barchasi",
}: {
    title: string;
    href: string;
    linkLabel?: string;
}) {
    return (
        <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-700 to-teal-600" />
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            </div>
            <Link
                href={href}
                className="flex items-center gap-1.5 text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-900"
            >
                {linkLabel}
                <FaArrowRight className="h-3 w-3" />
            </Link>
        </div>
    );
}

function JournalCard({ journal }: { journal: Journal }) {
    return (
        <Link
            href={`/archive/${journal.slug}`}
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
                    {/* Journal name in header */}
                    <h3 className="line-clamp-3 flex-1 text-sm font-semibold leading-snug text-white/90">
                        {journal.name}
                    </h3>

                    {/* Icon box */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/20">
                        <FiBookOpen className="h-5 w-5 text-white" />
                    </div>
                </div>

                {/* Year watermark */}
                <p className="relative mt-4 text-right text-xs font-bold tracking-widest text-white/20">
                    {format(journal.date, "yyyy")}
                </p>
            </div>

            {/* Card footer */}
            <div className="flex items-center justify-between px-5 py-3">
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <FaCalendarDays className="h-3 w-3" />
                    {format(journal.date, "dd.MM.yyyy")}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 transition-all group-hover:gap-2">
                    Ko'rish
                    <FaArrowRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
                </span>
            </div>
        </Link>
    );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
    return (
        <Link
            href={`/article/${article.slug}`}
            className="group flex gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
        >
            {/* Number badge */}
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200/80 transition-all duration-200 group-hover:bg-emerald-700 group-hover:text-white group-hover:ring-emerald-700">
                {String(index + 1).padStart(2, "0")}
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-800 transition-colors group-hover:text-emerald-800">
                    {article.name}
                </h3>

                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                        <FaUserTie className="h-2.5 w-2.5 shrink-0" />
                        <span className="max-w-[120px] truncate">
                            {article.author}
                        </span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                        <FaCalendarDays className="h-2.5 w-2.5 shrink-0" />
                        {format(article.date, "dd.MM.yyyy")}
                    </span>
                </div>
            </div>
        </Link>
    );
}

function Main({ about, journals, articles }: Props) {
    return (
        <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-3 lg:gap-16 lg:px-4">
            <div className="col-span-1 space-y-16 md:col-span-2">
                {/* Jurnal haqida */}
                <div>
                    <div className="mb-8 flex items-center gap-3">
                        <div className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-700 to-teal-600" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            Jurnal haqida
                        </h2>
                    </div>
                    <div
                        className="prose prose-gray prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-700
                            prose-strong:text-gray-900 prose-a:text-emerald-700
                            prose-a:no-underline hover:prose-a:underline
                            max-w-none leading-relaxed text-gray-700"
                        dangerouslySetInnerHTML={{ __html: about.content }}
                    />
                </div>

                {/* Jurnal sonlari */}
                <div>
                    <SectionHeading title="Jurnal sonlari" href="/archive" />
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {journals.map((journal) => (
                            <JournalCard
                                key={journal.id}
                                journal={journal}
                            />
                        ))}
                    </div>
                </div>

                {/* So'nggi maqolalar */}
                <div>
                    <SectionHeading title="So'nggi maqolalar" href="/article" />
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {articles.map((article, index) => (
                            <ArticleCard
                                key={article.id}
                                article={article}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* See all articles CTA */}
                    <Link
                        href="/article"
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 py-3 text-sm font-semibold text-emerald-800 transition-all hover:bg-emerald-100 hover:text-emerald-900"
                    >
                        <FiFileText className="h-4 w-4" />
                        Barcha maqolalarni ko'rish
                        <FaArrowRight className="h-3 w-3" />
                    </Link>
                </div>
            </div>

            <Right articles={articles.slice(0, 5)} />
        </div>
    );
}

export default Main;
