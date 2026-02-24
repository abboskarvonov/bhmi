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
import { Article } from "@/types/article";
import { Journal } from "@/types/journal";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { FaAngleLeft, FaAngleRight, FaCalendarDays } from "react-icons/fa6";

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
        <MainLayout title="Jurnal sonlari">
            <Breadcrumb title="Jurnal sonlari" />
            <div className="container mx-auto grid min-h-[550px] max-w-7xl grid-cols-1 gap-10 px-8 py-16 md:grid-cols-3 lg:gap-16 lg:px-1">
                <div className="col-span-1 md:col-span-2">
                    <h1 className="inline-block border-b border-b-gray-600 pb-2 text-xl font-semibold">
                        Jurnal sonlari
                    </h1>
                    <div className="space-y-6 py-6">
                        {data.map((archive) => (
                            <Card key={archive.id}>
                                <CardHeader>
                                    <CardTitle>{archive.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-8">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarDays />
                                            <span className="text-sm">
                                                {format(
                                                    archive.date,
                                                    "MM-dd-yyyy",
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link href={`/archive/${archive.slug}`}>
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
                                        ? `/archive?page=${current_page - 1}`
                                        : "#"
                                }
                            >
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className={`${
                                        current_page === 1
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    } `}
                                >
                                    <FaAngleLeft />
                                </Button>
                            </Link>

                            <div className="flex items-center space-x-2">
                                {[...Array(last_page)].map((_, index) => {
                                    const page = index + 1;
                                    return (
                                        <Link
                                            key={page}
                                            href={`/archive?page=${page}`}
                                        >
                                            <Button
                                                variant={
                                                    page === current_page
                                                        ? "default"
                                                        : "outline"
                                                }
                                                size={"icon"}
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
                                        ? `/archive?page=${current_page + 1}`
                                        : "#"
                                }
                            >
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className={`${
                                        current_page === last_page
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    } `}
                                >
                                    <FaAngleRight />
                                </Button>
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
