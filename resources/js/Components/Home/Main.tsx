import Right from "./Right";
import { FaCalendarDays } from "react-icons/fa6";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { GiBookCover } from "react-icons/gi";
import { About } from "@/types/about";
import { Journal } from "@/types/journal";
import { format } from "date-fns";
import { Article } from "@/types/article";
import { Link } from "@inertiajs/react";

interface Props {
    about: About;
    journals: Journal[];
    articles: Article[];
}

function Main({ about, journals, articles }: Props) {
    return (
        <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-10 px-8 py-16 md:grid-cols-3 lg:gap-16 lg:px-1">
            <div className="col-span-1 md:col-span-2">
                <div>
                    <h2 className="mb-6 border-b-2 border-gray-600 pb-2 text-2xl font-semibold">
                        Journal haqida
                    </h2>
                    <div
                        className="space-y-3"
                        dangerouslySetInnerHTML={{ __html: about.content }}
                    />
                </div>

                <div className="lg:mt-22 mt-8 md:mt-16">
                    <h2 className="mb-10 border-b-2 border-gray-600 pb-2 text-2xl font-semibold">
                        Jurnal sonlari
                    </h2>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                        {journals.map((journal) => (
                            <Card className="relative" key={journal.id}>
                                <CardHeader>
                                    <CardTitle>
                                        <Link href={`/archive/${journal.slug}`}>
                                            {journal.name}
                                        </Link>
                                    </CardTitle>
                                </CardHeader>
                                <CardFooter>
                                    <div className="flex items-center gap-2">
                                        <FaCalendarDays />
                                        {format(journal.date, "MM-dd-yyyy")}
                                    </div>
                                </CardFooter>
                                <div className="absolute right-5 top-[45%]">
                                    <GiBookCover size={"50"} />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
            <Right articles={articles} />
        </div>
    );
}

export default Main;
