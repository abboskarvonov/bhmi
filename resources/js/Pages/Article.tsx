import Breadcrumb from "@/Components/Custom/Breadcrumb";
import Right from "@/Components/Home/Right";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import MainLayout from "@/Layouts/MainLayout";
import { ArticleIndexProps } from "@/types/article";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import {
    FaAngleLeft,
    FaAngleRight,
    FaCalendarDays,
    FaUserTie,
} from "react-icons/fa6";

function Article({ articles }: ArticleIndexProps) {
    const { data, current_page, last_page, total } = articles;

    return (
        <MainLayout
            title="Maqolalar"
            description="BHMI jurnalida chop etilgan barcha ilmiy maqolalar. Buxlateriya hisobi va moliyaviy iqtisod sohasidagi tadqiqotlar."
        >
            <Breadcrumb title="Maqolalar" />
            <div className="container mx-auto grid min-h-[550px] max-w-7xl grid-cols-1 gap-10 px-8 py-16 md:grid-cols-3 lg:gap-16 lg:px-1">
                <div className="col-span-1 md:col-span-2">
                    <h1 className="inline-block border-b border-b-gray-600 pb-2 text-xl font-semibold">
                        Maqolalar
                    </h1>
                    <div className="space-y-6 py-6">
                        {data.map((article) => (
                            <Card key={article.id}>
                                <CardHeader>
                                    <CardTitle>{article.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-8">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarDays aria-hidden="true" />
                                            <span className="text-sm">
                                                {format(
                                                    article.date,
                                                    "MM-dd-yyyy",
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaUserTie aria-hidden="true" />
                                            <span className="text-sm">
                                                {article.author}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link href={`/article/${article.slug}`}>
                                        <Button>Batafsil</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    {total > 10 && (
                        <div className="mt-10 flex items-center justify-center gap-2">
                            <Link
                                href={
                                    current_page !== 1
                                        ? `/article?page=${current_page - 1}`
                                        : "#"
                                }
                                aria-label="Oldingi sahifa"
                            >
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    disabled={current_page === 1}
                                    className={
                                        current_page === 1
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }
                                >
                                    <FaAngleLeft aria-hidden="true" />
                                </Button>
                            </Link>

                            <div className="flex items-center space-x-2">
                                {[...Array(last_page)].map((_, index) => {
                                    const page = index + 1;
                                    return (
                                        <Link
                                            key={page}
                                            href={`/article?page=${page}`}
                                            aria-label={`${page}-sahifa`}
                                        >
                                            <Button
                                                variant={
                                                    page === current_page
                                                        ? "default"
                                                        : "outline"
                                                }
                                                size={"icon"}
                                                aria-current={
                                                    page === current_page
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                {page}
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </div>

                            <Link
                                href={
                                    current_page !== last_page
                                        ? `/article?page=${current_page + 1}`
                                        : "#"
                                }
                                aria-label="Keyingi sahifa"
                            >
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    disabled={current_page === last_page}
                                    className={
                                        current_page === last_page
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }
                                >
                                    <FaAngleRight aria-hidden="true" />
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
                <Right articles={data.slice(0, 5)} />
            </div>
        </MainLayout>
    );
}

export default Article;
