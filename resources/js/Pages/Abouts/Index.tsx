import DeleteModal from "@/Components/Custom/DeleteModal";
import SearchControls from "@/Components/Custom/SearchControls";
import { Button } from "@/Components/ui/button";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import { useTable } from "@/hooks/useTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { About, AboutIndexProps } from "@/types/about";
import { Head, Link } from "@inertiajs/react";
import clsx from "clsx";
import { useState } from "react";
import Pagination from "@/Components/Custom/Pagination";
import TableComponent from "./TableComponent";

function Index({ abouts }: AboutIndexProps) {
    const { data } = abouts;

    const { deleteItem } = useDeleteItem<About>("abouts.destroy", "id");

    const [selectedItem, setSelectedItem] = useState<About | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        sortedData,
        searchTerm,
        setSearchTerm,
        sortField,
        sortDirection,
        handleSort,
    } = useTable<About>(data, ["name"]);

    const handleDeleteClick = (about: About) => {
        setSelectedItem(about);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedItem) {
            deleteItem(selectedItem, () => {
                setIsModalOpen(false);
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2
                    className={clsx(
                        "text-xl font-semibold leading-tight",
                        "text-gray-800 dark:text-gray-200",
                    )}
                >
                    Jurnal ma'lumotlari
                </h2>
            }
        >
            <Head title="Jurnal ma'lumotlari" />

            <div className="py-12">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <SearchControls
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                        />

                        <Link href={route("abouts.create")}>
                            <Button>Ma'lumot yaratish</Button>
                        </Link>

                        {/* Table Component */}
                        <div className="mt-10">
                            <TableComponent
                                data={sortedData}
                                onDelete={handleDeleteClick}
                                sortField={sortField}
                                sortDirection={sortDirection}
                                onSortChange={handleSort}
                            />
                        </div>

                        {/* Delete Modal */}
                        {selectedItem && (
                            <DeleteModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onConfirm={handleConfirmDelete}
                                itemName={selectedItem.name}
                            />
                        )}

                        {/* Pagination */}
                        <Pagination meta={abouts} label="ta" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
