import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";
import clsx from "clsx";
import { FaEye } from "react-icons/fa6";

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
    submissions: Submission[];
}

const statusConfig = {
    pending: { label: "Ko'rib chiqilmoqda", className: "bg-yellow-100 text-yellow-800" },
    accepted: { label: "Qabul qilindi", className: "bg-green-100 text-green-800" },
    rejected: { label: "Rad etildi", className: "bg-red-100 text-red-700" },
};

function Index({ submissions }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className={clsx("text-xl font-semibold leading-tight", "text-gray-800 dark:text-gray-200")}>
                    Yuborilgan maqolalar
                </h2>
            }
        >
            <Head title="Yuborilgan maqolalar" />

            <div className="py-12">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Jami: <span className="font-semibold text-gray-800">{submissions.length} ta</span>
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                                        <th className="pb-3 pr-4">#</th>
                                        <th className="pb-3 pr-4">Foydalanuvchi</th>
                                        <th className="pb-3 pr-4">Maqola nomi</th>
                                        <th className="pb-3 pr-4">Sana</th>
                                        <th className="pb-3 pr-4">Holat</th>
                                        <th className="pb-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {submissions.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-10 text-center text-gray-400">
                                                Hali ariza yo'q
                                            </td>
                                        </tr>
                                    ) : (
                                        submissions.map((item, index) => {
                                            const status = statusConfig[item.status];
                                            return (
                                                <tr key={item.id} className="hover:bg-gray-50">
                                                    <td className="py-3 pr-4 text-gray-400">{index + 1}</td>
                                                    <td className="py-3 pr-4">
                                                        <p className="font-medium text-gray-800">{item.user.name}</p>
                                                        <p className="text-xs text-gray-400">{item.user.email}</p>
                                                    </td>
                                                    <td className="max-w-xs py-3 pr-4">
                                                        <p className="line-clamp-2 text-gray-800">{item.name}</p>
                                                    </td>
                                                    <td className="py-3 pr-4 text-gray-500">
                                                        {format(new Date(item.created_at), "dd.MM.yyyy")}
                                                    </td>
                                                    <td className="py-3 pr-4">
                                                        <span className={clsx("rounded-full px-2.5 py-1 text-xs font-semibold", status.className)}>
                                                            {status.label}
                                                        </span>
                                                    </td>
                                                    <td className="py-3">
                                                        <Link
                                                            href={route("submissions.admin.show", item.id)}
                                                            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-emerald-300 hover:text-emerald-700"
                                                        >
                                                            <FaEye className="h-3 w-3" />
                                                            Ko'rish
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
