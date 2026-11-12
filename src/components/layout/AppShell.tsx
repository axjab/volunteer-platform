import type { ReactNode } from "react";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 lg:ml-72">
          <Topbar />
          <main className="px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-8">{children}</main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}