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
import { Journal } from "@/types/journal";
import { format } from "date-fns";

function View({ journal_issue }: { journal_issue: Journal }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Jurnal ko'rinishi - {journal_issue.name}
                </h2>
            }
        >
            <Head title={`Jurnal - ${journal_issue.name}`} />
            <div className="py-12">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="mb-6">
                            <Link
                                href={route("journal-issues.edit", {
                                    id: journal_issue.id,
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
                                    <TableCell>{journal_issue.id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Name:</TableCell>
                                    <TableCell>{journal_issue.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Date:</TableCell>
                                    <TableCell>
                                        {format(
                                            journal_issue.date,
                                            "MM-dd-yyyy",
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Slug:</TableCell>
                                    <TableCell>{journal_issue.slug}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Fayl:</TableCell>
                                    <TableCell>
                                        {journal_issue.file_url ? (
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
                                            createdAt={journal_issue.created_at}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Updated:</TableCell>
                                    <TableCell>
                                        <TimeAgo
                                            updatedAt={journal_issue.updated_at}
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
