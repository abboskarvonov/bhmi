import Footer from "@/Components/Main/Footer";
import Header from "@/Components/Main/Header";
import { LayoutProps } from "@/types";
import { Head } from "@inertiajs/react";
import React from "react";

function MainLayout({ children, title }: LayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <Head title={title} />
            <Header />
            <div className="w-full">{children}</div>
            <Footer />
        </div>
    );
}

export default MainLayout;
