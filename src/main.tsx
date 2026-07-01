import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { TaskProvider } from "./context/TaskProvider.tsx";
import { ThemeProvider } from "./context/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
