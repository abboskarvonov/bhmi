import { Button } from "@/Components/ui/button";
import { Paginated } from "@/types/pagination";
import { Link } from "@inertiajs/react";
import clsx from "clsx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

type PageItem = number | "dots-left" | "dots-right";

const range = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i);

// 1 … 4 5 6 … 20 — sahifalar soni qancha bo'lsa ham 7 tadan oshmaydi
function getPageItems(current: number, last: number, siblings = 1): PageItem[] {
    if (last <= siblings * 2 + 5) return range(1, last);

    const left = Math.max(current - siblings, 2);
    const right = Math.min(current + siblings, last - 1);
    const edgeCount = 3 + siblings * 2;

    if (left <= 3) return [...range(1, edgeCount), "dots-right", last];
    if (right >= last - 2)
        return [1, "dots-left", ...range(last - edgeCount + 1, last)];

    return [1, "dots-left", ...range(left, right), "dots-right", last];
}

interface PaginationProps {
    meta: Paginated<unknown>;
    label?: string;
    // "public" — saytning yashil uslubi, "admin" — dashboard uslubi
    variant?: "admin" | "public";
}

const publicClasses = {
    base: "rounded-lg border-gray-200 text-gray-600 hover:border-emerald-300 hover:bg-white hover:text-emerald-700",
    active: "rounded-lg border-emerald-700 bg-emerald-700 text-white shadow-sm hover:bg-emerald-700",
};

function Pagination({
    meta,
    label = "ta",
    variant = "admin",
}: PaginationProps) {
    const isPublic = variant === "public";
    const { current_page, last_page, total, from, to, first_page_url } = meta;

    // Qidiruv/saralash parametrlarini saqlagan holda sahifa URL'i
    const pageUrl = (page: number) => {
        const url = new URL(first_page_url, window.location.origin);
        url.searchParams.set("page", String(page));
        return url.pathname + url.search;
    };

    const items = getPageItems(current_page, last_page);
    const hasPrev = current_page > 1;
    const hasNext = current_page < last_page;

    return (
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {total > 0 ? (
                    <>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">
                            {from}–{to}
                        </span>{" "}
                        / jami{" "}
                        <span className="font-semibold text-gray-700 dark:text-gray-200">
                            {total}
                        </span>{" "}
                        {label}
                    </>
                ) : (
                    "Ma'lumot yo'q"
                )}
            </p>

            {last_page > 1 && (
                <nav
                    aria-label="Sahifalash"
                    className="flex items-center gap-1"
                >
                    <PageButton
                        isPublic={isPublic}
                        href={hasPrev ? pageUrl(current_page - 1) : null}
                        ariaLabel="Oldingi sahifa"
                    >
                        <FaAngleLeft />
                    </PageButton>

                    {/* Telefonda faqat "3 / 20" */}
                    <span className="px-3 text-sm font-medium text-gray-700 dark:text-gray-200 sm:hidden">
                        {current_page} / {last_page}
                    </span>

                    <div className="hidden items-center gap-1 sm:flex">
                        {items.map((item) =>
                            typeof item === "number" ? (
                                <PageButton
                                    isPublic={isPublic}
                                    key={item}
                                    href={pageUrl(item)}
                                    active={item === current_page}
                                    ariaLabel={`${item}-sahifa`}
                                >
                                    {item}
                                </PageButton>
                            ) : (
                                <span
                                    key={item}
                                    className="w-9 select-none text-center text-gray-400"
                                >
                                    …
                                </span>
                            ),
                        )}
                    </div>

                    <PageButton
                        isPublic={isPublic}
                        href={hasNext ? pageUrl(current_page + 1) : null}
                        ariaLabel="Keyingi sahifa"
                    >
                        <FaAngleRight />
                    </PageButton>
                </nav>
            )}
        </div>
    );
}

interface PageButtonProps {
    href: string | null;
    active?: boolean;
    isPublic?: boolean;
    ariaLabel: string;
    children: React.ReactNode;
}

function PageButton({
    href,
    active,
    isPublic,
    ariaLabel,
    children,
}: PageButtonProps) {
    if (!href) {
        return (
            <Button
                variant="outline"
                size="icon"
                className={clsx(isPublic && publicClasses.base)}
                disabled
                aria-label={ariaLabel}
            >
                {children}
            </Button>
        );
    }

    return (
        <Button
            asChild
            variant={active ? "default" : "outline"}
            size="icon"
            className={clsx(
                active && "pointer-events-none",
                isPublic &&
                    (active ? publicClasses.active : publicClasses.base),
            )}
        >
            <Link
                href={href}
                aria-label={ariaLabel}
                aria-current={active ? "page" : undefined}
            >
                {children}
            </Link>
        </Button>
    );
}

export default Pagination;
