import "../css/app.css";
import "./bootstrap";

import { createInertiaApp, router } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";
import { toast } from "sonner";
import { Toaster } from "./Components/ui/sonner";
import { PageProps } from "./types";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

// Server `->with('success'|'error', ...)` xabarlarini toast qilib ko'rsatish
router.on("navigate", (event) => {
    const { flash } = event.detail.page.props as unknown as PageProps;
    if (flash?.success) toast.success(flash.success);
    if (flash?.error) toast.error(flash.error);
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx"),
        ),
    setup({ el, App, props }) {
        const RootComponent = (
            <>
                <App {...props} />
                <Toaster position="bottom-right" richColors />{" "}
            </>
        );

        if (import.meta.env.SSR) {
            hydrateRoot(el, RootComponent);
            return;
        }

        createRoot(el).render(RootComponent);
    },
    progress: {
        color: "#4B5563",
    },
});
