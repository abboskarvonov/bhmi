import { TableFilters } from "@/types/pagination";
import { router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

/**
 * Qidiruv va saralashni serverda bajaradi — natija barcha sahifalar bo'yicha.
 * Filtr o'zgarganda 1-sahifaga qaytadi, URL'da saqlanadi.
 */
export function useServerTable<T>(routeName: string, filters: TableFilters) {
    const [searchTerm, setSearchTerm] = useState(filters.search ?? "");
    const isFirstRender = useRef(true);

    const visit = (params: Partial<TableFilters>) => {
        const query = { ...filters, ...params };

        router.get(
            route(routeName),
            {
                search: query.search || undefined,
                sort: query.sort || undefined,
                direction: query.sort ? query.direction : undefined,
            },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (searchTerm === (filters.search ?? "")) return;

        const timer = setTimeout(() => visit({ search: searchTerm }), 400);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleSort = (field: keyof T) => {
        const direction =
            filters.sort === field && filters.direction === "asc"
                ? "desc"
                : "asc";
        visit({ sort: String(field), direction, search: searchTerm });
    };

    return {
        searchTerm,
        setSearchTerm,
        sortField: (filters.sort as keyof T | null) ?? null,
        sortDirection: filters.direction,
        handleSort,
    };
}
