import TimeAgo from "@/Components/Custom/TimeAgo";
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { TableComponentProps } from "@/types/article";
import { Link } from "@inertiajs/react";
import {
    FaEye,
    FaPen,
    FaSort,
    FaSortDown,
    FaSortUp,
    FaTrash,
} from "react-icons/fa6";

function TableComponent({
    data,
    onDelete,
    sortField,
    sortDirection,
    onSortChange,
}: TableComponentProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>№</TableHead>
                    <TableHead>
                        <button
                            onClick={() => onSortChange("name")}
                            className="flex items-center gap-1"
                        >
                            Title{" "}
                            {sortField === "name" ? (
                                sortDirection === "asc" ? (
                                    <FaSortUp />
                                ) : (
                                    <FaSortDown />
                                )
                            ) : (
                                <FaSort />
                            )}
                        </button>
                    </TableHead>
                    <TableHead>Jurnal</TableHead>
                    <TableHead>
                        <button
                            onClick={() => onSortChange("created_at")}
                            className="flex items-center gap-1"
                        >
                            Time{" "}
                            {sortField === "created_at" ? (
                                sortDirection === "asc" ? (
                                    <FaSortUp />
                                ) : (
                                    <FaSortDown />
                                )
                            ) : (
                                <FaSort />
                            )}
                        </button>
                    </TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.journal?.name}</TableCell>
                            <TableCell>
                                <TimeAgo createdAt={item.created_at} />
                            </TableCell>
                            <TableCell className="space-x-2 text-right">
                                <Link
                                    href={route("articles.show", {
                                        id: item.id,
                                    })}
                                >
                                    <Button size={"icon"} variant={"outline"}>
                                        <FaEye />
                                    </Button>
                                </Link>
                                <Link
                                    href={route("articles.edit", {
                                        id: item.id,
                                    })}
                                >
                                    <Button size={"icon"}>
                                        <FaPen />
                                    </Button>
                                </Link>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => onDelete(item)}
                                >
                                    <FaTrash />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5}>
                            <p className="pt-4 text-center text-xl font-semibold">
                                Ma'lumot topilmadi!
                            </p>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default TableComponent;
