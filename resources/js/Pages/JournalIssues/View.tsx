import {
    DetailItem,
    DetailList,
    EditButton,
    FileCard,
    SiteLinkButton,
} from "@/Components/Custom/Detail";
import { FormHeader, FormSection } from "@/Components/Custom/Form";
import TimeAgo from "@/Components/Custom/TimeAgo";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Journal } from "@/types/journal";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";
import { FiChevronRight, FiFileText, FiPlus } from "react-icons/fi";

function View({ journal_issue }: { journal_issue: Journal }) {
    const articles = journal_issue.articles ?? [];
    const filePath =
        typeof journal_issue.file_url === "string"
            ? journal_issue.file_url
            : null;

    return (
        <AuthenticatedLayout header={<h2>Jurnallar</h2>}>
            <Head title={`Jurnal - ${journal_issue.name}`} />

            <div className="space-y-6">
                <FormHeader
                    title={journal_issue.name}
                    description={`${articles.length} ta maqola`}
                    backHref={route("journal-issues.index")}
                    actions={
                        <>
                            {journal_issue.slug && (
                                <SiteLinkButton
                                    href={`/archive/${journal_issue.slug}`}
                                />
                            )}
                            <EditButton
                                href={route(
                                    "journal-issues.edit",
                                    journal_issue.id,
                                )}
                            />
                        </>
                    }
                />

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm xl:col-span-2">
                        <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 sm:px-6">
                            <h2 className="font-semibold text-gray-900">
                                Shu sondagi maqolalar
                            </h2>
                            <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="rounded-lg"
                            >
                                <Link href={route("articles.create")}>
                                    <FiPlus className="h-4 w-4" />
                                    Maqola qo'shish
                                </Link>
                            </Button>
                        </div>

                        {articles.length === 0 ? (
                            <p className="px-6 py-12 text-center text-sm text-gray-400">
                                Bu songa hali maqola qo'shilmagan
                            </p>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {articles.map((article, index) => (
                                    <li key={article.id}>
                                        <Link
                                            href={route(
                                                "articles.show",
                                                article.id,
                                            )}
                                            className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-gray-50 sm:px-6"
                                        >
                                            <span className="w-6 shrink-0 text-right text-sm tabular-nums text-gray-400">
                                                {index + 1}
                                            </span>
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                                <FiFileText className="h-4 w-4" />
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-gray-900">
                                                    {article.name}
                                                </p>
                                                <p className="mt-0.5 truncate text-xs text-gray-500">
                                                    {article.author}
                                                    {article.pages &&
                                                        ` · ${article.pages}-betlar`}
                                                </p>
                                            </div>
                                            <FiChevronRight className="h-4 w-4 shrink-0 text-gray-300 group-hover:text-gray-500" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    <div className="space-y-6">
                        <FormSection title="Ma'lumotlar">
                            <DetailList>
                                <DetailItem label="Chiqish sanasi">
                                    {journal_issue.date &&
                                        format(
                                            new Date(journal_issue.date),
                                            "dd.MM.yyyy",
                                        )}
                                </DetailItem>
                                <DetailItem label="Maqolalar">
                                    {articles.length} ta
                                </DetailItem>
                                <DetailItem
                                    label="Slug"
                                    className="font-mono text-xs font-normal text-gray-600"
                                >
                                    {journal_issue.slug}
                                </DetailItem>
                                <DetailItem label="Qo'shilgan">
                                    <TimeAgo
                                        createdAt={journal_issue.created_at}
                                    />
                                </DetailItem>
                                <DetailItem label="Yangilangan">
                                    <TimeAgo
                                        updatedAt={journal_issue.updated_at}
                                    />
                                </DetailItem>
                            </DetailList>
                        </FormSection>

                        <FormSection title="Jurnal fayli">
                            <FileCard
                                href={filePath ? `/storage/${filePath}` : null}
                            />
                        </FormSection>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default View;
