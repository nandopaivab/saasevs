"use client";

import { Sidebar } from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  
  const fetchInitialData = useStore(state => state.fetchInitialData);
  const isInitialized = useStore(state => state.isInitialized);

  useEffect(() => {
    if (!isLoginPage && !isInitialized) {
      fetchInitialData();
    }
  }, [isLoginPage, isInitialized, fetchInitialData]);

  return (
    <>
      {!isLoginPage && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-x-hidden relative">
        {children}
      </div>
    </>
  );
}
