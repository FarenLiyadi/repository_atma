import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { ThemeProvider } from "@material-tailwind/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { MaterialTailwindControllerProvider } from "./context";
import { BrowserRouter } from "react-router-dom";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <BrowserRouter>
                <ThemeProvider>
                    <MaterialTailwindControllerProvider>
                        <App {...props} />
                    </MaterialTailwindControllerProvider>
                </ThemeProvider>
            </BrowserRouter>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
