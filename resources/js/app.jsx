import "./http-setup.js";
import "../css/app.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

console.log("App.jsx is loading...");

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        console.log("Resolving page:", name);
        // Import the component directly
        const pages = {
            Welcome: () => import("./Pages/ApplyForm.jsx"),
        };
        return pages[name]();
    },
    setup({ el, App, props }) {
        console.log("Setting up Inertia app...", { el, App, props });
        const root = createRoot(el);
        root.render(React.createElement(App, props));
    },
    progress: {
        color: "#4B5563",
    },
}).catch((error) => {
    console.error("Inertia app failed to load:", error);
});
