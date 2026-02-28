import Breadcrumb from "@/Components/Custom/Breadcrumb";
import Right from "@/Components/Home/Right";
import MainLayout from "@/Layouts/MainLayout";
import { stripHtml } from "@/lib/utils";
import { About } from "@/types/about";
import { Article } from "@/types/article";

interface Props {
    requirements: About;
    articles: Article[];
}

function Requirements({ requirements, articles }: Props) {
    const description = requirements?.content
        ? stripHtml(requirements.content, 160)
        : "BHMI jurnalida maqola chop etish talablari va ko'rsatmalari.";

    return (
        <MainLayout title={requirements.name} description={description}>
            <Breadcrumb title={requirements.name} />
            <div className="container mx-auto grid min-h-[550px] max-w-7xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-3 lg:gap-16 lg:px-4">
                <div className="col-span-1 md:col-span-2">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-700 to-teal-600" />
                        <h1 className="text-2xl font-bold text-gray-900">
                            {requirements.name}
                        </h1>
                    </div>
                    <div
                        className="prose prose-gray max-w-none leading-relaxed text-gray-700
                            prose-headings:text-gray-900 prose-headings:font-semibold
                            prose-p:text-gray-700 prose-strong:text-gray-900
                            prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline
                            prose-li:text-gray-700 prose-ol:text-gray-700"
                        dangerouslySetInnerHTML={{ __html: requirements.content }}
                    />
                </div>
                <Right articles={articles} />
            </div>
        </MainLayout>
    );
}

export default Requirements;
