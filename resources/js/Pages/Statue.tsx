import Breadcrumb from "@/Components/Custom/Breadcrumb";
import Right from "@/Components/Home/Right";
import MainLayout from "@/Layouts/MainLayout";
import { stripHtml } from "@/lib/utils";
import { About } from "@/types/about";
import { Article } from "@/types/article";

interface Props {
    statue: About;
    articles: Article[];
}

function Statue({ statue, articles }: Props) {
    const description = statue?.content
        ? stripHtml(statue.content, 160)
        : "BHMI jurnali tahririyat nizomi va qoidalari.";

    return (
        <MainLayout title={statue.name} description={description}>
            <Breadcrumb title={statue.name} />
            <div className="container mx-auto grid min-h-[550px] max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-3 lg:gap-16 lg:px-4">
                <div className="col-span-1 md:col-span-2">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-700 to-teal-600" />
                        <h1 className="text-2xl font-bold text-gray-900">
                            {statue.name}
                        </h1>
                    </div>
                    <div
                        className="prose prose-gray max-w-none leading-relaxed text-gray-700
                            prose-headings:text-gray-900 prose-headings:font-semibold
                            prose-p:text-gray-700 prose-strong:text-gray-900
                            prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline
                            prose-li:text-gray-700"
                        dangerouslySetInnerHTML={{ __html: statue.content }}
                    />

                    {statue.file_url && (
                        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-5 py-3">
                                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                                <span className="text-sm font-medium text-gray-600">
                                    {statue.name} — PDF
                                </span>
                            </div>
                            <iframe
                                src={`/storage/${statue.file_url}`}
                                className="h-[600px] w-full"
                                title={`${statue.name} — PDF fayl`}
                                loading="lazy"
                            />
                        </div>
                    )}
                </div>
                <Right articles={articles} />
            </div>
        </MainLayout>
    );
}

export default Statue;
