import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export function RootLayout() {
  return (
    <>
      <div className="min-h-screen bg-[var(--color-background)]">
        {/* Sidebar — fixed left, full height */}
        <Sidebar />

        {/* Content area — offset by sidebar width */}
        <div className="ml-[240px] flex flex-col min-h-screen">
          {/* Navbar — fixed top, but inside this offset wrapper's flow */}
          <Navbar />

          {/* Page content — offset by navbar height, scrolls vertically only */}
          <main
            className="
          pt-[56px]
          flex-1
          p-6
          overflow-x-hidden
          w-full
          max-w-full
        "
          >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
