export interface User {
    id: number;
    name: string;
    email: string;
    isAdmin: number;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        isSuperAdmin: boolean;
    };
};

export interface LayoutProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    ogImage?: string;
}
