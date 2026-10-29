import { Paginated } from "./pagination";

export interface UserItem {
    id: number;
    name: string;
    email: string;
    isAdmin: number;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface UserIndexProps {
    users: Paginated<UserItem>;
}

export interface UserTableComponentProps {
    data: UserItem[];
    currentUserId: number;
}
