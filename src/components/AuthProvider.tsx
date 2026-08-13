"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!isAuthenticated && pathname !== "/login") {
        router.push("/login");
      }
    }
  }, [isAuthenticated, pathname, mounted, router]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Carregando...</div>;
  }

  return <>{children}</>;
}
