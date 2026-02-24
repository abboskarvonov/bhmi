export type SortDirection = "asc" | "desc";

export function filterData<T>(
    data: T[],
    searchTerm: string,
    searchableFields: (keyof T)[],
): T[] {
    if (!searchTerm) return data;

    return data.filter((item) =>
        searchableFields.some((field) =>
            String(item[field] || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
        ),
    );
}

export function sortData<T>(
    data: T[],
    sortField: keyof T | null,
    sortDirection: SortDirection,
): T[] {
    if (!sortField) return data;

    return [...data].sort((a, b) => {
        const aValue = a[sortField] ?? "";
        const bValue = b[sortField] ?? "";

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });
}
