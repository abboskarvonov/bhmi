export interface UserItem {
    id: number;
    name: string;
    email: string;
    isAdmin: number;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface UserPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: UserItem[];
}

export interface UserIndexProps {
    users: UserPagination;
}

export interface UserTableComponentProps {
    data: UserItem[];
    currentUserId: number;
}
