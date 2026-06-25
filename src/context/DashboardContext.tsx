"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import staticProducts from "@/data/products.json";
import { BLOG_POSTS as staticBlogs, BlogPost } from "@/data/blogData";
import staticNotices from "@/data/notices.json";

export interface Product {
  id: string;
  slug: string;
  category: string;
  imagePath: string;
  title: { en: string; bn: string };
  subtitle: { en: string; bn: string };
  description: { en: string; bn: string };
  overview: { en: string; bn: string };
  specs: {
    rating: { en: string; bn: string };
    voltage: { en: string; bn: string };
    standard: { en: string; bn: string };
  };
  advantages: {
    en: { title: string; desc: string }[];
    bn: { title: string; desc: string }[];
  };
  applications: {
    en: string[];
    bn: string[];
  };
  specsTable: {
    en: { name: string; val: string }[];
    bn: { name: string; val: string }[];
  };
  accessories: {
    en: string[];
    bn: string[];
  };
  qualityText: { en: string; bn: string };
  ctaTitle: { en: string; bn: string };
  ctaText: { en: string; bn: string };
  ctaBtn: { en: string; bn: string };
}

export interface NoticeFile {
  nameEn: string;
  nameBn: string;
  url: string;
  size: string;
}

export interface Notice {
  id: string;
  refNo: string;
  publishDate: string;
  category: "tender" | "recruitment" | "general" | "certification";
  titleEn: string;
  titleBn: string;
  contentEn: string;
  contentBn: string;
  files: NoticeFile[];
  signatoryEn: string;
  signatoryBn: string;
  designationEn: string;
  designationBn: string;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
  created_at: string;
  status: "unread" | "read" | "resolved";
}

interface DashboardContextType {
  products: Product[];
  blogs: BlogPost[];
  notices: Notice[];
  inquiries: Inquiry[];
  isLoading: boolean;
  theme: "light" | "dark";
  toggleTheme: () => void;
  
  // Actions
  addProduct: (product: Omit<Product, "id">) => Promise<boolean>;
  editProduct: (id: string, product: Product) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;

  addBlog: (blog: Omit<BlogPost, "id">) => Promise<boolean>;
  editBlog: (id: string, blog: BlogPost) => Promise<boolean>;
  deleteBlog: (id: string) => Promise<boolean>;

  addNotice: (notice: Omit<Notice, "id">) => Promise<boolean>;
  editNotice: (id: string, notice: Notice) => Promise<boolean>;
  deleteNotice: (id: string) => Promise<boolean>;

  markInquiryStatus: (id: number, status: "unread" | "read" | "resolved") => Promise<boolean>;
  deleteInquiry: (id: number) => Promise<boolean>;

  refreshAllData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

/**
 * DashboardProvider Component.
 * Wraps dashboard sections to load data from MySQL APIs with robust local fallbacks.
 */
export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Initialize data: try localStorage first, fallback to static JSONs
  useEffect(() => {
    // Sync initial states from localStorage if they exist (to persist mock changes)
    const localProducts = localStorage.getItem("spl_products");
    const localBlogs = localStorage.getItem("spl_blogs");
    const localNotices = localStorage.getItem("spl_notices");
    const localInquiries = localStorage.getItem("spl_inquiries");
    const savedTheme = localStorage.getItem("spl_dash_theme") as "light" | "dark" | null;

    setProducts(localProducts ? JSON.parse(localProducts) : (staticProducts as Product[]));
    setBlogs(localBlogs ? JSON.parse(localBlogs) : (staticBlogs as BlogPost[]));
    setNotices(localNotices ? JSON.parse(localNotices) : (staticNotices as Notice[]));
    setInquiries(localInquiries ? JSON.parse(localInquiries) : []);
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Trigger server sync to pull real MySQL data if configured
    refreshAllData();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("spl_dash_theme", newTheme);
  };

  const refreshAllData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Products
      const pRes = await fetch("/api/spl-dashboard/products");
      if (pRes.ok) {
        const pData = await pRes.json();
        setProducts(pData);
        localStorage.setItem("spl_products", JSON.stringify(pData));
      }

      // 2. Fetch Blogs
      const bRes = await fetch("/api/spl-dashboard/blogs");
      if (bRes.ok) {
        const bData = await bRes.json();
        setBlogs(bData);
        localStorage.setItem("spl_blogs", JSON.stringify(bData));
      }

      // 3. Fetch Notices
      const nRes = await fetch("/api/spl-dashboard/notices");
      if (nRes.ok) {
        const nData = await nRes.json();
        setNotices(nData);
        localStorage.setItem("spl_notices", JSON.stringify(nData));
      }

      // 4. Fetch Inquiries
      const iRes = await fetch("/api/spl-dashboard/inquiries");
      if (iRes.ok) {
        const iData = await iRes.json();
        setInquiries(iData);
        localStorage.setItem("spl_inquiries", JSON.stringify(iData));
      }
    } catch (err) {
      console.warn("Dashboard sync failed. Running in standalone local storage fallback mode.", err);
    } finally {
      setIsLoading(false);
    }
  };

  // PRODUCTS ACTIONS
  const addProduct = async (productData: Omit<Product, "id">) => {
    const newId = productData.slug || `p-${Date.now()}`;
    const newProduct: Product = { ...productData, id: newId };

    try {
      const res = await fetch("/api/spl-dashboard/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        await refreshAllData();
        return true;
      }
    } catch (err) {
      console.error("API error adding product, writing to local state", err);
    }

    // Local state fallback
    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem("spl_products", JSON.stringify(updated));
    return true;
  };

  const editProduct = async (id: string, updatedProduct: Product) => {
    try {
      const res = await fetch("/api/spl-dashboard/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (res.ok) {
        await refreshAllData();
        return true;
      }
    } catch (err) {
      console.error("API error editing product, writing to local state", err);
    }

    // Local state fallback
    const updated = products.map((p) => (p.id === id ? updatedProduct : p));
    setProducts(updated);
    localStorage.setItem("spl_products", JSON.stringify(updated));
    return true;
  };

  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/spl-dashboard/products?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await refreshAllData();
        return true;
      }
    } catch (err) {
      console.error("API error deleting product, writing to local state", err);
    }

    // Local state fallback
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("spl_products", JSON.stringify(updated));
    return true;
  };

  // BLOGS ACTIONS
  const addBlog = async (blogData: Omit<BlogPost, "id">) => {
    const newId = blogData.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `b-${Date.now()}`;
    const newBlog: BlogPost = { ...blogData, id: newId };

    try {
      const res = await fetch("/api/spl-dashboard/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });

      if (res.ok) {
        await refreshAllData();
        return true;
      }
    } catch (err) {
      console.error("API error adding blog, writing to local state", err);
    }

    const updated = [...blogs, newBlog];
    setBlogs(updated);
    localStorage.setItem("spl_blogs", JSON.stringify(updated));
    return true;
  };

  const editBlog = async (id: string, updatedBlog: BlogPost) => {
    try {
      const res = await fetch("/api/spl-dashboard/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
      });

      if (res.ok) {
        await refreshAllData();
        return true;
      }
    } catch (err) {
      console.error("API error editing blog, writing to local state", err);
    }

    const updated = blogs.map((b) => (b.id === id ? updatedBlog : b));
    setBlogs(updated);
    localStorage.setItem("spl_blogs", JSON.stringify(updated));
    return true;
  };

  const deleteBlog = async (id: string) => {
    try {
      const res = await fetch(`/api/spl-dashboard/blogs?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await refreshAllData();
        return true;
      }
    } catch (err) {
      console.error("API error deleting blog, writing to local state", err);
    }

    const updated = blogs.filter((b) => b.id !== id);
    setBlogs(updated);
    localStorage.setItem("spl_blogs", JSON.stringify(updated));
    return true;
  };

  // NOTICES ACTIONS
  const addNotice = async (noticeData: Omit<Notice, "id">) => {
    const newId = noticeData.refNo.replace(/[^a-zA-Z0-9]/g, "-") || `N-${Date.now()}`;
    const newNotice: Notice = { ...noticeData, id: newId };

    try {
      const res = await fetch("/api/spl-dashboard/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotice),
      });

      if (res.ok) {
        await refreshAllData();
        return true;
      }
    } catch (err) {
      console.error("API error adding notice, writing to local state", err);
    }

    const updated = [...notices, newNotice];
    setNotices(updated);
    localStorage.setItem("spl_notices", JSON.stringify(updated));
    return true;
  };

  const editNotice = async (id: string, updatedNotice: Notice) => {
    try {
      const res = await fetch("/api/spl-dashboard/notices", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNotice),
      });

      if (res.ok) {
        await refreshAllData();
        return true;
      }
    } catch (err) {
      console.error("API error editing notice, writing to local state", err);
    }

    const updated = notices.map((n) => (n.id === id ? updatedNotice : n));
    setNotices(updated);
    localStorage.setItem("spl_notices", JSON.stringify(updated));
    return true;
  };

  const deleteNotice = async (id: string) => {
    try {
      const res = await fetch(`/api/spl-dashboard/notices?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await refreshAllData();
        return true;
      }
    } catch (err) {
      console.error("API error deleting notice, writing to local state", err);
    }

    const updated = notices.filter((n) => n.id !== id);
    setNotices(updated);
    localStorage.setItem("spl_notices", JSON.stringify(updated));
    return true;
  };

  // INQUIRIES ACTIONS
  const markInquiryStatus = async (id: number, status: "unread" | "read" | "resolved") => {
    try {
      const res = await fetch("/api/spl-dashboard/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        await refreshAllData();
        return true;
      }
    } catch (err) {
      console.error("API error updating inquiry, writing to local state", err);
    }

    const updated = inquiries.map((i) => (i.id === id ? { ...i, status } : i));
    setInquiries(updated);
    localStorage.setItem("spl_inquiries", JSON.stringify(updated));
    return true;
  };

  const deleteInquiry = async (id: number) => {
    try {
      const res = await fetch(`/api/spl-dashboard/inquiries?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await refreshAllData();
        return true;
      }
    } catch (err) {
      console.error("API error deleting inquiry, writing to local state", err);
    }

    const updated = inquiries.filter((i) => i.id !== id);
    setInquiries(updated);
    localStorage.setItem("spl_inquiries", JSON.stringify(updated));
    return true;
  };

  return (
    <DashboardContext.Provider
      value={{
        products,
        blogs,
        notices,
        inquiries,
        isLoading,
        theme,
        toggleTheme,
        addProduct,
        editProduct,
        deleteProduct,
        addBlog,
        editBlog,
        deleteBlog,
        addNotice,
        editNotice,
        deleteNotice,
        markInquiryStatus,
        deleteInquiry,
        refreshAllData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

/**
 * Custom hook to consume the dashboard context.
 */
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
