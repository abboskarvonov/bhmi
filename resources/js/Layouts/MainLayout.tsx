import Footer from "@/Components/Main/Footer";
import Header from "@/Components/Main/Header";
import { LayoutProps } from "@/types";
import { Head } from "@inertiajs/react";
import React from "react";

const SITE_NAME = "Buxlateriya hisobi va moliyaviy iqtisod jurnali";
const DEFAULT_DESCRIPTION =
    "BHMI — Buxlateriya hisobi va moliyaviy iqtisod ilmiy jurnali. Ilmiy maqolalar, tadqiqotlar va jurnal sonlarini o'qing.";
const DEFAULT_OG_IMAGE = "/img/logo.webp";

function MainLayout({ children, title, description, ogImage }: LayoutProps) {
    const canonicalUrl =
        typeof window !== "undefined"
            ? window.location.origin + window.location.pathname
            : "https://bhmi.uz";

    const metaDescription = description || DEFAULT_DESCRIPTION;
    const metaImage = ogImage || DEFAULT_OG_IMAGE;
    const fullTitle = `${title} - ${SITE_NAME}`;

    return (
        <div className="min-h-screen bg-background">
            <Head>
                <title head-key="title">{fullTitle}</title>

                {/* Asosiy SEO meta teglari */}
                <meta
                    head-key="description"
                    name="description"
                    content={metaDescription}
                />
                <meta
                    head-key="robots"
                    name="robots"
                    content="index, follow"
                />
                <link
                    head-key="canonical"
                    rel="canonical"
                    href={canonicalUrl}
                />

                {/* Open Graph (Facebook, LinkedIn, Telegram) */}
                <meta
                    head-key="og:type"
                    property="og:type"
                    content="website"
                />
                <meta
                    head-key="og:title"
                    property="og:title"
                    content={fullTitle}
                />
                <meta
                    head-key="og:description"
                    property="og:description"
                    content={metaDescription}
                />
                <meta
                    head-key="og:image"
                    property="og:image"
                    content={metaImage}
                />
                <meta
                    head-key="og:url"
                    property="og:url"
                    content={canonicalUrl}
                />
                <meta
                    head-key="og:site_name"
                    property="og:site_name"
                    content={SITE_NAME}
                />
                <meta
                    head-key="og:locale"
                    property="og:locale"
                    content="uz_UZ"
                />

                {/* Twitter Card */}
                <meta
                    head-key="twitter:card"
                    name="twitter:card"
                    content="summary_large_image"
                />
                <meta
                    head-key="twitter:title"
                    name="twitter:title"
                    content={fullTitle}
                />
                <meta
                    head-key="twitter:description"
                    name="twitter:description"
                    content={metaDescription}
                />
                <meta
                    head-key="twitter:image"
                    name="twitter:image"
                    content={metaImage}
                />
            </Head>
            <Header />
            <div className="w-full">{children}</div>
            <Footer />
        </div>
    );
}

export default MainLayout;
