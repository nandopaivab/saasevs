"use client";

import { Sidebar } from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <>
      {!isLoginPage && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-x-hidden relative">
        {children}
      </div>
    </>
  );
}
