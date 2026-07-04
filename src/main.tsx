import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { TaskProvider } from "./context/TaskProvider.tsx";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import { ProfileProvider } from "./context/ProfileProvider.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TaskProvider>
          <ProfileProvider>
            <App />
            <Toaster // ← add this
              position="bottom-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "var(--color-surface)",
                  color: "var(--color-text-primary)",
                  border: "1px solid var(--color-border)",
                  fontSize: "14px",
                },
              }}
            />
          </ProfileProvider>
        </TaskProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
