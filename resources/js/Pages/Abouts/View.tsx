import { About } from "@/types/about";
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

function View({ about }: { about: About }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Multi menyu ko'rinishi - {about.name}
                </h2>
            }
        >
            <Head title={`Multi menyu - ${about.name}`} />
            <div>
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-6">
                        <div className="mb-6">
                            <Link
                                href={route("abouts.edit", {
                                    id: about.id,
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
                                    <TableCell>{about.id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Name:</TableCell>
                                    <TableCell>{about.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Content:</TableCell>
                                    <TableCell>{about.content}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Type:</TableCell>
                                    <TableCell>{about.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Fayl:</TableCell>
                                    <TableCell>
                                        {about.file_url ? (
                                            <span>Fayl mavjud</span>
                                        ) : (
                                            <span>Fayl mavjud emas</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Created:</TableCell>
                                    <TableCell>
                                        <TimeAgo createdAt={about.created_at} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Updated:</TableCell>
                                    <TableCell>
                                        <TimeAgo updatedAt={about.updated_at} />
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
