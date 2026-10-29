import Pagination from "@/Components/Custom/Pagination";
import Breadcrumb from "@/Components/Custom/Breadcrumb";
import Right from "@/Components/Home/Right";
import MainLayout from "@/Layouts/MainLayout";
import { Article as ArticleItem } from "@/types/article";
import { Paginated } from "@/types/pagination";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import {
    FaArrowRight,
    FaCalendarDays,
    FaFileLines,
    FaUserTie,
} from "react-icons/fa6";

function Article({ articles }: { articles: Paginated<ArticleItem> }) {
    const { data, from } = articles;

    return (
        <MainLayout
            title="Maqolalar"
            description="BHMI jurnalida chop etilgan barcha ilmiy maqolalar. Buxgalteriya hisobi va moliyaviy iqtisod sohasidagi tadqiqotlar."
        >
            <Breadcrumb title="Maqolalar" />

            <div className="bg-gray-100">
                <div className="container mx-auto grid min-h-[550px] max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-3 lg:gap-16 lg:px-4">
                    <div className="col-span-1 md:col-span-2">
                        <div className="mb-8 flex items-center gap-3">
                            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-700 to-teal-600" />
                            <h2 className="text-2xl font-bold text-gray-900">
                                Barcha maqolalar
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {data.map((article, index) => {
                                return (
                                    <Link
                                        key={article.id}
                                        href={`/article/${article.slug}`}
                                        className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
                                    >
                                        {/* Top accent bar */}
                                        <div className="h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-emerald-600 to-teal-500 transition-transform duration-300 group-hover:scale-x-100" />

                                        <div className="flex items-center gap-4 p-5">
                                            {/* Number badge */}
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200/70 transition-all group-hover:bg-emerald-700 group-hover:text-white group-hover:ring-emerald-700">
                                                {(from ?? 1) + index}
                                            </span>

                                            <div className="min-w-0 flex-1">
                                                {/* Title */}
                                                <h3 className="font-bold leading-snug text-gray-900 transition-colors group-hover:text-emerald-800">
                                                    {article.name}
                                                </h3>

                                                {/* Meta row */}
                                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1.5">
                                                        <FaUserTie className="h-3 w-3 shrink-0 text-emerald-500" />
                                                        {article.author}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <FaCalendarDays className="h-3 w-3 shrink-0 text-emerald-500" />
                                                        {format(
                                                            article.date,
                                                            "dd.MM.yyyy",
                                                        )}
                                                    </span>
                                                    {article.pages && (
                                                        <span className="flex items-center gap-1.5">
                                                            <FaFileLines className="h-3 w-3 shrink-0 text-emerald-500" />
                                                            {article.pages}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            <FaArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600" />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        <Pagination
                            meta={articles}
                            label="maqola"
                            variant="public"
                        />
                    </div>

                    <Right articles={data.slice(0, 5)} />
                </div>
            </div>
        </MainLayout>
    );
}

export default Article;
