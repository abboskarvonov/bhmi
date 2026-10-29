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

            <div className="py-12">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm dark:bg-gray-800 sm:rounded-lg">
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
