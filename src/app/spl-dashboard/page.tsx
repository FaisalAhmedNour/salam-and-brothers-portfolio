"use client";

import { useDashboard } from "@/context/DashboardContext";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * DashboardOverview Component.
 * Primary overview interface displaying key stats, quick action portals,
 * and technical resources for platform administrators.
 */
export default function DashboardOverview() {
  const { products, blogs, notices } = useDashboard();
  const [greeting, setGreeting] = useState("Welcome back");
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    setDateString(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  // Metrics calculations
  const totalProducts = products.length;
  const totalBlogs = blogs.length;
  const totalNotices = notices.length;

  return (
    <div className="space-y-8 animate-fade-in text-dash-text select-none">
      
      {/* Premium Glassmorphic Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl border border-dash-border bg-dash-card-bg p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-brand-red/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
        
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-500">
                System Active & Secure
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl text-dash-text">
              {greeting}, <span className="text-brand-red">Admin</span>
            </h2>
            <p className="text-sm font-medium text-dash-text-muted max-w-xl">
              Welcome back to SEECO Power Limited administrative control board. Here is your overview for today.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-dash-hover-bg/30 border border-dash-border/40 rounded-2xl p-4 self-start md:self-auto shadow-inner">
            <div className="p-2.5 bg-dash-card-bg rounded-xl shadow-sm text-brand-red">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">Today's Date</p>
              <p className="text-sm font-extrabold text-dash-text mt-0.5">{dateString || "Loading date..."}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Products Metric Card */}
        <Link href="/spl-dashboard/products" className="bg-dash-card-bg border border-dash-border hover:border-indigo-500/30 rounded-2xl p-6 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/5 flex items-center justify-between group cursor-pointer">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
              Total Products
            </span>
            <h3 className="text-3xl font-black text-dash-text mt-2 group-hover:text-indigo-500 transition-colors">
              {totalProducts}
            </h3>
            <span className="text-[10px] font-extrabold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full mt-2 inline-block">
              Catalog Items
            </span>
          </div>
          <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
        </Link>

        {/* Blogs Metric Card */}
        <Link href="/spl-dashboard/blogs" className="bg-dash-card-bg border border-dash-border hover:border-purple-500/30 rounded-2xl p-6 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/5 flex items-center justify-between group cursor-pointer">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
              Blog Articles
            </span>
            <h3 className="text-3xl font-black text-dash-text mt-2 group-hover:text-purple-500 transition-colors">
              {totalBlogs}
            </h3>
            <span className="text-[10px] font-extrabold text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded-full mt-2 inline-block">
              News & Insights
            </span>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
        </Link>

        {/* Notices Metric Card */}
        <Link href="/spl-dashboard/notices" className="bg-dash-card-bg border border-dash-border hover:border-amber-500/30 rounded-2xl p-6 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/5 flex items-center justify-between group cursor-pointer">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
              Notices Circulars
            </span>
            <h3 className="text-3xl font-black text-dash-text mt-2 group-hover:text-amber-500 transition-colors">
              {totalNotices}
            </h3>
            <span className="text-[10px] font-extrabold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full mt-2 inline-block">
              Tenders & Notices
            </span>
          </div>
          <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          </div>
        </Link>

      </div>

      {/* Grid: Quick Actions and Platform Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Quick Actions Panel */}
        <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <h4 className="font-extrabold text-[12px] uppercase tracking-widest text-dash-text-muted mb-5">
              Quick Portals
            </h4>
            <div className="space-y-3.5">
              <Link
                href="/spl-dashboard/products"
                className="flex items-center justify-between p-4 bg-dash-hover-bg/25 hover:bg-indigo-500/5 border border-dash-border hover:border-indigo-500/20 rounded-xl transition-all duration-300 font-extrabold text-[13px] group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg group-hover:bg-indigo-500/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                  <span>Add New Product</span>
                </div>
                <span className="text-dash-text-muted group-hover:text-indigo-500 group-hover:translate-x-1.5 transition-all">→</span>
              </Link>
              <Link
                href="/spl-dashboard/blogs"
                className="flex items-center justify-between p-4 bg-dash-hover-bg/25 hover:bg-purple-500/5 border border-dash-border hover:border-purple-500/20 rounded-xl transition-all duration-300 font-extrabold text-[13px] group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-purple-500/10 text-purple-500 rounded-lg group-hover:bg-purple-500/20 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </span>
                  <span>Write Blog Article</span>
                </div>
                <span className="text-dash-text-muted group-hover:text-purple-500 group-hover:translate-x-1.5 transition-all">→</span>
              </Link>
              <Link
                href="/spl-dashboard/notices"
                className="flex items-center justify-between p-4 bg-dash-hover-bg/25 hover:bg-amber-500/5 border border-dash-border hover:border-amber-500/20 rounded-xl transition-all duration-300 font-extrabold text-[13px] group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-amber-500/10 text-amber-500 rounded-lg group-hover:bg-amber-500/20 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-all">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.68-.34-1.16-1.04-1.16-1.84a1.996 1.996 0 0 1 1.16-1.84v-2.32c-.68-.34-1.16-1.04-1.16-1.84a1.996 1.996 0 0 1 1.16-1.84V3.75h3.32v2.41c.68.34 1.16 1.04 1.16 1.84a1.996 1.996 0 0 1-1.16 1.84v2.32c.68.34 1.16 1.04 1.16 1.84a1.996 1.996 0 0 1-1.16 1.84v2.41h-3.32v-2.41Z" />
                    </svg>
                  </span>
                  <span>Publish Tender / Notice</span>
                </div>
                <span className="text-dash-text-muted group-hover:text-amber-500 group-hover:translate-x-1.5 transition-all">→</span>
              </Link>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-dash-border flex gap-3 text-[11px] text-dash-text-muted font-bold leading-relaxed">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="h-5 w-5 shrink-0 text-brand-red">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>Please optimize media files (images, PDFs) prior to uploads to maintain loading efficiency.</span>
          </div>
        </div>

        {/* Platform Technical Guide Card */}
        <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <h4 className="font-extrabold text-[12px] uppercase tracking-widest text-dash-text-muted mb-4">
              Platform Resources & Guidelines
            </h4>
            <div className="space-y-4 text-xs font-semibold text-dash-text-muted leading-relaxed">
              <p>
                As an administrator of the SEECO Power Limited portal, you have direct control over managing catalog products, notices, tenders, certificates, and slide animations.
              </p>
              
              <div className="space-y-2">
                <h5 className="font-extrabold text-dash-text text-[11px] uppercase tracking-wide">Publishing Rules:</h5>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Products</strong>: Ensure that both English and Bangla specifications are populated to guarantee smooth localization.</li>
                  <li><strong>Media picker</strong>: Pick pre-uploaded images from the Media Gallery rather than re-uploading duplicate image assets.</li>
                  <li><strong>Notices</strong>: Specify categories (tender, recruitment, general) clearly so users can filter items appropriately.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-dash-border flex items-center justify-between text-[11px] text-dash-text-muted font-extrabold">
            <span>Database Status: Connected</span>
            <span className="text-emerald-500 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
              Online
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
