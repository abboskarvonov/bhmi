import { Paginated } from "./pagination";
export interface About {
    id: number;
    name: string;
    type: string;
    content: string;
    file_url?: string | File | undefined;
    created_at?: string;
    updated_at?: string;
    _method?: string;
}

export interface AboutIndexProps {
    abouts: Paginated<About>;
}

export interface AboutCreateData {
    name: string;
    type: string;
    content: string;
    file_url?: string | File;
}

export interface TableComponentProps {
    data: About[];
    onDelete: (about: About) => void;
    sortField: keyof About | null;
    sortDirection: "asc" | "desc";
    onSortChange: (field: keyof About) => void;
}
