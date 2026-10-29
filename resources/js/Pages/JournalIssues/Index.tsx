import { useDeleteItem } from "@/hooks/useDeleteItem";
import { useServerTable } from "@/hooks/useServerTable";
import { Journal, JournalIndexProps } from "@/types/journal";
import clsx from "clsx";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import SearchControls from "@/Components/Custom/SearchControls";
import { Button } from "@/Components/ui/button";
import DeleteModal from "@/Components/Custom/DeleteModal";
import Pagination from "@/Components/Custom/Pagination";
import TableComponent from "./TableComponent";

function Index({ journals, filters }: JournalIndexProps) {
    const { data, from } = journals;

    const { deleteItem } = useDeleteItem<Journal>(
        "journal-issues.destroy",
        "id",
    );

    const [selectedItem, setSelectedItem] = useState<Journal | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        searchTerm,
        setSearchTerm,
        sortField,
        sortDirection,
        handleSort,
    } = useServerTable<Journal>("journal-issues.index", filters);

    const handleDeleteClick = (journal: Journal) => {
        setSelectedItem(journal);
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
                    Jurnallar
                </h2>
            }
        >
            <Head title="Jurnallar" />

            <div className="py-12">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <SearchControls
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                        />

                        <Link href={route("journal-issues.create")}>
                            <Button>Jurnal yaratish</Button>
                        </Link>

                        {/* Table Component */}
                        <div className="mt-10">
                            <TableComponent
                                data={data}
                                offset={from ?? 1}
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
                        <Pagination meta={journals} label="jurnal" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
