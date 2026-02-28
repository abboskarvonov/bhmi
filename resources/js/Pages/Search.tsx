import Breadcrumb from "@/Components/Custom/Breadcrumb";
import Right from "@/Components/Home/Right";
import MainLayout from "@/Layouts/MainLayout";
import { Article } from "@/types/article";
import { Journal } from "@/types/journal";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import {
    FaArrowRight,
    FaCalendarDays,
    FaUserTie,
} from "react-icons/fa6";
import { FiBookOpen, FiFileText, FiSearch } from "react-icons/fi";

interface SearchProps {
    query: string;
    articles: Article[];
    journals: Journal[];
    latest_articles: Article[];
}

function Search({ query, articles, journals, latest_articles }: SearchProps) {
    const hasResults = articles.length > 0 || journals.length > 0;

    return (
        <MainLayout
            title="Qidiruv"
            description="BHMI jurnalida qidiruv natijalari"
        >
            <Breadcrumb title="Qidiruv" />

            <div className="container mx-auto grid min-h-[550px] max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-3 lg:gap-16 lg:px-4">
                <div className="col-span-1 space-y-8 md:col-span-2">

                    {/* Query heading */}
                    {query ? (
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-700 to-teal-600" />
                            <h2 className="text-xl font-bold text-gray-900">
                                <span className="text-emerald-700">
                                    &ldquo;{query}&rdquo;
                                </span>{" "}
                                bo&apos;yicha natijalar
                            </h2>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-700 to-teal-600" />
                            <h2 className="text-xl font-bold text-gray-900">
                                Qidiruv
                            </h2>
                        </div>
                    )}

                    {/* Empty states */}
                    {!query && (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
                            <FiSearch className="mb-4 h-10 w-10 text-gray-300" />
                            <p className="text-base font-medium text-gray-500">
                                Qidirish uchun yuqoridagi maydonga so&apos;z kiriting
                            </p>
                        </div>
                    )}

                    {query && !hasResults && (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
                            <FiSearch className="mb-4 h-10 w-10 text-gray-300" />
                            <p className="text-base font-medium text-gray-500">
                                Natija topilmadi
                            </p>
                            <p className="mt-1.5 text-sm text-gray-400">
                                Boshqa kalit so&apos;zlar bilan qayta urinib ko&apos;ring
                            </p>
                        </div>
                    )}

                    {/* Articles results */}
                    {articles.length > 0 && (
                        <div>
                            <div className="mb-5 flex items-center gap-3">
                                <FiFileText className="h-5 w-5 text-emerald-600" />
                                <h3 className="text-lg font-bold text-gray-900">
                                    Maqolalar
                                </h3>
                                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-sm font-semibold text-emerald-800">
                                    {articles.length}
                                </span>
                            </div>

                            <div className="space-y-3">
                                {articles.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={`/article/${article.slug}`}
                                        className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                                    >
                                        {/* Left accent bar */}
                                        <div className="absolute inset-y-0 left-0 w-0.5 scale-y-0 rounded-full bg-gradient-to-b from-emerald-600 to-teal-500 transition-transform duration-300 group-hover:scale-y-100" />

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-200/70 transition-all group-hover:bg-emerald-700 group-hover:ring-emerald-700">
                                            <FiFileText className="h-4 w-4 text-emerald-600 group-hover:text-white" />
                                        </div>

                                        <div className="flex-1 space-y-1.5">
                                            <h4 className="font-semibold leading-snug text-gray-900 transition-colors group-hover:text-emerald-800">
                                                {article.name}
                                            </h4>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                                                <span className="flex items-center gap-1.5">
                                                    <FaUserTie className="h-3 w-3 shrink-0 text-emerald-500" />
                                                    {article.author}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <FaCalendarDays className="h-3 w-3 shrink-0 text-emerald-500" />
                                                    {format(article.date, "dd.MM.yyyy")}
                                                </span>
                                            </div>
                                        </div>

                                        <FaArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Journals results */}
                    {journals.length > 0 && (
                        <div>
                            <div className="mb-5 flex items-center gap-3">
                                <FiBookOpen className="h-5 w-5 text-emerald-600" />
                                <h3 className="text-lg font-bold text-gray-900">
                                    Jurnal sonlari
                                </h3>
                                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-sm font-semibold text-emerald-800">
                                    {journals.length}
                                </span>
                            </div>

                            <div className="space-y-3">
                                {journals.map((journal) => (
                                    <Link
                                        key={journal.id}
                                        href={`/archive/${journal.slug}`}
                                        className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                                    >
                                        {/* Left accent bar */}
                                        <div className="absolute inset-y-0 left-0 w-0.5 scale-y-0 rounded-full bg-gradient-to-b from-emerald-600 to-teal-500 transition-transform duration-300 group-hover:scale-y-100" />

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-200/70 transition-all group-hover:bg-emerald-700 group-hover:ring-emerald-700">
                                            <FiBookOpen className="h-4 w-4 text-emerald-600 group-hover:text-white" />
                                        </div>

                                        <div className="flex-1 space-y-1.5">
                                            <h4 className="font-semibold leading-snug text-gray-900 transition-colors group-hover:text-emerald-800">
                                                {journal.name}
                                            </h4>
                                            <span className="flex items-center gap-1.5 text-sm text-gray-500">
                                                <FaCalendarDays className="h-3 w-3 shrink-0 text-emerald-500" />
                                                {format(journal.date, "dd.MM.yyyy")}
                                            </span>
                                        </div>

                                        <FaArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <Right articles={latest_articles} />
            </div>
        </MainLayout>
    );
}

export default Search;
