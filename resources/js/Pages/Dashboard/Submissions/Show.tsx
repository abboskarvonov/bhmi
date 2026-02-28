import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { format } from "date-fns";
import clsx from "clsx";
import { FormEvent } from "react";
import { FaArrowLeft, FaCalendarDays, FaUser } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";

interface Submission {
    id: number;
    name: string;
    file_url: string | null;
    comment: string | null;
    admin_note: string | null;
    status: "pending" | "accepted" | "rejected";
    created_at: string;
    user: { id: number; name: string; email: string };
}

interface Props {
    submission: Submission;
}

const statusConfig = {
    pending:  { label: "Ko'rib chiqilmoqda", className: "bg-yellow-100 text-yellow-800" },
    accepted: { label: "Qabul qilindi",      className: "bg-green-100 text-green-800"  },
    rejected: { label: "Rad etildi",          className: "bg-red-100 text-red-700"      },
};

function Show({ submission }: Props) {
    const { data, setData, put, processing } = useForm({
        status:     submission.status,
        admin_note: submission.admin_note ?? "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route("submissions.admin.update", submission.id));
    };

    const status = statusConfig[submission.status];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route("submissions.admin.index")}
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800"
                    >
                        <FaArrowLeft className="h-3.5 w-3.5" />
                        Orqaga
                    </Link>
                    <h2 className={clsx("text-xl font-semibold leading-tight", "text-gray-800 dark:text-gray-200")}>
                        Ariza #{submission.id}
                    </h2>
                </div>
            }
        >
            <Head title={`Ariza #${submission.id}`} />

            <div className="py-12">
                <div className="container mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {/* Info card */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="h-1 w-full bg-gradient-to-r from-emerald-700 to-teal-600" />
                            <div className="p-6 space-y-5">
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {submission.name}
                                    </h3>
                                    <span className={clsx("shrink-0 rounded-full px-3 py-1 text-xs font-semibold", status.className)}>
                                        {status.label}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <FaUser className="h-4 w-4 text-emerald-600" />
                                        <span>
                                            <span className="font-medium text-gray-700">{submission.user.name}</span>
                                            <br />
                                            <span className="text-xs">{submission.user.email}</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <FaCalendarDays className="h-4 w-4 text-emerald-600" />
                                        {format(new Date(submission.created_at), "dd.MM.yyyy HH:mm")}
                                    </div>
                                </div>

                                {submission.comment && (
                                    <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
                                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                            Foydalanuvchi izohi
                                        </p>
                                        {submission.comment}
                                    </div>
                                )}

                                {submission.file_url && (
                                    <a
                                        href={`/storage/${submission.file_url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
                                    >
                                        <FiFileText className="h-4 w-4" />
                                        Maqola faylini ko'rish
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Admin action card */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="h-1 w-full bg-gradient-to-r from-emerald-700 to-teal-600" />
                            <div className="p-6">
                                <h3 className="mb-5 text-base font-semibold text-gray-800">
                                    Holat va izoh
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Status select */}
                                    <div>
                                        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                                            Holat
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) =>
                                                setData("status", e.target.value as typeof data.status)
                                            }
                                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        >
                                            <option value="pending">Ko'rib chiqilmoqda</option>
                                            <option value="accepted">Qabul qilindi</option>
                                            <option value="rejected">Rad etildi</option>
                                        </select>
                                    </div>

                                    {/* Admin note */}
                                    <div>
                                        <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                                            Admin izohi (foydalanuvchiga ko'rinadi)
                                        </label>
                                        <textarea
                                            value={data.admin_note}
                                            onChange={(e) => setData("admin_note", e.target.value)}
                                            placeholder="Maqola bo'yicha izoh yoki sabab..."
                                            rows={4}
                                            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 disabled:opacity-60"
                                        >
                                            {processing ? "Saqlanmoqda..." : "Saqlash"}
                                        </button>
                                        <Link
                                            href={route("submissions.admin.index")}
                                            className="text-sm text-gray-400 hover:text-gray-600"
                                        >
                                            Bekor qilish
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Show;
