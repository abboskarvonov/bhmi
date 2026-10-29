import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { ReactNode } from "react";
import { FiDownload, FiEdit2, FiExternalLink, FiFile } from "react-icons/fi";

/* ---------- Ma'lumotlar ro'yxati ---------- */

export function DetailList({ children }: { children: ReactNode }) {
    return <dl className="divide-y divide-gray-100">{children}</dl>;
}

export function DetailItem({
    label,
    children,
    className,
}: {
    label: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:gap-4">
            <dt className="shrink-0 text-sm text-gray-500 sm:w-32">{label}</dt>
            <dd
                className={cn(
                    "min-w-0 flex-1 break-words text-sm font-medium text-gray-900",
                    className,
                )}
            >
                {children ?? <span className="text-gray-400">—</span>}
            </dd>
        </div>
    );
}

/* ---------- Fayl kartasi ---------- */

export function FileCard({
    href,
    name,
    meta = "Yuklangan fayl",
}: {
    href: string | null;
    name?: string | null;
    meta?: string;
}) {
    if (!href) {
        return (
            <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-gray-200 px-4 py-6 text-center">
                <FiFile className="h-6 w-6 text-gray-300" />
                <p className="text-sm text-gray-500">Fayl yuklanmagan</p>
            </div>
        );
    }

    const fileName = name ?? href.split("/").pop() ?? "Fayl";

    return (
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/60 p-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <FiFile className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                    {fileName}
                </p>
                <p className="text-xs text-gray-500">{meta}</p>
            </div>
            <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500"
                title="Ochish"
            >
                <a href={href} target="_blank" rel="noopener noreferrer">
                    <FiDownload className="h-4 w-4" />
                </a>
            </Button>
        </div>
    );
}

/* ---------- Sarlavha tugmalari ---------- */

export function EditButton({ href }: { href: string }) {
    return (
        <Button asChild className="rounded-xl">
            <Link href={href}>
                <FiEdit2 className="h-4 w-4" />
                Tahrirlash
            </Link>
        </Button>
    );
}

export function SiteLinkButton({ href }: { href: string }) {
    return (
        <Button asChild variant="outline" className="rounded-xl">
            <a href={href} target="_blank" rel="noopener">
                <FiExternalLink className="h-4 w-4" />
                Saytda ko'rish
            </a>
        </Button>
    );
}
