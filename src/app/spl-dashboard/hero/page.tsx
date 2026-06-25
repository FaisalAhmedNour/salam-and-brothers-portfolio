"use client";

import { useState, useEffect } from "react";
import { useDashboard } from "@/context/DashboardContext";
import Image from "next/image";
import MediaPickerModal from "@/components/spl-dashboard/MediaPickerModal";

interface HeroSlide {
  id: string | number;
  imagePath: string;
  badge: { en: string; bn: string };
  title: { en: string; bn: string };
  description: { en: string; bn: string };
  orderIndex: number;
}

/**
 * DashboardHeroSlides Component.
 * Admin interface to manage the homepage Hero section slideshow items.
 * Supports slide ordering, preview cards, editing bilingual text metadata,
 * choosing slide backgrounds from the Media Library, and deleting slides.
 */
export default function DashboardHeroSlides() {
  const { theme } = useDashboard();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "en" | "bn">("general");

  // Form State
  const initialFormState = {
    imagePath: "",
    badge: { en: "", bn: "" },
    title: { en: "", bn: "" },
    description: { en: "", bn: "" },
    orderIndex: 0,
  };
  const [formData, setFormData] = useState<Omit<HeroSlide, "id">>(initialFormState);

  const fetchSlides = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/spl-dashboard/hero");
      if (res.ok) {
        const data = await res.json();
        setSlides(data);
      } else {
        const errData = await res.json();
        setErrorMsg(errData.error || "Failed to load Hero slides.");
      }
    } catch (err) {
      setErrorMsg("Network error loading slides.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const openAddModal = () => {
    setEditingSlide(null);
    setFormData(initialFormState);
    setActiveTab("general");
    setIsModalOpen(true);
  };

  const openEditModal = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      imagePath: slide.imagePath,
      badge: { ...slide.badge },
      title: { ...slide.title },
      description: { ...slide.description },
      orderIndex: slide.orderIndex,
    });
    setActiveTab("general");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imagePath || !formData.title.en) {
      alert("Background image and English title are required.");
      return;
    }

    const payload = editingSlide
      ? { id: editingSlide.id, ...formData }
      : formData;

    const url = "/api/spl-dashboard/hero";
    const method = editingSlide ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchSlides();
        showToast(editingSlide ? "Slide updated successfully!" : "Slide created successfully!");
      } else {
        const errData = await res.json();
        alert(errData.error || "Action failed.");
      }
    } catch (err) {
      alert("Network error processing request.");
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to permanently delete this slide?")) {
      return;
    }

    try {
      const res = await fetch(`/api/spl-dashboard/hero?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSlides((prev) => prev.filter((s) => s.id !== id));
        showToast("Slide deleted successfully.");
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to delete slide.");
      }
    } catch (err) {
      alert("Network error deleting slide.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-dash-text">
      
      {/* Header Panel */}
      <div className="flex justify-between items-center select-none">
        <div>
          <h2 className="text-[24px] font-extrabold tracking-wide">Hero Slideshow Settings</h2>
          <p className="text-[14px] text-dash-text-muted mt-1">
            Configure background images, badge labels, and text descriptions for the homepage slideshow.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-brand-red hover:bg-brand-red-hover text-white text-[14px] font-bold px-5 py-3 rounded-xl shadow-lg shadow-brand-red/10 transition-all active:scale-98 cursor-pointer flex items-center gap-2"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add Slide</span>
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-500/10 text-red-500 rounded-xl text-[13px] font-semibold border border-red-500/20">
          {errorMsg}
        </div>
      )}

      {/* Slide Grid cards list */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-dash-card-bg border border-dash-border rounded-3xl">
          <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
          <p className="text-[13px] text-dash-text-muted mt-3 font-semibold">Loading slideshow slides...</p>
        </div>
      ) : slides.length === 0 ? (
        <div className="py-20 text-center bg-dash-card-bg border border-dash-border rounded-3xl text-dash-text-muted font-medium select-none">
          No slides added. Click "Add Slide" to begin.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="bg-dash-card-bg border border-dash-border rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col h-full"
            >
              {/* Image Preview Banner Container */}
              <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden flex items-center justify-center border-b border-dash-border">
                <Image
                  src={slide.imagePath}
                  alt={slide.title.en}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute top-4 right-4 bg-black/60 text-white text-[11px] font-bold px-2.5 py-1 rounded-md z-20 backdrop-blur-xs select-none">
                  Order Index: {slide.orderIndex}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white z-20 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-brand-red/90 px-2 py-0.5 rounded-sm">
                    {slide.badge.en || "SPL"}
                  </span>
                  <h3 className="font-kanit text-[15px] font-bold line-clamp-1">{slide.title.en}</h3>
                </div>
              </div>

              {/* Text metadata block */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-[13px]">
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-dash-text-muted uppercase block">Title (EN)</label>
                    <p className="font-bold text-dash-text mt-0.5 line-clamp-1">{slide.title.en}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-dash-text-muted uppercase block">Title (BN)</label>
                    <p className="font-bold text-dash-text mt-0.5 line-clamp-1">{slide.title.bn || "—"}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-dash-text-muted uppercase block">Description (EN)</label>
                    <p className="text-dash-text-muted mt-0.5 line-clamp-2">{slide.description.en || "—"}</p>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex gap-2.5 pt-4 border-t border-dash-border">
                  <button
                    onClick={() => openEditModal(slide)}
                    className="flex-1 bg-dash-hover-bg hover:bg-dash-hover-bg/85 border border-dash-border text-dash-text text-[13px] font-bold py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <span>Edit Slide</span>
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/15 p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                    title="Delete permanently"
                  >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sliding Dialog Editor Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
          <div className="w-full max-w-2xl bg-dash-card-bg border border-dash-border rounded-3xl flex flex-col overflow-hidden shadow-2xl animate-scale-in max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="h-16 border-b border-dash-border px-6 flex items-center justify-between bg-dash-bg/50 shrink-0">
              <h3 className="text-[16px] font-extrabold tracking-wide">
                {editingSlide ? "Edit Hero Slide" : "Add Hero Slide"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-dash-text-muted hover:text-dash-text cursor-pointer p-1.5 hover:bg-dash-hover-bg rounded-lg transition-colors"
              >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Tabs list */}
            <div className="flex border-b border-dash-border px-6 gap-6 shrink-0 bg-dash-bg/25">
              {[
                { id: "general", label: "General Specs" },
                { id: "en", label: "English Copy" },
                { id: "bn", label: "Bengali Copy" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-[13px] font-extrabold pb-3 pt-3 border-b-2 cursor-pointer transition-all ${
                    activeTab === tab.id
                      ? "border-brand-red text-brand-red"
                      : "border-transparent text-dash-text-muted hover:text-dash-text"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Form content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Tab 1: General configuration */}
              {activeTab === "general" && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Background Image picker */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Background Banner Image
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="w-24 h-24 bg-dash-hover-bg border border-dash-border rounded-xl overflow-hidden shrink-0 flex items-center justify-center relative">
                        {formData.imagePath ? (
                          <img
                            src={formData.imagePath}
                            alt="Background Preview"
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
                          value={formData.imagePath}
                          onChange={(e) => setFormData({ ...formData, imagePath: e.target.value })}
                          placeholder="Or paste background image URL manually"
                          className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[13px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
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

                  {/* Sequence OrderIndex */}
                  <div className="space-y-2 w-1/2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Display Order Index
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.orderIndex}
                      onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value, 10) || 0 })}
                      placeholder="e.g. 0"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text font-semibold"
                    />
                    <span className="text-[11px] text-dash-text-muted font-medium mt-1 block">
                      Controls sequence ranking. Lower numbers display first in the loop.
                    </span>
                  </div>

                </div>
              )}

              {/* Tab 2: English copy details */}
              {activeTab === "en" && (
                <div className="space-y-5 animate-fade-in">
                  
                  {/* Badge English */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Upper Tagline Badge (EN)
                    </label>
                    <input
                      type="text"
                      value={formData.badge.en}
                      onChange={(e) => setFormData({ ...formData, badge: { ...formData.badge, en: e.target.value } })}
                      placeholder="e.g. High Efficiency & High Performance"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  {/* Title English */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Main Heading Title (EN)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title.en}
                      onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
                      placeholder="e.g. Power & Distribution Transformers"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  {/* Description English */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Explanatory Description (EN)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description.en}
                      onChange={(e) => setFormData({ ...formData, description: { ...formData.description, en: e.target.value } })}
                      placeholder="e.g. We provide quality with years of experience and our expert team..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                </div>
              )}

              {/* Tab 3: Bengali copy details */}
              {activeTab === "bn" && (
                <div className="space-y-5 animate-fade-in">
                  
                  {/* Badge Bengali */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Upper Tagline Badge (BN)
                    </label>
                    <input
                      type="text"
                      value={formData.badge.bn}
                      onChange={(e) => setFormData({ ...formData, badge: { ...formData.badge, bn: e.target.value } })}
                      placeholder="যেমন: উচ্চ দক্ষতা ও উচ্চ কার্যক্ষমতা"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  {/* Title Bengali */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Main Heading Title (BN)
                    </label>
                    <input
                      type="text"
                      value={formData.title.bn}
                      onChange={(e) => setFormData({ ...formData, title: { ...formData.title, bn: e.target.value } })}
                      placeholder="যেমন: পাওয়ার ও ডিস্ট্রিবিউশন ট্রান্সফরমার"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  {/* Description Bengali */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Explanatory Description (BN)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description.bn}
                      onChange={(e) => setFormData({ ...formData, description: { ...formData.description, bn: e.target.value } })}
                      placeholder="যেমন: আমরা দীর্ঘ বছরের অভিজ্ঞতা এবং আমাদের বিশেষজ্ঞ দলের সাথে মানসম্পন্ন সেবা প্রদান করি..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
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
                  className="px-6 py-3 rounded-xl text-[14px] font-bold text-white bg-brand-red hover:bg-brand-red-hover shadow-xl shadow-brand-red/10 active:scale-98 transition-colors cursor-pointer"
                >
                  {editingSlide ? "Save Slide" : "Create Slide"}
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
        onSelect={(url) => setFormData((prev) => ({ ...prev, imagePath: url }))}
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
