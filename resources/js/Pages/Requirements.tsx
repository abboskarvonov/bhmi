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
            <div className="container mx-auto grid min-h-[550px] max-w-7xl grid-cols-1 gap-10 px-8 py-16 md:grid-cols-3 lg:gap-16 lg:px-1">
                <div className="col-span-1 md:col-span-2">
                    <h1 className="inline-block border-b border-b-gray-600 pb-2 text-xl font-semibold">
                        {requirements.name}
                    </h1>
                    <div
                        className="py-5 indent-10"
                        dangerouslySetInnerHTML={{
                            __html: requirements.content,
                        }}
                    />
                </div>
                <Right articles={articles} />
            </div>
        </MainLayout>
    );
}

export default Requirements;
