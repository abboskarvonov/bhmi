import { Paginated, TableFilters } from "./pagination";
import { Article } from "./article";

export interface Journal {
    id: number;
    name: string;
    date: Date;
    slug?: string;
    file_url?: string | File | undefined;
    created_at?: string;
    updated_at?: string;
    _method?: string;
    articles: Article[];
}

export interface JournalIndexProps {
    journals: Paginated<Journal>;
    filters: TableFilters;
}

export interface JournalCreateData {
    name: string;
    date: Date | null;
    file_url?: string | File;
}

export interface JournalEditData {
    id: number;
    name: string;
    date: Date | undefined;
    slug?: string;
    file_url?: string | File | undefined;
    created_at?: string;
    updated_at?: string;
    _method?: string;
}

export interface TableComponentProps {
    data: Journal[];
    offset: number;
    onDelete: (journals: Journal) => void;
    sortField: keyof Journal | null;
    sortDirection: "asc" | "desc";
    onSortChange: (field: keyof Journal) => void;
}
