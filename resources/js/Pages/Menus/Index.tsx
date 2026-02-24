import DeleteModal from "@/Components/Custom/DeleteModal";
import SearchControls from "@/Components/Custom/SearchControls";
import { Button } from "@/Components/ui/button";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import { useTable } from "@/hooks/useTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Menu, MenuIndexProps } from "@/types/menu";
import { Head, Link } from "@inertiajs/react";
import clsx from "clsx";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import TableComponent from "./TableComponent";
import ViewModal from "@/Components/Custom/ViewModal";

function Index({ menus }: MenuIndexProps) {
    const { data, current_page, last_page } = menus;

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

            <div className="py-12">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <SearchControls
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                        />

                        <Link href={route("menus.create")}>
                            <Button>Menyu yaratish</Button>
                        </Link>

                        {/* Table Component */}
                        <div className="mt-10">
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
                        <div className="mt-10 flex items-center justify-center gap-2">
                            <Link
                                href={
                                    current_page !== 1
                                        ? `/dashboard/menus?page=${
                                              current_page - 1
                                          }`
                                        : "#"
                                }
                            >
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className={`${
                                        current_page === 1
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    } `}
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
                                            href={`/dashboard/menus?page=${page}`}
                                        >
                                            <Button
                                                variant={
                                                    page === current_page
                                                        ? "default"
                                                        : "outline"
                                                }
                                                size={"icon"}
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
                                        ? `/dashboard/menus?page=${
                                              current_page + 1
                                          }`
                                        : "#"
                                }
                            >
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                    className={`${
                                        current_page === last_page
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    } `}
                                >
                                    <FaAngleRight />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
