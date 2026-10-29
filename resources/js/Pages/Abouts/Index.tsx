import DeleteModal from "@/Components/Custom/DeleteModal";
import SearchControls from "@/Components/Custom/SearchControls";
import { FiPlus } from "react-icons/fi";
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

            <div>
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-6">
                        <SearchControls
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                        >
                            <Button asChild className="h-10 rounded-xl">
                                <Link href={route("abouts.create")}>
                                    <FiPlus className="h-4 w-4" />
                                    Ma'lumot yaratish
                                </Link>
                            </Button>
                        </SearchControls>

                        {/* Table Component */}
                        <div>
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
