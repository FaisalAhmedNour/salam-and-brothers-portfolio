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
  const [isInactiveLogout, setIsInactiveLogout] = useState(false);
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
        <LoginPage
          onLoginSuccess={() => {
            // Reset the inactivity flag upon a new successful login session
            setIsInactiveLogout(false);
            setIsAuthenticated(true);
          }}
          inactiveLogout={isInactiveLogout}
        />
      </DashboardProvider>
    );
  }

  // If logged in, serve the premium dashboard frame
  return (
    <DashboardProvider>
      <DashboardInnerLayout
        onLogout={() => {
          // Normal manual logouts should not trigger an inactivity notice
          setIsInactiveLogout(false);
          setIsAuthenticated(false);
        }}
        onInactiveLogout={() => {
          // Flag this session end as inactivity-driven to inform the UI
          setIsInactiveLogout(true);
          setIsAuthenticated(false);
        }}
      >
        {children}
      </DashboardInnerLayout>
    </DashboardProvider>
  );
}

/**
 * DashboardInnerLayout Component.
 * Inner shell that consumes the theme preference from the DashboardProvider context,
 * manages client-side inactivity timers, and dynamically styles sidebar, header, and panels.
 * 
 * @param children - Inner dashboard page content
 * @param onLogout - Callback function triggered upon manual user logout
 * @param onInactiveLogout - Callback function triggered when 30 minutes of inactivity is detected
 */
function DashboardInnerLayout({
  children,
  onLogout,
  onInactiveLogout,
}: {
  children: React.ReactNode;
  onLogout: () => void;
  onInactiveLogout: () => void;
}) {
  const { theme } = useDashboard();

  // Handle document level dark class application when theme changes
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

  // Set up inactivity detection for 30 minutes of idle status
  useEffect(() => {
    // 30 minutes = 1800000 milliseconds
    const INACTIVITY_TIMEOUT = 30 * 60 * 1000;

    // We use a React ref for timestamps because updating standard state variables on 
    // cursor move events would trigger excessive visual re-renders and tank performance.
    const lastActivityTime = { current: Date.now() };

    const handleActivity = () => {
      lastActivityTime.current = Date.now();
    };

    // Standard client user events that imply actual engagement
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click"
    ];

    // Listen to all activity signals to keep updating the timestamp
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Check delta periodically rather than using a 30m setTimeout which browser tabs can throttle/freeze
    const intervalId = setInterval(async () => {
      const elapsed = Date.now() - lastActivityTime.current;
      if (elapsed >= INACTIVITY_TIMEOUT) {
        clearInterval(intervalId);

        try {
          // Clear backend session to prevent auto-login recovery on reload
          await fetch("/api/spl-dashboard/auth", {
            method: "DELETE",
          });
        } catch (error) {
          // Fail-soft: notify console but proceed to push user out of current view
          console.error("Auto logout API request failed:", error);
        }

        onInactiveLogout();
      }
    }, 10000); // Check every 10 seconds

    return () => {
      // Clean up event handles and timers to avoid background leaks and unexpected redirects
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      clearInterval(intervalId);
    };
  }, [onInactiveLogout]);


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
