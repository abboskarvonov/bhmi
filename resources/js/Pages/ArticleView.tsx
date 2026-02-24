import Breadcrumb from "@/Components/Custom/Breadcrumb";
import Right from "@/Components/Home/Right";
import MainLayout from "@/Layouts/MainLayout";
import { stripHtml } from "@/lib/utils";
import { Article } from "@/types/article";
import { format } from "date-fns";

interface Props {
    article: Article;
    articles: Article[];
}

function ArticleView({ article, articles }: Props) {
    const description = article.annotations
        ? stripHtml(article.annotations, 160)
        : `${article.name} — Muallif: ${article.author}. BHMI ilmiy jurnal maqolasi.`;

    return (
        <MainLayout title={article.name} description={description}>
            <Breadcrumb title={article.name} />
            <div className="container mx-auto grid min-h-[550px] max-w-7xl grid-cols-1 gap-10 px-8 py-16 md:grid-cols-3 lg:gap-16 lg:px-1">
                <div className="col-span-1 space-y-4 md:col-span-2">
                    <h1 className="inline-block border-b border-b-gray-600 pb-2 text-xl font-semibold">
                        {article.name}
                    </h1>
                    <div>
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-2 text-sm">
                                    Muallif: {article.author}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm">
                                    Sana: {format(article.date, "dd-MM-yyyy")}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="font-medium">Kalit so'zlar:</p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: article.keywords,
                            }}
                        />
                    </div>
                    <div>
                        <p className="font-medium">Annotatsiya:</p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: article.annotations,
                            }}
                        />
                    </div>
                    {article.file_url && (
                        <iframe
                            src={`/storage/${article.file_url}`}
                            className="mt-5 h-[600px] w-full"
                            title={`${article.name} — PDF fayl`}
                            loading="lazy"
                        ></iframe>
                    )}
                </div>
                <Right articles={articles} />
            </div>
        </MainLayout>
    );
}

export default ArticleView;
