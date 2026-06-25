import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useDashboard } from "@/context/DashboardContext";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

/**
 * Sidebar Component.
 * Implements a clean vertical sidebar with active states, hover effects,
 * and responsive scaling for administrative dashboard sections.
 */
export default function Sidebar() {
  const pathname = usePathname();
  const { theme } = useDashboard();

  const menuItems: SidebarItem[] = [
    {
      label: "Overview",
      href: "/spl-dashboard",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      label: "Products",
      href: "/spl-dashboard/products",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.68-.34-1.16-1.04-1.16-1.84a1.996 1.996 0 0 1 1.16-1.84v-2.32c-.68-.34-1.16-1.04-1.16-1.84a1.996 1.996 0 0 1 1.16-1.84V3.75h3.32v2.41c.68.34 1.16 1.04 1.16 1.84a1.996 1.996 0 0 1-1.16 1.84v2.32c.68.34 1.16 1.04 1.16 1.84a1.996 1.996 0 0 1-1.16 1.84v2.41h-3.32v-2.41Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5h5.43M14.82 13.5h5.43" />
        </svg>
      ),
    },
    {
      label: "Blogs",
      href: "/spl-dashboard/blogs",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
        </svg>
      ),
    },
    {
      label: "Media",
      href: "/spl-dashboard/media",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
    {
      label: "Hero Slides",
      href: "/spl-dashboard/hero",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z" />
        </svg>
      ),
    },
    {
      label: "Certificates",
      href: "/spl-dashboard/certificates",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12z" />
        </svg>
      ),
    },
    {
      label: "Services",
      href: "/spl-dashboard/services",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A1.5 1.5 0 0019.5 21l2-2a1.5 1.5 0 000-2.25l-5.83-5.83M11.42 15.17a3 3 0 11-4.24-4.24 3 3 0 014.24 4.24zm0 0l-5.83-5.83A1.5 1.5 0 003.5 3l-2 2a1.5 1.5 0 000 2.25l5.83 5.83m4.24 2.12l.007-.007" />
        </svg>
      ),
    },
    {
      label: "Notices",
      href: "/spl-dashboard/notices",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a9.041 9.041 0 0 1-.47-1.189L13.5 12h-3L9.613 15.893a9.04 9.04 0 0 1-.47 1.189M12 21h.008v.008H12V21Zm0-18h.008v.008H12V3Zm0 13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      ),
    },


    {
      label: "Contact Info",
      href: "/spl-dashboard/contact",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      ),
    },

    {
      label: "Settings",
      href: "/spl-dashboard/settings",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.645-.869l.214-1.28Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-dash-sidebar-bg border-r border-dash-border h-full shrink-0 select-none">
      
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-dash-border relative">
        <Link href="/spl-dashboard" className="flex items-center gap-2">
          <Image
            src="/images/SEECOI1.png"
            alt="SEECO Logo"
            width={120}
            height={30}
            className={`object-contain transition-all duration-300 ${theme === "dark" ? "brightness-200" : "brightness-90 contrast-125"}`}
          />
          <span className="text-[10px] bg-brand-red/20 text-brand-red font-extrabold uppercase px-1.5 py-0.5 rounded-sm tracking-wider absolute right-4 top-4">
            Admin
          </span>
        </Link>
      </div>

      {/* Menu links list */}
      <nav className="flex-1 py-6 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={[
                "flex items-center gap-3.5 px-4 py-3 text-[14px] font-bold rounded-xl transition-all duration-200 group cursor-pointer",
                isActive
                  ? "bg-brand-red text-white shadow-lg shadow-brand-red/20"
                  : "text-dash-text-muted hover:text-dash-text hover:bg-dash-hover-bg",
              ].join(" ")}
            >
              <span className={isActive ? "text-white" : "text-dash-text-muted group-hover:text-dash-text"}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-6 border-t border-dash-border text-[11px] text-dash-text-muted font-semibold tracking-wider text-center">
        SEECO ADMIN PANEL v1.0
      </div>
    </aside>
  );
}
