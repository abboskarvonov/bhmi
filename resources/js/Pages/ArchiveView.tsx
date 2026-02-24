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
import { FaCalendarDays, FaUserTie } from "react-icons/fa6";

interface Props {
    journal: Journal;
    articles: Article[];
}

function ArchiveView({ journal, articles }: Props) {
    return (
        <MainLayout title={journal.name}>
            <Breadcrumb title={journal.name} />
            <div className="container mx-auto grid min-h-[550px] max-w-7xl grid-cols-1 gap-10 px-8 py-16 md:grid-cols-3 lg:gap-16 lg:px-1">
                <div className="col-span-1 space-y-5 md:col-span-2">
                    <h1 className="inline-block border-b border-b-gray-600 pb-2 text-xl font-semibold">
                        {journal.name}
                    </h1>
                    <div>
                        <a
                            href={`/storage/${journal.file_url}`}
                            target="_blank"
                        >
                            <Button>Jurnalni yuklash</Button>
                        </a>
                    </div>
                    <div className="border-t border-t-gray-700">
                        <h1 className="py-4 text-xl font-semibold">
                            Jurnaldagi maqolalar
                        </h1>
                        <div>
                            {journal.articles.map((article) => (
                                <Card key={article.id}>
                                    <CardHeader>
                                        <CardTitle>{article.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-8">
                                            <div className="flex items-center gap-2">
                                                <FaCalendarDays />
                                                <span className="text-sm">
                                                    {format(
                                                        article.date,
                                                        "MM-dd-yyyy",
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaUserTie />
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
                    </div>
                </div>
                <Right articles={articles} />
            </div>
        </MainLayout>
    );
}

export default ArchiveView;
