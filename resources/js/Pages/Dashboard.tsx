import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import clsx from "clsx";
import { format } from "date-fns";
import { IconType } from "react-icons";
import {
    FiArrowRight,
    FiBookOpen,
    FiCheckCircle,
    FiClock,
    FiFileText,
    FiInbox,
    FiPlus,
    FiSend,
    FiUsers,
} from "react-icons/fi";

type Status = "pending" | "accepted" | "rejected";

interface Submission {
    id: number;
    name: string;
    status: Status;
    created_at: string;
    user?: { id: number; name: string };
}

interface LatestArticle {
    id: number;
    name: string;
    author: string;
    created_at: string;
    journal?: { id: number; name: string } | null;
}

interface Props {
    stats: Record<string, number>;
    recentSubmissions: Submission[];
    latestArticles?: LatestArticle[];
}

const statusConfig: Record<Status, { label: string; className: string }> = {
    pending: {
        label: "Ko'rib chiqilmoqda",
        className: "bg-amber-50 text-amber-700 ring-amber-600/20",
    },
    accepted: {
        label: "Qabul qilindi",
        className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    },
    rejected: {
        label: "Rad etildi",
        className: "bg-red-50 text-red-700 ring-red-600/20",
    },
};

function StatusBadge({ status }: { status: Status }) {
    const config = statusConfig[status];
    return (
        <span
            className={clsx(
                "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                config.className,
            )}
        >
            {config.label}
        </span>
    );
}

function StatCard({
    label,
    value,
    icon: Icon,
    tone,
    href,
}: {
    label: string;
    value: number;
    icon: IconType;
    tone: "emerald" | "teal" | "amber" | "sky";
    href?: string;
}) {
    const tones = {
        emerald: "bg-emerald-50 text-emerald-600",
        teal: "bg-teal-50 text-teal-600",
        amber: "bg-amber-50 text-amber-600",
        sky: "bg-sky-50 text-sky-600",
    };

    const body = (
        <div className="flex h-full flex-col items-start gap-3 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:gap-4 sm:p-5">
            <span
                className={clsx(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                    tones[tone],
                )}
            >
                <Icon className="h-6 w-6" />
            </span>
            <div className="min-w-0">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold tabular-nums text-gray-900">
                    {value.toLocaleString("ru-RU")}
                </p>
            </div>
        </div>
    );

    return href ? <Link href={href}>{body}</Link> : body;
}

function Panel({
    title,
    href,
    children,
}: {
    title: string;
    href?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <h3 className="font-semibold text-gray-900">{title}</h3>
                {href && (
                    <Link
                        href={href}
                        className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                    >
                        Barchasi <FiArrowRight className="h-3.5 w-3.5" />
                    </Link>
                )}
            </div>
            {children}
        </section>
    );
}

function EmptyRow({ text }: { text: string }) {
    return (
        <p className="px-5 py-10 text-center text-sm text-gray-400">{text}</p>
    );
}

const formatDate = (value: string) => format(new Date(value), "dd.MM.yyyy");

export default function Dashboard({
    stats,
    recentSubmissions,
    latestArticles = [],
}: Props) {
    const { user } = usePage().props.auth;
    const isAdmin = user.isAdmin === 1;
    const firstName = user.name.split(" ")[0];

    return (
        <AuthenticatedLayout header={<h2>Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Salomlashish */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 p-6 shadow-sm sm:p-8">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, #fff 1px, transparent 1px)",
                            backgroundSize: "22px 22px",
                        }}
                    />
                    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white sm:text-2xl">
                                Xush kelibsiz, {firstName}!
                            </h3>
                            <p className="mt-1 max-w-lg text-sm text-emerald-50/80">
                                {isAdmin
                                    ? "Jurnal sonlari, maqolalar va mualliflar arizalarini shu yerdan boshqaring."
                                    : "Ilmiy maqolangizni tahririyatga yuboring va uning holatini kuzatib boring."}
                            </p>
                        </div>
                        <div className="flex shrink-0 flex-wrap gap-2">
                            {isAdmin ? (
                                <>
                                    <Link
                                        href={route("articles.create")}
                                        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-50 active:scale-[0.98]"
                                    >
                                        <FiPlus className="h-4 w-4" />
                                        Maqola qo'shish
                                    </Link>
                                    <Link
                                        href={route("journal-issues.create")}
                                        className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 active:scale-[0.98]"
                                    >
                                        <FiPlus className="h-4 w-4" />
                                        Yangi son
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href={route("submissions.create")}
                                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-50 active:scale-[0.98]"
                                >
                                    <FiSend className="h-4 w-4" />
                                    Maqola yuborish
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Statistika */}
                {isAdmin ? (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
                        <StatCard
                            label="Maqolalar"
                            value={stats.articles}
                            icon={FiFileText}
                            tone="emerald"
                            href={route("articles.index")}
                        />
                        <StatCard
                            label="Jurnal sonlari"
                            value={stats.journals}
                            icon={FiBookOpen}
                            tone="teal"
                            href={route("journal-issues.index")}
                        />
                        <StatCard
                            label="Kutilayotgan arizalar"
                            value={stats.pending}
                            icon={FiInbox}
                            tone="amber"
                            href={route("submissions.admin.index")}
                        />
                        <StatCard
                            label="Foydalanuvchilar"
                            value={stats.users}
                            icon={FiUsers}
                            tone="sky"
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                        <StatCard
                            label="Yuborilgan"
                            value={stats.total}
                            icon={FiSend}
                            tone="emerald"
                            href={route("submissions.index")}
                        />
                        <StatCard
                            label="Ko'rib chiqilmoqda"
                            value={stats.pending}
                            icon={FiClock}
                            tone="amber"
                        />
                        <StatCard
                            label="Qabul qilingan"
                            value={stats.accepted}
                            icon={FiCheckCircle}
                            tone="teal"
                        />
                    </div>
                )}

                <div
                    className={clsx(
                        "grid grid-cols-1 gap-6",
                        isAdmin && "xl:grid-cols-2",
                    )}
                >
                    <Panel
                        title={
                            isAdmin ? "So'nggi arizalar" : "Mening arizalarim"
                        }
                        href={route(
                            isAdmin
                                ? "submissions.admin.index"
                                : "submissions.index",
                        )}
                    >
                        {recentSubmissions.length === 0 ? (
                            <EmptyRow text="Hozircha arizalar yo'q" />
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {recentSubmissions.map((item) => {
                                    const row = (
                                        <div className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-gray-50">
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-gray-900">
                                                    {item.name}
                                                </p>
                                                <p className="mt-0.5 truncate text-xs text-gray-500">
                                                    {item.user?.name &&
                                                        `${item.user.name} · `}
                                                    {formatDate(
                                                        item.created_at,
                                                    )}
                                                </p>
                                            </div>
                                            <StatusBadge status={item.status} />
                                        </div>
                                    );
                                    return (
                                        <li key={item.id}>
                                            {isAdmin ? (
                                                <Link
                                                    href={route(
                                                        "submissions.admin.show",
                                                        item.id,
                                                    )}
                                                >
                                                    {row}
                                                </Link>
                                            ) : (
                                                row
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </Panel>

                    {isAdmin && (
                        <Panel
                            title="So'nggi qo'shilgan maqolalar"
                            href={route("articles.index")}
                        >
                            {latestArticles.length === 0 ? (
                                <EmptyRow text="Hozircha maqolalar yo'q" />
                            ) : (
                                <ul className="divide-y divide-gray-100">
                                    {latestArticles.map((article) => (
                                        <li key={article.id}>
                                            <Link
                                                href={route(
                                                    "articles.edit",
                                                    article.id,
                                                )}
                                                className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-gray-50"
                                            >
                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                                    <FiFileText className="h-4 w-4" />
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-gray-900">
                                                        {article.name}
                                                    </p>
                                                    <p className="mt-0.5 truncate text-xs text-gray-500">
                                                        {article.author}
                                                        {article.journal &&
                                                            ` · ${article.journal.name}`}
                                                    </p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Panel>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
