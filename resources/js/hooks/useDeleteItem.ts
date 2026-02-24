// src/hooks/useDeleteItem.ts
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

/**
 * @param routeName: o'chirishga mo'ljallangan route nomi (masalan: "menus.destroy", "users.destroy")
 * @param itemKey: obyektning ID saqlanadigan xususiyati (masalan: "id")
 */
export function useDeleteItem<T>(routeName: string, itemKey: keyof T) {
    const { delete: destroy } = useForm();

    const deleteItem = (item: T, onSuccess?: () => void) => {
        const id = item[itemKey];
        destroy(route(routeName, { id }), {
            onSuccess: () => {
                toast.success("Muvaffaqiyatli o'chirildi!", {
                    description: `${String(itemKey)}: ${id} o'chirildi.`,
                });
                if (onSuccess) onSuccess();
            },
            onError: (errors: any) => {
                toast.error("O'chirishda xatolik yuz berdi!", {
                    description: errors.message || "Qaytadan urinib ko'ring.",
                });
            },
        });
    };

    return { deleteItem };
}
