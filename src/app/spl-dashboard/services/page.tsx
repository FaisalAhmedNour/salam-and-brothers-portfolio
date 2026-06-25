"use client";

import { useState, useEffect } from "react";
import { useDashboard } from "@/context/DashboardContext";
import Image from "next/image";
import MediaPickerModal from "@/components/spl-dashboard/MediaPickerModal";

interface ServiceItem {
  id: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  orderIndex: number;
}

interface PageSettings {
  headlineEn: string;
  headlineBn: string;
  subtitleEn: string;
  subtitleBn: string;
  imagePath: string;
}

/**
 * DashboardServices Component.
 * Admin dashboard page for managing Services & Maintenance list items and layout settings.
 * Supports CRUD, ordering, layout adjustments, and choosing assets via the Media Library picker.
 */
export default function DashboardServices() {
  const { theme } = useDashboard();
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [settings, setSettings] = useState<PageSettings>({
    headlineEn: "",
    headlineBn: "",
    subtitleEn: "",
    subtitleBn: "",
    imagePath: "",
  });
  
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [savingItem, setSavingItem] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  // Tab state (Top-level tabs: "items" vs "layout")
  const [currentSection, setCurrentSection] = useState<"items" | "layout">("items");

  // Modal control states for items CRUD
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [activeFormTab, setActiveFormTab] = useState<"general" | "en" | "bn">("general");

  // Media Library Picker state
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  // Service item Form State
  const initialFormState = {
    id: "",
    titleEn: "",
    titleBn: "",
    descEn: "",
    descBn: "",
    orderIndex: 0,
  };
  const [formData, setFormData] = useState<ServiceItem>(initialFormState);

  const fetchServicesData = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/spl-dashboard/services");
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        setSettings(data.settings || {
          headlineEn: "",
          headlineBn: "",
          subtitleEn: "",
          subtitleBn: "",
          imagePath: "",
        });
      } else {
        const errData = await res.json();
        setErrorMsg(errData.error || "Failed to load services data.");
      }
    } catch (err) {
      setErrorMsg("Network error loading services data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicesData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData(initialFormState);
    setActiveFormTab("general");
    setIsModalOpen(true);
  };

  const openEditModal = (item: ServiceItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setActiveFormTab("general");
    setIsModalOpen(true);
  };

  const handleItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.titleEn) {
      alert("Service Item ID and English Title are required.");
      return;
    }

    setSavingItem(true);
    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/spl-dashboard/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showToast(editingItem ? "Service item updated successfully!" : "Service item created successfully!");
        setIsModalOpen(false);
        fetchServicesData();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to save service item.");
      }
    } catch (err) {
      alert("Network error saving service item.");
    } finally {
      setSavingItem(false);
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await fetch("/api/spl-dashboard/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "settings",
          settings,
        }),
      });

      if (res.ok) {
        showToast("Services page settings updated successfully!");
        fetchServicesData();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to update page settings.");
      }
    } catch (err) {
      alert("Network error updating page settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this service checklist item?")) return;

    try {
      const res = await fetch(`/api/spl-dashboard/services?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showToast("Service checklist item deleted successfully!");
        fetchServicesData();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to delete service item.");
      }
    } catch (err) {
      alert("Network error deleting service item.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-dash-text select-none">
      
      {/* Header Panel */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[24px] font-extrabold tracking-wide">Services & Maintenance Manager</h2>
          <p className="text-[14px] text-dash-text-muted mt-1">
            Manage page layout, titles, illustration media, and the interactive checklist of electrical services.
          </p>
        </div>
        {currentSection === "items" && (
          <button
            onClick={openAddModal}
            className="bg-brand-red hover:bg-brand-red-hover text-white text-[14px] font-bold px-5 py-3 rounded-xl shadow-lg shadow-brand-red/10 transition-all active:scale-98 cursor-pointer flex items-center gap-2"
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Add Checklist Item</span>
          </button>
        )}
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-500/10 text-red-500 rounded-xl text-[13px] font-semibold border border-red-500/20">
          {errorMsg}
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex gap-4 border-b border-dash-border pb-3 shrink-0">
        <button
          onClick={() => setCurrentSection("items")}
          className={[
            "pb-2 text-[14px] font-bold border-b-2 transition-all cursor-pointer",
            currentSection === "items"
              ? "border-brand-red text-dash-text"
              : "border-transparent text-dash-text-muted hover:text-dash-text"
          ].join(" ")}
        >
          Checklist Items ({items.length})
        </button>
        <button
          onClick={() => setCurrentSection("layout")}
          className={[
            "pb-2 text-[14px] font-bold border-b-2 transition-all cursor-pointer",
            currentSection === "layout"
              ? "border-brand-red text-dash-text"
              : "border-transparent text-dash-text-muted hover:text-dash-text"
          ].join(" ")}
        >
          Page Layout Settings
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-dash-card-bg border border-dash-border rounded-3xl">
          <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
          <p className="text-[13px] text-dash-text-muted mt-3 font-semibold">Loading data...</p>
        </div>
      ) : currentSection === "items" ? (
        /* Section 1: Checklist Items Grid */
        items.length === 0 ? (
          <div className="py-20 text-center bg-dash-card-bg border border-dash-border rounded-3xl text-dash-text-muted font-medium">
            No service checklist items found. Click "Add Checklist Item" to begin.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-dash-card-bg border border-dash-border rounded-3xl p-5 hover:shadow-md transition-all duration-300 group flex flex-col justify-between h-full text-[13px]"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-brand-red">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </span>
                    <div>
                      <h4 className="font-kanit text-[15px] font-bold text-dash-text group-hover:text-brand-red transition-colors duration-200 line-clamp-1">
                        {item.titleEn}
                      </h4>
                      <span className="text-[9px] uppercase font-extrabold tracking-wider bg-dash-hover-bg px-1.5 py-0.5 rounded-sm text-dash-text-muted">
                        Index: {item.orderIndex} ({item.id})
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 border-t border-dash-border pt-3">
                    <div>
                      <label className="text-[9px] font-bold text-dash-text-muted uppercase block">Title (BN)</label>
                      <p className="font-bold text-dash-text mt-0.5 line-clamp-1">{item.titleBn || "—"}</p>
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-dash-text-muted uppercase block">Description (EN)</label>
                      <p className="text-dash-text-muted mt-0.5 line-clamp-2 leading-relaxed">{item.descEn || "—"}</p>
                    </div>
                  </div>
                </div>

                {/* Actions row */}
                <div className="flex gap-2.5 pt-4 border-t border-dash-border mt-4">
                  <button
                    onClick={() => openEditModal(item)}
                    className="flex-1 bg-dash-hover-bg hover:bg-dash-hover-bg/85 border border-dash-border text-dash-text text-[13px] font-bold py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <span>Edit Details</span>
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/15 p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                    title="Delete permanently"
                  >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Section 2: Page Layout Settings Form */
        <form onSubmit={handleSettingsSubmit} className="bg-dash-card-bg border border-dash-border rounded-3xl p-6 space-y-6 max-w-3xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Headline EN */}
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                Page Headline (English)
              </label>
              <input
                type="text"
                required
                value={settings.headlineEn}
                onChange={(e) => setSettings({ ...settings, headlineEn: e.target.value })}
                className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text font-semibold"
              />
            </div>

            {/* Headline BN */}
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                Page Headline (Bangla)
              </label>
              <input
                type="text"
                required
                value={settings.headlineBn}
                onChange={(e) => setSettings({ ...settings, headlineBn: e.target.value })}
                className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subtitle EN */}
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                Page Subtitle / Description (English)
              </label>
              <textarea
                rows={4}
                required
                value={settings.subtitleEn}
                onChange={(e) => setSettings({ ...settings, subtitleEn: e.target.value })}
                className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text font-semibold resize-none"
              />
            </div>

            {/* Subtitle BN */}
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                Page Subtitle / Description (Bangla)
              </label>
              <textarea
                rows={4}
                required
                value={settings.subtitleBn}
                onChange={(e) => setSettings({ ...settings, subtitleBn: e.target.value })}
                className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text font-semibold resize-none"
              />
            </div>
          </div>

          {/* Illustration image selector */}
          <div className="space-y-3 pt-2">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
              Page Illustration / Side Image
            </label>
            <div className="flex gap-4 items-center">
              <div className="w-32 h-24 bg-dash-hover-bg border border-dash-border rounded-xl overflow-hidden shrink-0 flex items-center justify-center relative">
                {settings.imagePath ? (
                  <img
                    src={settings.imagePath}
                    alt="Layout Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-[10px] text-dash-text-muted uppercase font-extrabold text-center px-1">No Image</span>
                )}
              </div>

              <div className="flex-1 space-y-2.5">
                <input
                  type="text"
                  required
                  value={settings.imagePath}
                  onChange={(e) => setSettings({ ...settings, imagePath: e.target.value })}
                  placeholder="Paste side image URL"
                  className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[13px] focus:outline-hidden text-dash-text font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setIsMediaPickerOpen(true)}
                  className="bg-brand-red hover:bg-brand-red-hover text-white text-[12px] font-bold px-4 py-2 rounded-lg shadow-md cursor-pointer transition-all active:scale-[0.97]"
                >
                  Choose from Media Library
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-dash-border">
            <button
              type="submit"
              disabled={savingSettings}
              className="bg-brand-red hover:bg-brand-red-hover text-white text-[14px] font-bold px-6 py-3 rounded-xl shadow-lg shadow-brand-red/10 active:scale-98 transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
            >
              {savingSettings && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              <span>Save Layout Settings</span>
            </button>
          </div>

        </form>
      )}

      {/* CRUD dialog popup modal for Checklist Items */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 select-none animate-fade-in">
          <div className="bg-dash-card-bg border border-dash-border rounded-3xl w-full max-w-2xl h-[90vh] md:h-auto md:max-h-[85vh] flex flex-col shadow-2xl animate-scale-up">
            
            {/* Modal header */}
            <div className="p-6 border-b border-dash-border flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-[18px] font-extrabold text-dash-text">
                  {editingItem ? `Edit Service Item: ${editingItem.id}` : "Add New Service Item"}
                </h3>
                <p className="text-[12px] text-dash-text-muted mt-0.5">
                  Configure titles, descriptions, and sort positioning.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-dash-text-muted hover:text-dash-text p-1.5 hover:bg-dash-hover-bg rounded-lg transition-colors cursor-pointer"
              >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Bilingual tabs */}
            <div className="flex bg-dash-hover-bg/30 px-6 border-b border-dash-border shrink-0 gap-1.5 py-2">
              {[
                { id: "general", label: "General Settings" },
                { id: "en", label: "English Details" },
                { id: "bn", label: "Bangla Details" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFormTab(tab.id as any)}
                  className={[
                    "px-4 py-2 text-[13px] font-bold rounded-lg cursor-pointer transition-all",
                    activeFormTab === tab.id
                      ? "bg-dash-card-bg text-dash-text border border-dash-border shadow-xs"
                      : "text-dash-text-muted hover:text-dash-text hover:bg-dash-hover-bg/45",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Form content */}
            <form onSubmit={handleItemSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Tab 1: General configuration */}
              {activeFormTab === "general" && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Service ID / slug */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Service Unique ID (Slug)
                    </label>
                    <input
                      type="text"
                      required
                      disabled={!!editingItem}
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/[^a-z0-9-_]+/g, "-") })}
                      placeholder="e.g. vacuum-degassing, transformer-testing"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold disabled:opacity-50"
                    />
                    {!editingItem && (
                      <span className="text-[10px] text-dash-text-muted font-medium">
                        Unique slug representing the service key. Alphanumeric, hyphens and lowercase only.
                      </span>
                    )}
                  </div>

                  {/* Display Order Index */}
                  <div className="space-y-2 w-1/2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Display Position Order Index (ASC)
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.orderIndex}
                      onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value, 10) || 0 })}
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text font-semibold"
                    />
                  </div>

                </div>
              )}

              {/* Tab 2: English details */}
              {activeFormTab === "en" && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Title (EN) */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Service Title (English)
                    </label>
                    <input
                      type="text"
                      required={activeFormTab === "en"}
                      value={formData.titleEn}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      placeholder="e.g. Vacuum Oil Processing & Filling"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  {/* Description (EN) */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Service Summary / Description (English)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.descEn}
                      onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
                      placeholder="Enter short outline summarizing the service scope..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-none"
                    />
                  </div>

                </div>
              )}

              {/* Tab 3: Bangla details */}
              {activeFormTab === "bn" && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Title (BN) */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Service Title (Bangla)
                    </label>
                    <input
                      type="text"
                      value={formData.titleBn}
                      onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                      placeholder="যেমন: ভ্যাকুয়াম অয়েল প্রসেসিং এবং ফিলিং"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  {/* Description (BN) */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Service Summary / Description (Bangla)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.descBn}
                      onChange={(e) => setFormData({ ...formData, descBn: e.target.value })}
                      placeholder="বাংলায় সংক্ষিপ্ত বর্ণনা যোগ করুন..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-none"
                    />
                  </div>

                </div>
              )}

              {/* Action controls footer */}
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
                  disabled={savingItem}
                  className="px-6 py-3 rounded-xl text-[14px] font-bold text-white bg-brand-red hover:bg-brand-red-hover shadow-xl shadow-brand-red/10 active:scale-98 transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  {savingItem && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  <span>{editingItem ? "Save Checklist Item" : "Create Checklist Item"}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Floating Media Picker Selector modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(url) => setSettings((prev) => ({ ...prev, imagePath: url }))}
        allowedTypes="images"
      />

      {/* Float Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-neutral-900 border border-neutral-800 text-white px-5 py-3 rounded-2xl shadow-xl shadow-black/30 z-50 animate-slide-up flex items-center gap-2 select-none">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 text-emerald-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[13px] font-bold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
