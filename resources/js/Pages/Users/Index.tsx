import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { UserIndexProps } from "@/types/user";
import { Head, Link, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import TableComponent from "./TableComponent";

function Index({ users }: UserIndexProps) {
    const { data, current_page, last_page, total } = users;
    const currentUserId = usePage().props.auth.user.id;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Foydalanuvchilar
                </h2>
            }
        >
            <Head title="Foydalanuvchilar" />

            <div className="py-12">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            Jami: <span className="font-semibold text-gray-700 dark:text-gray-300">{total}</span> foydalanuvchi
                        </div>

                        <TableComponent
                            data={data}
                            currentUserId={currentUserId}
                        />

                        {/* Pagination */}
                        {last_page > 1 && (
                            <div className="mt-10 flex items-center justify-center gap-2">
                                <Link
                                    href={
                                        current_page !== 1
                                            ? `/dashboard/users?page=${current_page - 1}`
                                            : "#"
                                    }
                                >
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className={
                                            current_page === 1
                                                ? "cursor-not-allowed opacity-50"
                                                : ""
                                        }
                                    >
                                        <FaAngleLeft />
                                    </Button>
                                </Link>

                                <div className="flex items-center space-x-2">
                                    {[...Array(last_page)].map((_, index) => {
                                        const page = index + 1;
                                        return (
                                            <Link
                                                key={page}
                                                href={`/dashboard/users?page=${page}`}
                                            >
                                                <Button
                                                    variant={
                                                        page === current_page
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    size="icon"
                                                >
                                                    {page}
                                                </Button>
                                            </Link>
                                        );
                                    })}
                                </div>

                                <Link
                                    href={
                                        current_page !== last_page
                                            ? `/dashboard/users?page=${current_page + 1}`
                                            : "#"
                                    }
                                >
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className={
                                            current_page === last_page
                                                ? "cursor-not-allowed opacity-50"
                                                : ""
                                        }
                                    >
                                        <FaAngleRight />
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
