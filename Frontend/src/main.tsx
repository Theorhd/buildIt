import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import "./utils/i18n.ts";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense fallback="loading">
            <App />
        </Suspense>
    </StrictMode>
);
