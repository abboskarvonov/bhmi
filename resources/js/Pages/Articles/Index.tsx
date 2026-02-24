import { useDeleteItem } from "@/hooks/useDeleteItem";
import { useTable } from "@/hooks/useTable";
import { Article, ArticleIndexProps } from "@/types/article";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import clsx from "clsx";
import { Head, Link } from "@inertiajs/react";
import SearchControls from "@/Components/Custom/SearchControls";
import { Button } from "@/Components/ui/button";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import DeleteModal from "@/Components/Custom/DeleteModal";
import TableComponent from "./TableComponent";

function Index({ articles }: ArticleIndexProps) {
    const { data, current_page, last_page } = articles;

    const { deleteItem } = useDeleteItem<Article>("articles.destroy", "id");

    const [selectedItem, setSelectedItem] = useState<Article | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        sortedData,
        searchTerm,
        setSearchTerm,
        sortField,
        sortDirection,
        handleSort,
    } = useTable<Article>(data, ["name"]);

    const handleDeleteClick = (article: Article) => {
        setSelectedItem(article);
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
                    Maqolalar
                </h2>
            }
        >
            <Head title="Maqolalar" />

            <div className="py-12">
                <div className="container mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <SearchControls
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                        />

                        <Link href={route("articles.create")}>
                            <Button>Maqola yaratish</Button>
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
                        <div className="mt-10 flex items-center justify-center gap-2">
                            <Link
                                href={
                                    current_page !== 1
                                        ? `/dashboard/articles?page=${
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
                                            href={`/dashboard/articles?page=${page}`}
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
                                        ? `/dashboard/articles?page=${
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
