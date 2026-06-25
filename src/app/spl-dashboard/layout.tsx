"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DashboardProvider } from "@/context/DashboardContext";
import LoginPage from "./login/page";
import Sidebar from "@/components/spl-dashboard/Sidebar";
import Header from "@/components/spl-dashboard/Header";

import { useDashboard } from "@/context/DashboardContext";

/**
 * DashboardLayout Component.
 * Wraps dashboard routes in a DashboardProvider, intercepts requests to verify
 * authentication, and injects sidebar, header, and content wrappers.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/spl-dashboard/auth");
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(data.authenticated);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    // Do not check auth if we're on the login route itself
    if (pathname === "/spl-dashboard/login") {
      setLoading(false);
    } else {
      checkAuth();
    }
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If viewing the login page directly, allow direct render wrapping in Provider
  if (pathname === "/spl-dashboard/login") {
    return <DashboardProvider>{children}</DashboardProvider>;
  }

  // Render the glassmorphic login screen overlay if not logged in
  if (!isAuthenticated) {
    return (
      <DashboardProvider>
        <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
      </DashboardProvider>
    );
  }

  // If logged in, serve the premium dashboard frame
  return (
    <DashboardProvider>
      <DashboardInnerLayout onLogout={() => setIsAuthenticated(false)}>
        {children}
      </DashboardInnerLayout>
    </DashboardProvider>
  );
}

/**
 * DashboardInnerLayout Component.
 * Inner shell that consumes the theme preference from the DashboardProvider context
 * and dynamically styles sidebar, header, and panels.
 */
function DashboardInnerLayout({
  children,
  onLogout,
}: {
  children: React.ReactNode;
  onLogout: () => void;
}) {
  const { theme } = useDashboard();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    return () => {
      root.classList.remove("dark");
    };
  }, [theme]);


  return (
    <div className={`flex h-screen overflow-hidden ${theme} bg-dash-bg text-dash-text font-arone`}>
      
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Workspace panel */}
      <div className="flex-1 flex flex-col overflow-hidden bg-dash-card-bg border-l border-dash-border">
        
        {/* Header Action controls */}
        <Header onLogout={onLogout} />

        {/* Core content wrapper */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-dash-bg">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
