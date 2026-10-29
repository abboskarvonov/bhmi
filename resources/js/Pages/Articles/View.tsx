import {
    DetailItem,
    DetailList,
    EditButton,
    FileCard,
    SiteLinkButton,
} from "@/Components/Custom/Detail";
import { FormHeader, FormSection } from "@/Components/Custom/Form";
import SafeHtml from "@/Components/Custom/SafeHtml";
import TimeAgo from "@/Components/Custom/TimeAgo";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Article } from "@/types/article";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";

function View({ article }: { article: Article }) {
    return (
        <AuthenticatedLayout header={<h2>Maqolalar</h2>}>
            <Head title={`Maqola - ${article.name}`} />

            <div className="space-y-6">
                <FormHeader
                    title={article.name}
                    description={article.author}
                    backHref={route("articles.index")}
                    actions={
                        <>
                            {article.slug && (
                                <SiteLinkButton
                                    href={`/article/${article.slug}`}
                                />
                            )}
                            <EditButton
                                href={route("articles.edit", article.id)}
                            />
                        </>
                    }
                />

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="space-y-6 xl:col-span-2">
                        <FormSection title="Kalit so'zlar">
                            <SafeHtml
                                html={article.keywords}
                                className="rich-content text-sm text-gray-700"
                                fallback="Kalit so'zlar kiritilmagan."
                            />
                        </FormSection>
                        <FormSection title="Annotatsiya">
                            <SafeHtml
                                html={article.annotations}
                                className="rich-content text-sm text-gray-700"
                                fallback="Annotatsiya kiritilmagan."
                            />
                        </FormSection>
                    </div>

                    <div className="space-y-6">
                        <FormSection title="Ma'lumotlar">
                            <DetailList>
                                <DetailItem label="Jurnal soni">
                                    {article.journal && (
                                        <Link
                                            href={route(
                                                "journal-issues.show",
                                                article.journal.id,
                                            )}
                                            className="text-emerald-700 hover:underline"
                                        >
                                            {article.journal.name}
                                        </Link>
                                    )}
                                </DetailItem>
                                <DetailItem label="Sahifalar">
                                    {article.pages}
                                </DetailItem>
                                <DetailItem label="Nashr sanasi">
                                    {article.date &&
                                        format(
                                            new Date(article.date),
                                            "dd.MM.yyyy",
                                        )}
                                </DetailItem>
                                <DetailItem
                                    label="Slug"
                                    className="font-mono text-xs font-normal text-gray-600"
                                >
                                    {article.slug}
                                </DetailItem>
                                <DetailItem label="Qo'shilgan">
                                    <TimeAgo createdAt={article.created_at} />
                                </DetailItem>
                                <DetailItem label="Yangilangan">
                                    <TimeAgo updatedAt={article.updated_at} />
                                </DetailItem>
                            </DetailList>
                        </FormSection>

                        <FormSection title="Maqola fayli">
                            <FileCard
                                href={
                                    article.file_url
                                        ? `/storage/${article.file_url}`
                                        : null
                                }
                            />
                        </FormSection>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default View;
