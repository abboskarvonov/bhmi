import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { FaPen } from "react-icons/fa6";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import TimeAgo from "@/Components/Custom/TimeAgo";
import { format } from "date-fns";
import { Article } from "@/types/article";

function View({ article }: { article: Article }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Maqola ko'rinishi - {article.name}
                </h2>
            }
        >
            <Head title={`Maqola - ${article.name}`} />
            <div>
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-6">
                        <div className="mb-6">
                            <Link
                                href={route("articles.edit", {
                                    id: article.id,
                                })}
                            >
                                <Button variant={"default"} size={"icon"}>
                                    <FaPen />
                                </Button>
                            </Link>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Sarlovha</TableHead>
                                    <TableHead>Ma'lumotlar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>ID:</TableCell>
                                    <TableCell>{article.id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Maqola nomi:</TableCell>
                                    <TableCell>{article.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Mualliflar:</TableCell>
                                    <TableCell>{article.author}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Sahifalari:</TableCell>
                                    <TableCell>{article.pages}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Sanasi:</TableCell>
                                    <TableCell>
                                        {format(article.date, "MM-dd-yyyy")}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Jurnal:</TableCell>
                                    <TableCell>
                                        {article.journal?.name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Kalit so'zlar:</TableCell>
                                    <TableCell>{article.keywords}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Annotatsiya:</TableCell>
                                    <TableCell>{article.annotations}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Slug:</TableCell>
                                    <TableCell>{article.slug}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Fayl:</TableCell>
                                    <TableCell>
                                        {article.file_url ? (
                                            <span>Fayl mavjud</span>
                                        ) : (
                                            <span>Fayl mavjud emas</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Created:</TableCell>
                                    <TableCell>
                                        <TimeAgo
                                            createdAt={article.created_at}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Updated:</TableCell>
                                    <TableCell>
                                        <TimeAgo
                                            updatedAt={article.updated_at}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default View;
