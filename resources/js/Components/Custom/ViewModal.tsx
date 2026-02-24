import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Menu } from "@/types/menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import TimeAgo from "./TimeAgo";

interface ViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: Menu;
}

function ViewModal({ isOpen, onClose, item }: ViewModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent aria-describedby="delete-modal">
                <DialogHeader>
                    <DialogTitle>{item.name} - menyu ma'lumotlari</DialogTitle>
                </DialogHeader>
                <DialogDescription></DialogDescription>
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
                            <TableCell>{item.id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Title:</TableCell>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Slug:</TableCell>
                            <TableCell>{item.slug}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Created:</TableCell>
                            <TableCell>
                                <TimeAgo createdAt={item.created_at} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Updated:</TableCell>
                            <TableCell>
                                <TimeAgo updatedAt={item.updated_at} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Yopish
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ViewModal;
