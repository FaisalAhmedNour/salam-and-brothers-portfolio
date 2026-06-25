"use client";

import { useDashboard } from "@/context/DashboardContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface HeaderProps {
  onLogout: () => void;
}

/**
 * Header Component.
 * Admin control panel top navigation bar including logout actions,
 * interactive notifications count, and title headings.
 */
export default function Header({ onLogout }: HeaderProps) {
  const { inquiries, markInquiryStatus, theme, toggleTheme } = useDashboard();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  // Find unread messages for notification counts
  const unreadInquiries = inquiries.filter((i) => i.status === "unread");
  const unreadCount = unreadInquiries.length;

  /**
   * Triggers logout API call, deletes session cookies, and updates parent layout state.
   */
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await fetch("/api/spl-dashboard/auth", {
        method: "DELETE",
      });
      if (res.ok) {
        onLogout();
        router.push("/spl-dashboard/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="h-20 bg-dash-header-bg border-b border-dash-border flex items-center justify-between px-6 md:px-8 select-none shrink-0 relative z-40">

      {/* Search / Section title */}
      <div>
        <h1 className="text-[18px] font-extrabold text-dash-text tracking-wide">
          Manager Portal
        </h1>
      </div>

      {/* Action controls: Theme, Messages Notification and Logout */}
      <div className="flex items-center gap-4">

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2.5 bg-dash-hover-bg/40 hover:bg-dash-hover-bg rounded-xl transition-all border border-dash-border cursor-pointer text-dash-text-muted hover:text-dash-text flex items-center justify-center"
          aria-label="Toggle Theme"
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === "light" ? (
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          ) : (
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.955-8.955h-2.25m-13.5 0h-2.25m15.81-7.06-1.591 1.59M5.223 18.777l1.59-1.59m0-11.368-1.59-1.59m11.368 11.368 1.59 1.59M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" />
            </svg>
          )}
        </button>

        {/* Messages Dropdown */}
        {/* <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2.5 bg-dash-hover-bg/40 hover:bg-dash-hover-bg rounded-xl transition-all relative border border-dash-border cursor-pointer text-dash-text-muted hover:text-dash-text flex items-center justify-center"
            aria-label="View Inquiries Notifications"
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="h-5.5 w-5.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a9.04 9.04 0 0 1-1.189-.47L12 15.5l-1.668.71a9.04 9.04 0 0 1-1.189.47M12 21h.008v.008H12V21Zm0-18h.008v.008H12V3Zm0 13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-red border-2 border-dash-card-bg text-white text-[10px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-3 w-80 bg-dash-card-bg border border-dash-border rounded-2xl shadow-2xl p-4 overflow-hidden animate-fade-in text-dash-text">
              <div className="flex justify-between items-center pb-3 border-b border-dash-border mb-3">
                <span className="font-extrabold text-[13px] uppercase tracking-wider text-dash-text-muted">
                  Recent Messages
                </span>
                {unreadCount > 0 && (
                  <span className="text-[11px] font-bold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full">
                    {unreadCount} Pending
                  </span>
                )}
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2">
                {unreadInquiries.length === 0 ? (
                  <div className="text-center py-6 text-dash-text-muted text-[13px] font-medium">
                    No unread inquiries.
                  </div>
                ) : (
                  unreadInquiries.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-dash-hover-bg/40 hover:bg-dash-hover-bg rounded-xl border border-dash-border transition-all text-left relative"
                    >
                      <h4 className="font-bold text-[13px] text-dash-text truncate pr-14">
                        {item.name}
                      </h4>
                      <p className="text-[12px] text-dash-text-muted truncate mt-0.5">
                        {item.subject}
                      </p>

                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          await markInquiryStatus(item.id, "read");
                        }}
                        className="absolute right-3 top-3 text-[10px] bg-brand-red/20 text-brand-red px-1.5 py-0.5 rounded-md hover:bg-brand-red hover:text-white transition-all font-bold cursor-pointer"
                      >
                        Read
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-dash-border pt-3 mt-3 text-center">
                <Link
                  href="/spl-dashboard/inquiries"
                  onClick={() => setShowDropdown(false)}
                  className="block text-[12px] font-extrabold text-dash-text-muted hover:text-brand-red transition-colors uppercase tracking-wider"
                >
                  View All Inquiries
                </Link>
              </div>
            </div >
          )
}
        </div > */}

        {/* Profile Card and Logout */}
        <div className="flex items-center gap-3 border-l border-dash-border pl-4">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-[13px] font-bold text-dash-text leading-none">
              Administrator
            </span>
            <span className="text-[10px] text-dash-text-muted font-extrabold uppercase mt-1">
              spl_admin
            </span>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="p-2.5 bg-brand-red/10 text-brand-red border border-brand-red/10 rounded-xl hover:bg-brand-red hover:text-white transition-all cursor-pointer flex items-center justify-center"
            title="Sign Out"
          >
            {loggingOut ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
            )}
          </button>
        </div>

      </div >
    </header >
  );
}
