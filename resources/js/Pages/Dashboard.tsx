import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { FaArrowRight, FaListUl, FaPaperPlane } from "react-icons/fa6";

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {user.isAdmin !== 1 && (
                        <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 shadow-lg">
                            {/* Dot grid */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle, #fff 1px, transparent 1px)",
                                    backgroundSize: "24px 24px",
                                }}
                            />
                            <div className="relative flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white">
                                        Maqola yuborish
                                    </h3>
                                    <p className="max-w-md text-sm text-emerald-100/80">
                                        Ilmiy maqolangizni tahririyatga yuboring. Holati va admin
                                        izohlari "Mening maqolalarim" sahifasida ko'rinadi.
                                    </p>
                                </div>
                                <div className="flex shrink-0 flex-wrap gap-3">
                                    <Link href={route("submissions.create")}>
                                        <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-emerald-800 shadow transition-all hover:bg-emerald-50 active:scale-95">
                                            <FaPaperPlane className="h-4 w-4" />
                                            Maqola yuborish
                                        </button>
                                    </Link>
                                    <Link href={route("submissions.index")}>
                                        <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95">
                                            <FaListUl className="h-4 w-4" />
                                            Mening maqolalarim
                                            <FaArrowRight className="h-3 w-3" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Tizimga muvaffaqiyatli kirdingiz!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
