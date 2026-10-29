import DeleteModal from "@/Components/Custom/DeleteModal";
import SearchControls from "@/Components/Custom/SearchControls";
import { FiPlus } from "react-icons/fi";
import { Button } from "@/Components/ui/button";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import { useTable } from "@/hooks/useTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Menu, MenuIndexProps } from "@/types/menu";
import { Head, Link } from "@inertiajs/react";
import clsx from "clsx";
import { useState } from "react";
import Pagination from "@/Components/Custom/Pagination";
import TableComponent from "./TableComponent";
import ViewModal from "@/Components/Custom/ViewModal";

function Index({ menus }: MenuIndexProps) {
    const { data } = menus;

    const { deleteItem } = useDeleteItem<Menu>("menus.destroy", "id");

    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
    const [viewMenu, setViewMenu] = useState<Menu | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const {
        sortedData,
        searchTerm,
        setSearchTerm,
        sortField,
        sortDirection,
        handleSort,
    } = useTable<Menu>(data, ["name"]);

    const handleDeleteClick = (menu: Menu) => {
        setSelectedMenu(menu);
        setIsModalOpen(true);
    };

    const handleViewClick = (menu: Menu) => {
        setViewMenu(menu);
        setIsViewModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedMenu) {
            deleteItem(selectedMenu, () => {
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
                    Menyular
                </h2>
            }
        >
            <Head title="Menyular" />

            <div>
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-6">
                        <SearchControls
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                        >
                            <Button asChild className="h-10 rounded-xl">
                                <Link href={route("menus.create")}>
                                    <FiPlus className="h-4 w-4" />
                                    Menyu yaratish
                                </Link>
                            </Button>
                        </SearchControls>

                        {/* Table Component */}
                        <div>
                            <TableComponent
                                data={sortedData}
                                onDelete={handleDeleteClick}
                                onView={handleViewClick}
                                sortField={sortField}
                                sortDirection={sortDirection}
                                onSortChange={handleSort}
                            />
                        </div>

                        {/* Delete Modal */}
                        {selectedMenu && (
                            <DeleteModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onConfirm={handleConfirmDelete}
                                itemName={selectedMenu.name}
                            />
                        )}

                        {/* View Modal */}
                        {viewMenu && (
                            <ViewModal
                                isOpen={isViewModalOpen}
                                onClose={() => setIsViewModalOpen(false)}
                                item={viewMenu}
                            />
                        )}

                        {/* Pagination */}
                        <Pagination meta={menus} label="menyu" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
