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

interface ArticlePagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: Article[];
}

export interface ArticleIndexProps {
    articles: ArticlePagination;
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
    onDelete: (articles: Article) => void;
    sortField: keyof Article | null;
    sortDirection: "asc" | "desc";
    onSortChange: (field: keyof Article) => void;
}
