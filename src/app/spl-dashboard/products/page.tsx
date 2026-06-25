"use client";

import { useState } from "react";
import { useDashboard, Product } from "@/context/DashboardContext";
import Image from "next/image";
import MediaPickerModal from "@/components/spl-dashboard/MediaPickerModal";

/**
 * DashboardProducts Component.
 * Implements administrative product listing CRUD screens, search/filters,
 * and forms inside modal views supporting file uploads and bilingual assets.
 */
export default function DashboardProducts() {
  const { products, addProduct, editProduct, deleteProduct } = useDashboard();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "en" | "bn">("general");

  // Media Library Picker state
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Product form initial state
  const initialProductState = {
    slug: "",
    category: "transformers",
    imagePath: "",
    title: { en: "", bn: "" },
    subtitle: { en: "", bn: "" },
    description: { en: "", bn: "" },
    overview: { en: "", bn: "" },
    specs: {
      rating: { en: "", bn: "" },
      voltage: { en: "", bn: "" },
      standard: { en: "", bn: "" },
    },
    advantages: { en: [], bn: [] },
    applications: { en: [], bn: [] },
    specsTable: { en: [], bn: [] },
    accessories: { en: [], bn: [] },
    qualityText: { en: "", bn: "" },
    ctaTitle: { en: "", bn: "" },
    ctaText: { en: "", bn: "" },
    ctaBtn: { en: "", bn: "" },
  };

  const [formData, setFormData] = useState<Omit<Product, "id">>(initialProductState);

  // Filter list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.title.bn && p.title.bn.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(initialProductState);
    setActiveTab("general");
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      advantages: product.advantages || { en: [], bn: [] },
      applications: product.applications || { en: [], bn: [] },
      specsTable: product.specsTable || { en: [], bn: [] },
      accessories: product.accessories || { en: [], bn: [] },
      qualityText: product.qualityText || { en: "", bn: "" },
      ctaTitle: product.ctaTitle || { en: "", bn: "" },
      ctaText: product.ctaText || { en: "", bn: "" },
      ctaBtn: product.ctaBtn || { en: "", bn: "" },
    });
    setActiveTab("general");
    setIsModalOpen(true);
  };

  /**
   * Action: Uploads image file to server, updates imagePath form state.
   */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    const fileForm = new FormData();
    fileForm.append("file", file);

    try {
      const res = await fetch("/api/spl-dashboard/upload", {
        method: "POST",
        body: fileForm,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, imagePath: data.url }));
      } else {
        setUploadError(data.error || "File upload failed.");
      }
    } catch (err) {
      setUploadError("Network error during file upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;

    if (editingProduct) {
      success = await editProduct(editingProduct.id, { ...formData, id: editingProduct.id });
    } else {
      success = await addProduct(formData);
    }

    if (success) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-dash-text">
      
      {/* Title Header */}
      <div className="flex justify-between items-center select-none">
        <div>
          <h2 className="text-[24px] font-extrabold tracking-wide">Products Manager</h2>
          <p className="text-[14px] text-dash-text-muted mt-1">
            Publish, edit, and categorize energy transformer units and switchgear panels.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-brand-red hover:bg-brand-red-hover text-white text-[14px] font-bold px-5 py-3 rounded-xl shadow-lg shadow-brand-red/10 transition-all active:scale-98 cursor-pointer flex items-center gap-2"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-dash-card-bg border border-dash-border p-4 rounded-2xl select-none">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by title, slug..."
            className="w-full bg-dash-hover-bg/30 border border-dash-border rounded-xl pl-11 pr-4 py-3 text-[14px] focus:outline-hidden focus:border-brand-red/30 text-dash-text placeholder-dash-text-muted/40 font-semibold"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dash-text-muted">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
            </svg>
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {[
            { id: "all", label: "All Categories" },
            { id: "transformers", label: "Transformers" },
            { id: "power-dist", label: "Power Distribution" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={[
                "px-4 py-2 rounded-lg text-[13px] font-bold cursor-pointer transition-all",
                selectedCategory === cat.id
                  ? "bg-dash-hover-bg text-dash-text border border-dash-border"
                  : "text-dash-text-muted hover:text-dash-text hover:bg-dash-hover-bg/50 border border-transparent",
              ].join(" ")}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-dash-card-bg border border-dash-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse select-none">
            <thead>
              <tr className="border-b border-dash-border bg-dash-hover-bg/20 text-[12px] font-extrabold text-dash-text-muted uppercase tracking-wider">
                <th className="py-4.5 px-6 w-24">Image</th>
                <th className="py-4.5 px-6">Product Title (EN)</th>
                <th className="py-4.5 px-6">Category</th>
                <th className="py-4.5 px-6">Specs Rating</th>
                <th className="py-4.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dash-border text-[14px] font-semibold text-dash-text">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-dash-text-muted font-medium">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-dash-hover-bg/10 transition-colors">
                    <td className="py-4 px-6">
                      <div className="relative w-12 h-12 bg-dash-hover-bg border border-dash-border rounded-lg overflow-hidden flex items-center justify-center">
                        {p.imagePath ? (
                          <img
                            src={p.imagePath}
                            alt={p.title.en}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-[10px] text-dash-text-muted uppercase font-extrabold">No img</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold">
                      <div>
                        <p className="leading-tight">{p.title.en}</p>
                        <p className="text-[11px] text-dash-text-muted mt-1 font-mono">{p.slug}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[12px] bg-dash-hover-bg/50 border border-dash-border px-2.5 py-1 rounded-full uppercase tracking-wider text-dash-text-muted font-bold">
                        {p.category === "transformers" ? "Transformer" : "Power Dist"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-dash-text-muted text-[13px] font-mono">
                      {p.specs.rating.en || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-3.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="text-[13px] text-brand-red hover:text-brand-red-hover font-bold cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Are you sure you want to delete "${p.title.en}"?`)) {
                              await deleteProduct(p.id);
                            }
                          }}
                          className="text-[13px] text-dash-text-muted hover:text-dash-text transition-colors font-bold cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none">
          <div className="relative w-full max-w-2xl bg-dash-card-bg border border-dash-border rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-dash-text">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-dash-border shrink-0">
              <h3 className="font-extrabold text-[18px]">
                {editingProduct ? `Edit Product: ${editingProduct.title.en}` : "Add New Product"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-dash-text-muted hover:text-dash-text rounded-lg transition-colors cursor-pointer"
              >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Tabs Panel */}
            <div className="flex bg-dash-hover-bg/30 border-b border-dash-border px-6 py-2 shrink-0 gap-2">
              {[
                { id: "general", label: "General Specs" },
                { id: "en", label: "English Details" },
                { id: "bn", label: "Bangla Details" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={[
                    "px-4 py-2.5 rounded-lg text-[13px] font-bold cursor-pointer transition-all",
                    activeTab === tab.id
                      ? "bg-brand-red/10 text-brand-red"
                      : "text-dash-text-muted hover:text-dash-text",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Tab 1: General Specs */}
              {activeTab === "general" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                        Product Slug
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9_-]+/g, "-") })}
                        placeholder="e.g. power-transformer"
                        className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-dash-card-bg border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3.5 text-[14px] focus:outline-hidden text-dash-text font-semibold"
                      >
                        <option value="transformers">Transformers</option>
                        <option value="power-dist">Power Distribution</option>
                      </select>
                    </div>
                  </div>

                  {/* Image upload field */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Product Image
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="w-20 h-20 bg-dash-hover-bg border border-dash-border rounded-xl overflow-hidden shrink-0 flex items-center justify-center relative">
                        {formData.imagePath ? (
                          <img
                            src={formData.imagePath}
                            alt="Preview"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-[10px] text-dash-text-muted uppercase font-extrabold text-center px-1">No Image</span>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={formData.imagePath}
                          onChange={(e) => setFormData({ ...formData, imagePath: e.target.value })}
                          placeholder="Or enter image URL manually"
                          className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[13px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                        />
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setIsMediaPickerOpen(true)}
                            className="bg-brand-red hover:bg-brand-red-hover text-white text-[12px] font-bold px-4 py-2.5 rounded-lg shadow-md cursor-pointer transition-all active:scale-[0.97]"
                          >
                            Choose from Media Library
                          </button>
                          <label className="bg-dash-hover-bg hover:bg-dash-hover-bg/85 text-dash-text text-[12px] font-bold px-4 py-2.5 border border-dash-border rounded-lg cursor-pointer transition-all">
                            <span>{uploading ? "Uploading..." : "Upload File"}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={uploading}
                              onChange={handleImageUpload}
                            />
                          </label>
                          {uploadError && (
                            <span className="text-[11px] font-bold text-red-500">{uploadError}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2 & 3: Bilingual content (English/Bangla details dynamically rendered) */}
              {(activeTab === "en" || activeTab === "bn") && (() => {
                const lang = activeTab;
                const isEn = lang === "en";
                
                return (
                  <div className="space-y-8 animate-fade-in pb-4">
                    {/* Basic details section */}
                    <div className="space-y-4">
                      <h4 className="text-[14px] font-extrabold uppercase tracking-widest text-brand-red border-b border-dash-border pb-1 select-none">
                        {isEn ? "Core Information" : "মূল তথ্য"}
                      </h4>
                      
                      <div className="space-y-2">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                          {isEn ? "Product Title" : "পণ্য শিরোনাম"}
                        </label>
                        <input
                          type="text"
                          required={isEn}
                          value={formData.title[lang] || ""}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            title: { ...formData.title, [lang]: e.target.value } 
                          })}
                          placeholder={isEn ? "e.g. Distribution Transformer" : "যেমন: ডিস্ট্রিবিউশন ট্রান্সফরমার"}
                          className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                          {isEn ? "Subtitle" : "উপশিরোনাম"}
                        </label>
                        <input
                          type="text"
                          value={formData.subtitle[lang] || ""}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            subtitle: { ...formData.subtitle, [lang]: e.target.value } 
                          })}
                          placeholder={isEn ? "e.g. Oil-Immersed Transformers (10 - 5000 kVA)" : "যেমন: অয়েল-ইমার্সড ট্রান্সফরমার (১০ – ৫০০০ কেভিএ)"}
                          className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                            {isEn ? "Rating Card Value" : "রেটিং"}
                          </label>
                          <input
                            type="text"
                            value={formData.specs.rating[lang] || ""}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              specs: { 
                                ...formData.specs, 
                                rating: { ...formData.specs.rating, [lang]: e.target.value } 
                              } 
                            })}
                            placeholder={isEn ? "e.g. 10 - 5000 kVA" : "যেমন: ১০ - ৫০০০ কেভিএ"}
                            className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-3 py-2.5 text-[13px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                            {isEn ? "Voltage Card Value" : "ভোল্টেজ"}
                          </label>
                          <input
                            type="text"
                            value={formData.specs.voltage[lang] || ""}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              specs: { 
                                ...formData.specs, 
                                voltage: { ...formData.specs.voltage, [lang]: e.target.value } 
                              } 
                            })}
                            placeholder={isEn ? "e.g. Up to 36 kV" : "যেমন: ৩৬ কেভি পর্যন্ত"}
                            className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-3 py-2.5 text-[13px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                            {isEn ? "Standard Card Value" : "স্ট্যান্ডার্ড"}
                          </label>
                          <input
                            type="text"
                            value={formData.specs.standard[lang] || ""}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              specs: { 
                                ...formData.specs, 
                                standard: { ...formData.specs.standard, [lang]: e.target.value } 
                              } 
                            })}
                            placeholder={isEn ? "e.g. IEC 60076" : "যেমন: IEC 60076"}
                            className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-3 py-2.5 text-[13px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                          {isEn ? "Short Description" : "সংক্ষিপ্ত বিবরণ"}
                        </label>
                        <textarea
                          rows={2}
                          value={formData.description[lang] || ""}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            description: { ...formData.description, [lang]: e.target.value } 
                          })}
                          placeholder={isEn ? "Short summary paragraph displayed on grid..." : "সংক্ষিপ্ত বিবরণী প্যারাগ্রাফ..."}
                          className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                          {isEn ? "Overview Description" : "বিস্তারিত বিবরণ (Overview)"}
                        </label>
                        <textarea
                          rows={4}
                          value={formData.overview[lang] || ""}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            overview: { ...formData.overview, [lang]: e.target.value } 
                          })}
                          placeholder={isEn ? "Detailed overview specification paragraphs..." : "বিস্তারিত বিবরণী প্যারাগ্রাফসমূহ..."}
                          className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                        />
                      </div>
                    </div>

                    {/* 1. Advantages Section */}
                    <div className="space-y-4">
                      <h4 className="text-[14px] font-extrabold uppercase tracking-widest text-brand-red border-b border-dash-border pb-1 select-none flex justify-between items-center">
                        <span>{isEn ? "Key Advantages" : "প্রধান সুবিধাসমূহ"}</span>
                        <span className="text-[11px] text-dash-text-muted font-normal lowercase tracking-normal">
                          {isEn ? "displays in top list layout" : "তালিকায় প্রদর্শিত হবে"}
                        </span>
                      </h4>
                      
                      <div className="space-y-3">
                        {((formData.advantages?.[lang]) || []).map((adv, idx) => (
                          <div key={idx} className="p-4 bg-dash-hover-bg/10 border border-dash-border/60 rounded-2xl space-y-3 relative">
                            <div className="flex justify-between items-center gap-3">
                              <input
                                type="text"
                                value={adv.title || ""}
                                onChange={(e) => {
                                  const newList = [...(formData.advantages[lang] || [])];
                                  newList[idx] = { ...newList[idx], title: e.target.value };
                                  setFormData({ ...formData, advantages: { ...formData.advantages, [lang]: newList } });
                                }}
                                placeholder={isEn ? "Advantage Title" : "সুবিধার শিরোনাম"}
                                className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-lg px-3 py-2 text-[13px] focus:outline-hidden text-dash-text font-bold"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newList = (formData.advantages[lang] || []).filter((_, i) => i !== idx);
                                  setFormData({ ...formData, advantages: { ...formData.advantages, [lang]: newList } });
                                }}
                                className="p-1.5 hover:bg-brand-red/10 text-brand-red/80 hover:text-brand-red rounded-lg transition-colors cursor-pointer"
                              >
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                            <textarea
                              rows={2}
                              value={adv.desc || ""}
                              onChange={(e) => {
                                const newList = [...(formData.advantages[lang] || [])];
                                newList[idx] = { ...newList[idx], desc: e.target.value };
                                setFormData({ ...formData, advantages: { ...formData.advantages, [lang]: newList } });
                              }}
                              placeholder={isEn ? "Advantage Description..." : "সুবিধার বিবরণ..."}
                              className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-lg px-3 py-2 text-[13px] focus:outline-hidden text-dash-text font-semibold"
                            />
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => {
                            const newList = [...(formData.advantages?.[lang] || []), { title: "", desc: "" }];
                            setFormData({ ...formData, advantages: { ...formData.advantages, [lang]: newList } });
                          }}
                          className="w-full border border-dashed border-brand-red/40 text-brand-red hover:bg-brand-red/5 flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold cursor-pointer transition-all"
                        >
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          <span>{isEn ? "Add Advantage Card" : "নতুন সুবিধা যোগ করুন"}</span>
                        </button>
                      </div>
                    </div>

                    {/* 2. Technical Specifications Table */}
                    <div className="space-y-4">
                      <h4 className="text-[14px] font-extrabold uppercase tracking-widest text-brand-red border-b border-dash-border pb-1 select-none flex justify-between items-center">
                        <span>{isEn ? "Technical Specifications Table" : "কারিগরি বৈশিষ্ট্য সারণী"}</span>
                        <span className="text-[11px] text-dash-text-muted font-normal lowercase tracking-normal">
                          {isEn ? "displays in specs comparison grid" : "বৈশিষ্ট্য গ্রিডে প্রদর্শিত হবে"}
                        </span>
                      </h4>
                      
                      <div className="space-y-3">
                        {((formData.specsTable?.[lang]) || []).map((row, idx) => (
                          <div key={idx} className="grid grid-cols-12 gap-3 items-center bg-dash-hover-bg/10 border border-dash-border/60 rounded-xl p-3">
                            <div className="col-span-5">
                              <input
                                type="text"
                                value={row.name || ""}
                                onChange={(e) => {
                                  const newList = [...(formData.specsTable[lang] || [])];
                                  newList[idx] = { ...newList[idx], name: e.target.value };
                                  setFormData({ ...formData, specsTable: { ...formData.specsTable, [lang]: newList } });
                                }}
                                placeholder={isEn ? "Parameter Name (e.g. Frequency)" : "প্যারামিটারের নাম (যেমন: ফ্রিকোয়েন্সি)"}
                                className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-lg px-3 py-2 text-[13px] focus:outline-hidden text-dash-text font-bold"
                              />
                            </div>
                            <div className="col-span-6">
                              <input
                                type="text"
                                value={row.val || ""}
                                onChange={(e) => {
                                  const newList = [...(formData.specsTable[lang] || [])];
                                  newList[idx] = { ...newList[idx], val: e.target.value };
                                  setFormData({ ...formData, specsTable: { ...formData.specsTable, [lang]: newList } });
                                }}
                                placeholder={isEn ? "Value (e.g. 50 Hz)" : "মান (যেমন: ৫০ হার্জ)"}
                                className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-lg px-3 py-2 text-[13px] focus:outline-hidden text-dash-text font-semibold"
                              />
                            </div>
                            <div className="col-span-1 flex justify-center">
                              <button
                                type="button"
                                onClick={() => {
                                  const newList = (formData.specsTable[lang] || []).filter((_, i) => i !== idx);
                                  setFormData({ ...formData, specsTable: { ...formData.specsTable, [lang]: newList } });
                                }}
                                className="p-1.5 hover:bg-brand-red/10 text-brand-red/80 hover:text-brand-red rounded-lg transition-colors cursor-pointer"
                              >
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => {
                            const newList = [...(formData.specsTable?.[lang] || []), { name: "", val: "" }];
                            setFormData({ ...formData, specsTable: { ...formData.specsTable, [lang]: newList } });
                          }}
                          className="w-full border border-dashed border-brand-red/40 text-brand-red hover:bg-brand-red/5 flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold cursor-pointer transition-all"
                        >
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          <span>{isEn ? "Add Spec Row" : "নতুন বৈশিষ্ট্য রো যোগ করুন"}</span>
                        </button>
                      </div>
                    </div>

                    {/* 3. Applications List */}
                    <div className="space-y-4">
                      <h4 className="text-[14px] font-extrabold uppercase tracking-widest text-brand-red border-b border-dash-border pb-1 select-none">
                        {isEn ? "Applications" : "ব্যবহারক্ষেত্রসমূহ"}
                      </h4>
                      
                      <div className="space-y-3">
                        {((formData.applications?.[lang]) || []).map((app, idx) => (
                          <div key={idx} className="flex gap-3 items-center">
                            <input
                              type="text"
                              value={app || ""}
                              onChange={(e) => {
                                const newList = [...(formData.applications[lang] || [])];
                                newList[idx] = e.target.value;
                                setFormData({ ...formData, applications: { ...formData.applications, [lang]: newList } });
                              }}
                              placeholder={isEn ? "e.g. Industrial Processing Plants" : "যেমন: শিল্প ও কলকারখানা"}
                              className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-lg px-3 py-2 text-[13px] focus:outline-hidden text-dash-text font-semibold"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newList = (formData.applications[lang] || []).filter((_, i) => i !== idx);
                                setFormData({ ...formData, applications: { ...formData.applications, [lang]: newList } });
                              }}
                              className="p-1.5 hover:bg-brand-red/10 text-brand-red/80 hover:text-brand-red rounded-lg transition-colors cursor-pointer shrink-0"
                            >
                              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => {
                            const newList = [...(formData.applications?.[lang] || []), ""];
                            setFormData({ ...formData, applications: { ...formData.applications, [lang]: newList } });
                          }}
                          className="w-full border border-dashed border-brand-red/40 text-brand-red hover:bg-brand-red/5 flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold cursor-pointer transition-all"
                        >
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          <span>{isEn ? "Add Application Item" : "নতুন ক্ষেত্র যোগ করুন"}</span>
                        </button>
                      </div>
                    </div>

                    {/* 4. Accessories List */}
                    <div className="space-y-4">
                      <h4 className="text-[14px] font-extrabold uppercase tracking-widest text-brand-red border-b border-dash-border pb-1 select-none">
                        {isEn ? "Accessories & Fittings" : "আনুষঙ্গিক ও ফিটিংসসমূহ"}
                      </h4>
                      
                      <div className="space-y-3">
                        {((formData.accessories?.[lang]) || []).map((acc, idx) => (
                          <div key={idx} className="flex gap-3 items-center">
                            <input
                              type="text"
                              value={acc || ""}
                              onChange={(e) => {
                                const newList = [...(formData.accessories[lang] || [])];
                                newList[idx] = e.target.value;
                                setFormData({ ...formData, accessories: { ...formData.accessories, [lang]: newList } });
                              }}
                              placeholder={isEn ? "e.g. Pressure Relief Valve (PRV)" : "যেমন: প্রেসার রিলিফ ভালভ (PRV)"}
                              className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-lg px-3 py-2 text-[13px] focus:outline-hidden text-dash-text font-semibold"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newList = (formData.accessories[lang] || []).filter((_, i) => i !== idx);
                                setFormData({ ...formData, accessories: { ...formData.accessories, [lang]: newList } });
                              }}
                              className="p-1.5 hover:bg-brand-red/10 text-brand-red/80 hover:text-brand-red rounded-lg transition-colors cursor-pointer shrink-0"
                            >
                              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => {
                            const newList = [...(formData.accessories?.[lang] || []), ""];
                            setFormData({ ...formData, accessories: { ...formData.accessories, [lang]: newList } });
                          }}
                          className="w-full border border-dashed border-brand-red/40 text-brand-red hover:bg-brand-red/5 flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold cursor-pointer transition-all"
                        >
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          <span>{isEn ? "Add Accessory Item" : "নতুন আনুষঙ্গিক যোগ করুন"}</span>
                        </button>
                      </div>
                    </div>

                    {/* 5. Quality Testing Text */}
                    <div className="space-y-4">
                      <h4 className="text-[14px] font-extrabold uppercase tracking-widest text-brand-red border-b border-dash-border pb-1 select-none">
                        {isEn ? "Quality Testing Assurance" : "কোয়ালিটি টেস্টিং ও নিশ্চয়তা"}
                      </h4>
                      <div className="space-y-2">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                          {isEn ? "Testing Process Description" : "পরীক্ষণ প্রক্রিয়া ও বিবরণের বিবরণ"}
                        </label>
                        <textarea
                          rows={3}
                          value={formData.qualityText?.[lang] || ""}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            qualityText: { ...formData.qualityText, [lang]: e.target.value } 
                          })}
                          placeholder={isEn ? "Describe factory routine tests performed in compliance with standards..." : "ফ্যাক্টরিতে অনুষ্ঠিত রুটিন টেস্টসমূহের বিবরণ..."}
                          className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                        />
                      </div>
                    </div>

                    {/* 6. Call To Action (CTA) details */}
                    <div className="space-y-4">
                      <h4 className="text-[14px] font-extrabold uppercase tracking-widest text-brand-red border-b border-dash-border pb-1 select-none">
                        {isEn ? "Call-To-Action (CTA) Section" : "কল-টু-অ্যাকশন (CTA) বিভাগ"}
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                            {isEn ? "CTA Headline" : "হেডলাইন"}
                          </label>
                          <input
                            type="text"
                            value={formData.ctaTitle?.[lang] || ""}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              ctaTitle: { ...formData.ctaTitle, [lang]: e.target.value } 
                            })}
                            placeholder={isEn ? "e.g. Need a custom transformer?" : "যেমন: আপনার কি কাস্টম ট্রান্সফরমার প্রয়োজন?"}
                            className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                            {isEn ? "CTA Button Label" : "বাটনের লেখা"}
                          </label>
                          <input
                            type="text"
                            value={formData.ctaBtn?.[lang] || ""}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              ctaBtn: { ...formData.ctaBtn, [lang]: e.target.value } 
                            })}
                            placeholder={isEn ? "Request a Technical Quote" : "কারিগরি কোটেশনের অনুরোধ"}
                            className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                          {isEn ? "CTA Description Text" : "বর্ণনা"}
                        </label>
                        <textarea
                          rows={2}
                          value={formData.ctaText?.[lang] || ""}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            ctaText: { ...formData.ctaText, [lang]: e.target.value } 
                          })}
                          placeholder={isEn ? "Let our engineering team design a solution..." : "আমাদের অভিজ্ঞ টিম উপযুক্ত সমাধান তৈরি করতে প্রস্তুত..."}
                          className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-dash-border shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-xl text-[14px] font-bold text-dash-text-muted hover:text-dash-text bg-dash-hover-bg hover:bg-dash-hover-bg/80 border border-dash-border transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-[14px] font-bold text-white bg-brand-red hover:bg-brand-red-hover shadow-xl shadow-brand-red/10 active:scale-98 transition-colors cursor-pointer"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Media Library Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(url) => setFormData((prev) => ({ ...prev, imagePath: url }))}
        allowedTypes="images"
      />

    </div>
  );
}
