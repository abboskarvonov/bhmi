import { useDeleteItem } from "@/hooks/useDeleteItem";
import { useServerTable } from "@/hooks/useServerTable";
import { Article, ArticleIndexProps } from "@/types/article";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import clsx from "clsx";
import { Head, Link } from "@inertiajs/react";
import SearchControls from "@/Components/Custom/SearchControls";
import { FiPlus } from "react-icons/fi";
import { Button } from "@/Components/ui/button";
import Pagination from "@/Components/Custom/Pagination";
import DeleteModal from "@/Components/Custom/DeleteModal";
import TableComponent from "./TableComponent";

function Index({ articles, filters }: ArticleIndexProps) {
    const { data, from } = articles;

    const { deleteItem } = useDeleteItem<Article>("articles.destroy", "id");

    const [selectedItem, setSelectedItem] = useState<Article | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { searchTerm, setSearchTerm, sortField, sortDirection, handleSort } =
        useServerTable<Article>("articles.index", filters);

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

            <div>
                <div className="w-full">
                    <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-6">
                        <SearchControls
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                        >
                            <Button asChild className="h-10 rounded-xl">
                                <Link href={route("articles.create")}>
                                    <FiPlus className="h-4 w-4" />
                                    Maqola yaratish
                                </Link>
                            </Button>
                        </SearchControls>

                        {/* Table Component */}
                        <div>
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
                        <Pagination meta={articles} label="maqola" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
