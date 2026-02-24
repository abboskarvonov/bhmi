export interface Menu {
    id: number;
    name: string;
    slug?: string;
    created_at?: string;
    updated_at?: string;
    _method?: string;
}

interface MenuPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: Menu[];
}

export interface MenuIndexProps {
    menus: MenuPagination;
}

export interface MenuCreateData {
    name: string;
    slug: string;
}

export interface TableComponentProps {
    data: Menu[];
    onDelete: (menu: Menu) => void;
    onView: (menu: Menu) => void;
    sortField: keyof Menu | null;
    sortDirection: "asc" | "desc";
    onSortChange: (field: keyof Menu) => void;
}
