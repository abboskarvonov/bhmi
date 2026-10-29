import { useDeleteItem } from "@/hooks/useDeleteItem";
import { useServerTable } from "@/hooks/useServerTable";
import { Article, ArticleIndexProps } from "@/types/article";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import clsx from "clsx";
import { Head, Link } from "@inertiajs/react";
import SearchControls from "@/Components/Custom/SearchControls";
import { Button } from "@/Components/ui/button";
import Pagination from "@/Components/Custom/Pagination";
import DeleteModal from "@/Components/Custom/DeleteModal";
import TableComponent from "./TableComponent";

function Index({ articles, filters }: ArticleIndexProps) {
    const { data, from } = articles;

    const { deleteItem } = useDeleteItem<Article>("articles.destroy", "id");

    const [selectedItem, setSelectedItem] = useState<Article | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        searchTerm,
        setSearchTerm,
        sortField,
        sortDirection,
        handleSort,
    } = useServerTable<Article>("articles.index", filters);

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
