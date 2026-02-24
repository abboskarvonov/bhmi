import { filterData, sortData } from "@/lib/tableHelpers";
import { useState } from "react";

export type SortDirection = "asc" | "desc";

export function useTable<T>(data: T[], searchableFields: (keyof T)[]) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

    const handleSort = (field: keyof T) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const filteredData = filterData(data, searchTerm, searchableFields);
    const sortedData = sortData(filteredData, sortField, sortDirection);

    return {
        sortedData,
        searchTerm,
        setSearchTerm,
        sortField,
        sortDirection,
        handleSort,
    };
}
