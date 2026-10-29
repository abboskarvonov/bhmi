import { Paginated, TableFilters } from "./pagination";
import { Journal } from "./journal";

export interface Article {
    id: number;
    name: string;
    author: string;
    pages: string;
    date: Date;
    journal_issue_id: number;
    keywords: string;
    annotations: string;
    slug?: string;
    file_url?: string | null;
    journal?: Journal | null;
    created_at: string;
    updated_at: string;
    _method?: string;
}

export interface ArticleIndexProps {
    articles: Paginated<Article>;
    filters: TableFilters;
}

export interface ArticleCreateData {
    name: string;
    author: string;
    pages: string;
    date: Date | null;
    journal_issue_id: string;
    keywords: string;
    annotations: string;
    file_url?: string | File;
}

export interface ArticleEditData {
    id: number;
    name: string;
    author: string;
    pages: string;
    date: Date | null;
    journal_issue_id: string;
    keywords: string;
    annotations: string;
    file_url?: string | File | null;
    journal?: Journal | null;
    _method: string;
}

export interface TableComponentProps {
    data: Article[];
    offset: number;
    onDelete: (articles: Article) => void;
    sortField: keyof Article | null;
    sortDirection: "asc" | "desc";
    onSortChange: (field: keyof Article) => void;
}
