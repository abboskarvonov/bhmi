import Dropdown from "@/Components/Dropdown";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
} from "@/Components/ui/sheet";
import { Link, router, usePage } from "@inertiajs/react";
import clsx from "clsx";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { IconType } from "react-icons";
import {
    FiBookOpen,
    FiChevronDown,
    FiExternalLink,
    FiFileText,
    FiGrid,
    FiInbox,
    FiInfo,
    FiList,
    FiLogOut,
    FiMenu,
    FiSend,
    FiUser,
    FiUsers,
} from "react-icons/fi";

interface NavItem {
    label: string;
    href: string;
    icon: IconType;
    active: boolean;
    badge?: number;
}

interface NavSection {
    title?: string;
    items: NavItem[];
}

function useNavigation(): NavSection[] {
    const { auth, pendingSubmissions } = usePage().props;
    const current = (pattern: string) => route().current(pattern);

    const main: NavSection = {
        items: [
            {
                label: "Dashboard",
                href: route("dashboard"),
                icon: FiGrid,
                active: current("dashboard"),
            },
        ],
    };

    if (auth.user.isAdmin !== 1) {
        return [
            main,
            {
                title: "Maqolalarim",
                items: [
                    {
                        label: "Maqola yuborish",
                        href: route("submissions.create"),
                        icon: FiSend,
                        active: current("submissions.create"),
                    },
                    {
                        label: "Yuborilganlar",
                        href: route("submissions.index"),
                        icon: FiList,
                        active: current("submissions.index"),
                    },
                ],
            },
        ];
    }

    const sections: NavSection[] = [
        main,
        {
            title: "Kontent",
            items: [
                {
                    label: "Jurnallar",
                    href: route("journal-issues.index"),
                    icon: FiBookOpen,
                    active: current("journal-issues.*"),
                },
                {
                    label: "Maqolalar",
                    href: route("articles.index"),
                    icon: FiFileText,
                    active: current("articles.*"),
                },
                {
                    label: "Jurnal ma'lumotlari",
                    href: route("abouts.index"),
                    icon: FiInfo,
                    active: current("abouts.*"),
                },
                {
                    label: "Menyular",
                    href: route("menus.index"),
                    icon: FiList,
                    active: current("menus.*"),
                },
            ],
        },
        {
            title: "Tahririyat",
            items: [
                {
                    label: "Arizalar",
                    href: route("submissions.admin.index"),
                    icon: FiInbox,
                    active: current("submissions.admin.*"),
                    badge: pendingSubmissions,
                },
            ],
        },
    ];

    if (auth.isSuperAdmin) {
        sections.push({
            title: "Tizim",
            items: [
                {
                    label: "Foydalanuvchilar",
                    href: route("users.index"),
                    icon: FiUsers,
                    active: current("users.*"),
                },
            ],
        });
    }

    return sections;
}

const initials = (name: string) =>
    name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");

function SidebarContent() {
    const { user } = usePage().props.auth;
    const sections = useNavigation();

    return (
        <div className="flex h-full flex-col bg-gradient-to-b from-emerald-950 via-emerald-950 to-emerald-900 text-emerald-50">
            {/* Brend */}
            <Link
                href="/"
                className="flex h-16 shrink-0 items-center gap-3 border-b border-white/10 px-5"
            >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white p-1 shadow-sm">
                    <img
                        src="/img/logo_min.webp"
                        alt="BHMI logotipi"
                        className="h-full w-full object-contain"
                    />
                </span>
                <span className="leading-tight">
                    <span className="block text-sm font-bold tracking-wide text-white">
                        BHMI
                    </span>
                    <span className="block text-[11px] text-emerald-200/60">
                        Boshqaruv paneli
                    </span>
                </span>
            </Link>

            {/* Navigatsiya */}
            <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
                {sections.map((section, index) => (
                    <div key={section.title ?? index}>
                        {section.title && (
                            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-300/50">
                                {section.title}
                            </p>
                        )}
                        <ul className="space-y-1">
                            {section.items.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-current={
                                            item.active ? "page" : undefined
                                        }
                                        className={clsx(
                                            "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                                            item.active
                                                ? "bg-white/10 text-white"
                                                : "text-emerald-100/70 hover:bg-white/5 hover:text-white",
                                        )}
                                    >
                                        {item.active && (
                                            <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-emerald-400" />
                                        )}
                                        <item.icon
                                            className={clsx(
                                                "h-[18px] w-[18px] shrink-0",
                                                item.active
                                                    ? "text-emerald-300"
                                                    : "text-emerald-200/50 group-hover:text-emerald-200",
                                            )}
                                        />
                                        <span className="flex-1 truncate">
                                            {item.label}
                                        </span>
                                        {!!item.badge && (
                                            <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[11px] font-bold text-amber-950">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* Foydalanuvchi */}
            <div className="border-t border-white/10 p-3">
                <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                        {initials(user.name)}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">
                            {user.name}
                        </p>
                        <p className="truncate text-xs text-emerald-200/60">
                            {user.email}
                        </p>
                    </div>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        title="Chiqish"
                        aria-label="Chiqish"
                        className="rounded-lg p-2 text-emerald-200/60 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        <FiLogOut className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { user } = usePage().props.auth;
    const [mobileOpen, setMobileOpen] = useState(false);

    // Sahifa almashganda mobil menyuni yopish
    useEffect(() => router.on("navigate", () => setMobileOpen(false)), []);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Desktop sidebar */}
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
                <SidebarContent />
            </aside>

            {/* Mobil sidebar */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetContent
                    side="left"
                    className="w-72 max-w-[85vw] border-0 p-0 sm:max-w-72 [&>button]:text-white"
                >
                    <SheetTitle className="sr-only">Menyu</SheetTitle>
                    <SheetDescription className="sr-only">
                        Boshqaruv paneli bo'limlari
                    </SheetDescription>
                    <SidebarContent />
                </SheetContent>
            </Sheet>

            <div className="lg:pl-64">
                {/* Topbar */}
                <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-gray-200/80 bg-white/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        className="-ml-1 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 lg:hidden"
                        aria-label="Menyuni ochish"
                    >
                        <FiMenu className="h-5 w-5" />
                    </button>

                    <div className="min-w-0 flex-1 truncate [&_h2]:truncate [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-gray-900">
                        {header}
                    </div>

                    <a
                        href="/"
                        target="_blank"
                        rel="noopener"
                        className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:inline-flex"
                    >
                        <FiExternalLink className="h-4 w-4" />
                        Saytni ko'rish
                    </a>

                    <Dropdown>
                        <Dropdown.Trigger>
                            <button
                                type="button"
                                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-gray-100"
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                                    {initials(user.name)}
                                </span>
                                <span className="hidden max-w-[10rem] truncate text-sm font-medium text-gray-700 md:block">
                                    {user.name}
                                </span>
                                <FiChevronDown className="hidden h-4 w-4 text-gray-400 md:block" />
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <div className="border-b border-gray-100 px-4 py-3">
                                <p className="truncate text-sm font-semibold text-gray-900">
                                    {user.name}
                                </p>
                                <p className="truncate text-xs text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                            <Dropdown.Link href={route("profile.edit")}>
                                <span className="flex items-center gap-2">
                                    <FiUser className="h-4 w-4" /> Profil
                                </span>
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                <span className="flex items-center gap-2 text-red-600">
                                    <FiLogOut className="h-4 w-4" /> Chiqish
                                </span>
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </header>

                <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
