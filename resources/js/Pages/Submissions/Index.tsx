import Breadcrumb from "@/Components/Custom/Breadcrumb";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { FaArrowRight, FaCalendarDays, FaPlus } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";

interface Submission {
    id: number;
    name: string;
    file_url: string | null;
    comment: string | null;
    admin_note: string | null;
    status: "pending" | "accepted" | "rejected";
    created_at: string;
}

interface Props {
    submissions: Submission[];
}

const statusConfig = {
    pending: {
        label: "Ko'rib chiqilmoqda",
        className: "bg-yellow-100 text-yellow-800",
    },
    accepted: {
        label: "Qabul qilindi",
        className: "bg-emerald-100 text-emerald-800",
    },
    rejected: {
        label: "Rad etildi",
        className: "bg-red-100 text-red-700",
    },
};

function Index({ submissions }: Props) {
    return (
        <MainLayout
            title="Mening maqolalarim"
            description="Yuborilgan maqolalarim va ularning holati."
        >
            <Breadcrumb title="Mening maqolalarim" />

            <div className="container mx-auto max-w-4xl px-6 py-16 lg:px-4">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-700 to-teal-600" />
                        <h1 className="text-2xl font-bold text-gray-900">
                            Yuborilgan maqolalar
                        </h1>
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-sm font-semibold text-emerald-800">
                            {submissions.length}
                        </span>
                    </div>
                    <Link
                        href={route("submissions.create")}
                        className="flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                    >
                        <FaPlus className="h-3.5 w-3.5" />
                        Yangi maqola
                    </Link>
                </div>

                {submissions.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
                        <FiFileText className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                        <p className="text-gray-500">Hali maqola yubormagansiz</p>
                        <Link
                            href={route("submissions.create")}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900"
                        >
                            Birinchi maqolani yuborish
                            <FaArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {submissions.map((item) => {
                            const status = statusConfig[item.status];
                            return (
                                <div
                                    key={item.id}
                                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                                >
                                    <div className="h-0.5 w-full bg-gradient-to-r from-emerald-700 to-teal-600" />
                                    <div className="p-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 space-y-1.5">
                                                <h2 className="font-semibold text-gray-900">
                                                    {item.name}
                                                </h2>
                                                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                                                    <FaCalendarDays className="h-3.5 w-3.5" />
                                                    {format(new Date(item.created_at), "dd.MM.yyyy")}
                                                </div>
                                            </div>
                                            <span
                                                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                                            >
                                                {status.label}
                                            </span>
                                        </div>

                                        {item.comment && (
                                            <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
                                                <span className="font-medium text-gray-700">Izohim: </span>
                                                {item.comment}
                                            </div>
                                        )}

                                        {item.admin_note && (
                                            <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                                                <span className="font-medium">Admin izohi: </span>
                                                {item.admin_note}
                                            </div>
                                        )}

                                        {item.file_url && (
                                            <div className="mt-3">
                                                <a
                                                    href={`/storage/${item.file_url}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-900"
                                                >
                                                    <FiFileText className="h-4 w-4" />
                                                    Faylni ko'rish
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default Index;
