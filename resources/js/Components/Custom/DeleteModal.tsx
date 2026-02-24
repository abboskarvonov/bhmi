import React from "react";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    itemName = "element",
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent aria-describedby="delete-modal">
                <DialogHeader>
                    <DialogTitle>O'chirishni tasdiqlang</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    "{itemName}" nomli elementni o'chirmoqchimisiz? Ushbu amalni
                    ortga qaytarib bo'lmaydi.
                </DialogDescription>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Bekor qilish
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        Ha, o'chirish
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteModal;
