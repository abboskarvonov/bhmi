import React from "react";
import { FaCalendarDays, FaUserTie } from "react-icons/fa6";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Link } from "@inertiajs/react";
import { Article } from "@/types/article";
import { format } from "date-fns";

interface Props {
    articles: Article[];
}

function Right({ articles }: Props) {
    return (
        <div className="col-span-1">
            <h2 className="mb-6 border-b-2 border-gray-600 pb-2 text-2xl font-semibold">
                So'nggi maqolalar
            </h2>
            <div className="space-y-5">
                {articles.map((article) => (
                    <Card key={article.id}>
                        <CardHeader>
                            <CardTitle>
                                <Link href={`/article/${article.slug}`}>
                                    {article.name}
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardFooter>
                            <div className="flex gap-5">
                                <div className="flex items-center gap-2">
                                    <FaUserTie />
                                    {article.author}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCalendarDays />
                                    {format(article.date, "MM-dd-yyyy")}
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Right;
