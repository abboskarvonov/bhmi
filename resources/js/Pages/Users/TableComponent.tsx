import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { UserTableComponentProps } from "@/types/user";
import { router } from "@inertiajs/react";
import { FaShield, FaShieldHalved } from "react-icons/fa6";

function TableComponent({ data, currentUserId }: UserTableComponentProps) {
    const handleToggleAdmin = (userId: number) => {
        router.patch(route("users.toggleAdmin", { user: userId }));
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>№</TableHead>
                    <TableHead>Ism</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead className="text-right">Amal</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">
                                {item.name}
                                {item.id === currentUserId && (
                                    <span className="ml-2 text-xs text-gray-400">
                                        (siz)
                                    </span>
                                )}
                            </TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                                {item.isAdmin === 1 ? (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                        <FaShield className="h-3 w-3" />
                                        Admin
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                        Foydalanuvchi
                                    </span>
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                {item.id !== currentUserId && (
                                    <Button
                                        size="sm"
                                        variant={
                                            item.isAdmin === 1
                                                ? "destructive"
                                                : "default"
                                        }
                                        onClick={() =>
                                            handleToggleAdmin(item.id)
                                        }
                                        className="gap-1.5"
                                    >
                                        <FaShieldHalved className="h-3.5 w-3.5" />
                                        {item.isAdmin === 1
                                            ? "Adminlikni olish"
                                            : "Admin qilish"}
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5}>
                            <p className="pt-4 text-center text-xl font-semibold">
                                Foydalanuvchilar topilmadi!
                            </p>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default TableComponent;
