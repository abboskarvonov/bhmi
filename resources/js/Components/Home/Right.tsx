import { Article } from "@/types/article";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { FaCalendarDays, FaUserTie } from "react-icons/fa6";

interface Props {
    articles: Article[];
}

function Right({ articles }: Props) {
    return (
        <div className="col-span-1">
            {/* Sticky sidebar */}
            <div className="sticky top-24">
                <div className="mb-6 flex items-center gap-3">
                    <div className="h-7 w-1 rounded-full bg-gradient-to-b from-emerald-700 to-teal-600" />
                    <h2 className="text-xl font-bold text-gray-900">
                        So'nggi maqolalar
                    </h2>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {articles.map((article, index) => (
                        <Link
                            key={article.id}
                            href={`/article/${article.slug}`}
                            className="group flex gap-4 p-4 transition-colors hover:bg-emerald-50"
                            style={{
                                borderTop: index !== 0 ? "1px solid #e5e7eb" : undefined,
                            }}
                        >
                            {/* Number badge */}
                            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-200 text-xs font-bold text-emerald-800 transition-all group-hover:bg-emerald-700 group-hover:text-white">
                                {index + 1}
                            </span>

                            <div className="min-w-0 flex-1 space-y-2">
                                <p className="line-clamp-2 text-sm font-medium leading-snug text-gray-800 transition-colors group-hover:text-emerald-800">
                                    {article.name}
                                </p>
                                <div className="flex flex-wrap gap-x-3 gap-y-1">
                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                        <FaUserTie className="h-3 w-3" />
                                        {article.author}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                        <FaCalendarDays className="h-3 w-3" />
                                        {format(article.date, "dd.MM.yyyy")}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* See all link */}
                <Link
                    href="/article"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-100 py-2.5 text-sm font-medium text-emerald-800 transition-all hover:bg-emerald-200 hover:text-emerald-900"
                >
                    Barcha maqolalar
                </Link>
            </div>
        </div>
    );
}

export default Right;
