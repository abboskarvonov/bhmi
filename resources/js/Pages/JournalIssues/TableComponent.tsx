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
import { TableComponentProps } from "@/types/journal";
import { Link } from "@inertiajs/react";
import React from "react";
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
    offset,
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
                            Nomi{" "}
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
                    <TableHead>
                        <button
                            onClick={() => onSortChange("created_at")}
                            className="flex items-center gap-1"
                        >
                            Qo'shilgan{" "}
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
                    <TableHead className="text-right">Amallar</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell>{offset + index}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                                <TimeAgo createdAt={item.created_at} />
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-right">
                                <div className="inline-flex items-center gap-1">
                                    <Button
                                        asChild
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-gray-500 hover:text-gray-900"
                                        title="Ko'rish"
                                    >
                                        <Link
                                            href={route("journal-issues.show", {
                                                id: item.id,
                                            })}
                                        >
                                            <FaEye />
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                                        title="Tahrirlash"
                                    >
                                        <Link
                                            href={route("journal-issues.edit", {
                                                id: item.id,
                                            })}
                                        >
                                            <FaPen />
                                        </Link>
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                                        title="O'chirish"
                                        onClick={() => onDelete(item)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4}>
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
