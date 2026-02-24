import Hero from "@/Components/Home/Hero";
import Main from "@/Components/Home/Main";
import MainLayout from "@/Layouts/MainLayout";
import { stripHtml } from "@/lib/utils";
import { About } from "@/types/about";
import { Article } from "@/types/article";
import { Journal } from "@/types/journal";

interface Props {
    about: About;
    journals: Journal[];
    latest_journal: Journal;
    articles: Article[];
}

export default function Welcome({
    about,
    journals,
    latest_journal,
    articles,
}: Props) {
    const description = about?.content
        ? stripHtml(about.content, 160)
        : "BHMI — Buxlateriya hisobi va moliyaviy iqtisod ilmiy jurnali. Ilmiy maqolalar va tadqiqotlarni o'qing.";

    return (
        <MainLayout title="Bosh sahifa" description={description}>
            <Hero latest_journal={latest_journal} />
            <Main about={about} journals={journals} articles={articles} />
        </MainLayout>
    );
}
