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
            <div className="container mx-auto grid min-h-[550px] max-w-7xl grid-cols-1 gap-10 px-8 py-16 md:grid-cols-3 lg:gap-16 lg:px-1">
                <div className="col-span-1 md:col-span-2">
                    <h1 className="inline-block border-b border-b-gray-600 pb-2 text-xl font-semibold">
                        {statue.name}
                    </h1>
                    <div
                        className="py-5"
                        dangerouslySetInnerHTML={{ __html: statue.content }}
                    />
                    {statue.file_url && (
                        <iframe
                            src={`/storage/${statue.file_url}`}
                            className="mt-5 h-[600px] w-full"
                            title={`${statue.name} — PDF fayl`}
                            loading="lazy"
                        ></iframe>
                    )}
                </div>
                <Right articles={articles} />
            </div>
        </MainLayout>
    );
}

export default Statue;
