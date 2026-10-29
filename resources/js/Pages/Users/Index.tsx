import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { UserIndexProps } from "@/types/user";
import { Head, usePage } from "@inertiajs/react";
import Pagination from "@/Components/Custom/Pagination";
import TableComponent from "./TableComponent";

function Index({ users }: UserIndexProps) {
    const { data } = users;
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

            <div>
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-6">
                        <TableComponent
                            data={data}
                            currentUserId={currentUserId}
                        />

                        {/* Pagination */}
                        <Pagination meta={users} label="foydalanuvchi" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
