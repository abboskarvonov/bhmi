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
import { About } from "@/types/about";
import { Head } from "@inertiajs/react";

// Har bir tur saytning qaysi sahifasida chiqadi
const SITE_PAGES: Record<string, string> = {
    "Jurnal haqida": "/",
    "Tahririyat a'zolari": "/members",
    "Maqola talablari": "/requirements",
    "Tahririyat nizomi": "/statue",
};

function View({ about }: { about: About }) {
    const sitePage = SITE_PAGES[about.type];
    const filePath =
        typeof about.file_url === "string" && about.file_url !== ""
            ? about.file_url
            : null;

    return (
        <AuthenticatedLayout header={<h2>Jurnal ma'lumotlari</h2>}>
            <Head title={`Ma'lumot - ${about.name}`} />

            <div className="space-y-6">
                <FormHeader
                    title={about.name}
                    description={about.type}
                    backHref={route("abouts.index")}
                    actions={
                        <>
                            {sitePage && <SiteLinkButton href={sitePage} />}
                            <EditButton href={route("abouts.edit", about.id)} />
                        </>
                    }
                />

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    <div className="xl:col-span-2">
                        <FormSection title="Kontent">
                            <SafeHtml
                                html={about.content}
                                className="rich-content text-sm text-gray-700"
                            />
                        </FormSection>
                    </div>

                    <div className="space-y-6">
                        <FormSection title="Ma'lumotlar">
                            <DetailList>
                                <DetailItem label="Sahifa turi">
                                    <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                                        {about.type}
                                    </span>
                                </DetailItem>
                                <DetailItem label="Saytda">
                                    {sitePage && (
                                        <span className="font-mono text-xs font-normal text-gray-600">
                                            {sitePage}
                                        </span>
                                    )}
                                </DetailItem>
                                <DetailItem label="Qo'shilgan">
                                    <TimeAgo createdAt={about.created_at} />
                                </DetailItem>
                                <DetailItem label="Yangilangan">
                                    <TimeAgo updatedAt={about.updated_at} />
                                </DetailItem>
                            </DetailList>
                        </FormSection>

                        <FormSection title="Ilova fayl">
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
