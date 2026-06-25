"use client";

import { useState, useEffect } from "react";
import { useDashboard } from "@/context/DashboardContext";
import Image from "next/image";
import MediaPickerModal from "@/components/spl-dashboard/MediaPickerModal";

interface Certificate {
  id: string;
  titleEn: string;
  titleBn: string;
  authorityEn: string;
  authorityBn: string;
  descEn: string;
  descBn: string;
  image: string;
  orderIndex: number;
}

/**
 * DashboardCertificates Component.
 * Admin interface to manage the company certifications and compliance documents.
 * Supports CRUD, ordering, bilingual translation metadata,
 * choosing scans from the Media Library, and dynamic synchronization.
 */
export default function DashboardCertificates() {
  const { theme } = useDashboard();
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [saving, setSaving] = useState(false);

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "en" | "bn">("general");

  // Form State
  const initialFormState = {
    id: "",
    titleEn: "",
    titleBn: "",
    authorityEn: "",
    authorityBn: "",
    descEn: "",
    descBn: "",
    image: "",
    orderIndex: 0,
  };
  const [formData, setFormData] = useState<Certificate>(initialFormState);

  const fetchCertificates = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/spl-dashboard/certificates");
      if (res.ok) {
        const data = await res.json();
        setCerts(data);
      } else {
        const errData = await res.json();
        setErrorMsg(errData.error || "Failed to load certificates.");
      }
    } catch (err) {
      setErrorMsg("Network error loading certificates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const openAddModal = () => {
    setEditingCert(null);
    setFormData(initialFormState);
    setActiveTab("general");
    setIsModalOpen(true);
  };

  const openEditModal = (cert: Certificate) => {
    setEditingCert(cert);
    setFormData({ ...cert });
    setActiveTab("general");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.titleEn || !formData.authorityEn) {
      alert("Certificate ID, English Title, and English Authority are required.");
      return;
    }

    setSaving(true);
    try {
      const method = editingCert ? "PUT" : "POST";
      const res = await fetch("/api/spl-dashboard/certificates", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showToast(editingCert ? "Certificate updated successfully!" : "Certificate created successfully!");
        setIsModalOpen(false);
        fetchCertificates();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to save certificate.");
      }
    } catch (err) {
      alert("Network error saving certificate.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this certificate?")) return;

    try {
      const res = await fetch(`/api/spl-dashboard/certificates?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showToast("Certificate deleted successfully!");
        fetchCertificates();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to delete certificate.");
      }
    } catch (err) {
      alert("Network error deleting certificate.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-dash-text select-none">
      
      {/* Header Panel */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[24px] font-extrabold tracking-wide">Certificates & Compliance Manager</h2>
          <p className="text-[14px] text-dash-text-muted mt-1">
            Manage international certifications, licenses, and testing approvals shown on the About Us page.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-brand-red hover:bg-brand-red-hover text-white text-[14px] font-bold px-5 py-3 rounded-xl shadow-lg shadow-brand-red/10 transition-all active:scale-98 cursor-pointer flex items-center gap-2"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add Certificate</span>
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-500/10 text-red-500 rounded-xl text-[13px] font-semibold border border-red-500/20">
          {errorMsg}
        </div>
      )}

      {/* Grid of Certificates */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-dash-card-bg border border-dash-border rounded-3xl">
          <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
          <p className="text-[13px] text-dash-text-muted mt-3 font-semibold">Loading certificates...</p>
        </div>
      ) : certs.length === 0 ? (
        <div className="py-20 text-center bg-dash-card-bg border border-dash-border rounded-3xl text-dash-text-muted font-medium">
          No certificates added yet. Click "Add Certificate" to begin.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert) => (
            <div
              key={cert.id}
              className="bg-dash-card-bg border border-dash-border rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col h-full"
            >
              {/* Scan image or placeholder preview */}
              <div className="relative aspect-video w-full bg-dash-hover-bg overflow-hidden flex items-center justify-center border-b border-dash-border">
                {cert.image ? (
                  <Image
                    src={cert.image}
                    alt={cert.titleEn}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full border-2 border-dashed border-neutral-200 bg-neutral-50/50 flex flex-col items-center justify-center text-center p-4">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-neutral-300 mb-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="text-[11px] font-bold text-neutral-500">Placeholder (No Scan File)</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-black/60 text-white text-[11px] font-bold px-2.5 py-1 rounded-md z-20 backdrop-blur-xs select-none">
                  Order Index: {cert.orderIndex}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white z-20 space-y-0.5">
                  <span className="text-[9px] uppercase font-extrabold tracking-wider bg-brand-red/90 px-1.5 py-0.5 rounded-sm">
                    {cert.id}
                  </span>
                  <h3 className="font-kanit text-[15px] font-bold line-clamp-1 drop-shadow-md">{cert.titleEn}</h3>
                </div>
              </div>

              {/* Text Meta data */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-[13px]">
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-dash-text-muted uppercase block">Authority (EN)</label>
                    <p className="font-bold text-dash-text mt-0.5 line-clamp-1">{cert.authorityEn}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-dash-text-muted uppercase block">Authority (BN)</label>
                    <p className="font-bold text-dash-text mt-0.5 line-clamp-1">{cert.authorityBn || "—"}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-dash-text-muted uppercase block">Description (EN)</label>
                    <p className="text-dash-text-muted mt-0.5 line-clamp-2 leading-relaxed">{cert.descEn || "—"}</p>
                  </div>
                </div>

                {/* Actions row */}
                <div className="flex gap-2.5 pt-4 border-t border-dash-border">
                  <button
                    onClick={() => openEditModal(cert)}
                    className="flex-1 bg-dash-hover-bg hover:bg-dash-hover-bg/85 border border-dash-border text-dash-text text-[13px] font-bold py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <span>Edit Details</span>
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id)}
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

      {/* CRUD Edit/Add Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 select-none">
          <div className="bg-dash-card-bg border border-dash-border rounded-3xl w-full max-w-2xl h-[90vh] md:h-auto md:max-h-[85vh] flex flex-col shadow-2xl animate-scale-up">
            
            {/* Modal header */}
            <div className="p-6 border-b border-dash-border flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-[18px] font-extrabold text-dash-text">
                  {editingCert ? `Edit Certificate: ${editingCert.id}` : "Add New Certificate"}
                </h3>
                <p className="text-[12px] text-dash-text-muted mt-0.5">
                  Ensure bilingual details match the requirements of the translation engine.
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

            {/* Language tabs */}
            <div className="flex bg-dash-hover-bg/30 px-6 border-b border-dash-border shrink-0 gap-1.5 py-2">
              {[
                { id: "general", label: "General Settings" },
                { id: "en", label: "English Details" },
                { id: "bn", label: "Bangla Details" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={[
                    "px-4 py-2 text-[13px] font-bold rounded-lg cursor-pointer transition-all",
                    activeTab === tab.id
                      ? "bg-dash-card-bg text-dash-text border border-dash-border shadow-xs"
                      : "text-dash-text-muted hover:text-dash-text hover:bg-dash-hover-bg/45",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Form content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Tab 1: General configurations */}
              {activeTab === "general" && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Certificate ID / slug */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Certificate Unique Identifier (ID / Slug)
                    </label>
                    <input
                      type="text"
                      required
                      disabled={!!editingCert}
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/[^a-z0-9-_]+/g, "-") })}
                      placeholder="e.g. bsti-approval, iso-9001"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold disabled:opacity-50"
                    />
                    {!editingCert && (
                      <span className="text-[10px] text-dash-text-muted font-medium">
                        Must be lowercase, hyphens, alphanumeric only. This matches database relations.
                      </span>
                    )}
                  </div>

                  {/* Scan image selection */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Certificate Scan File / Image
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="w-24 h-24 bg-dash-hover-bg border border-dash-border rounded-xl overflow-hidden shrink-0 flex items-center justify-center relative">
                        {formData.image ? (
                          <img
                            src={formData.image}
                            alt="Scan Preview"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-[10px] text-dash-text-muted uppercase font-extrabold text-center px-1">No Image</span>
                        )}
                      </div>

                      <div className="flex-1 space-y-2.5">
                        <input
                          type="text"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="Paste image URL or pick file"
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

                  {/* Display Order Index */}
                  <div className="space-y-2 w-1/2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Display Order Rank (ASC Sorting)
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.orderIndex}
                      onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value, 10) || 0 })}
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                </div>
              )}

              {/* Tab 2: English details */}
              {activeTab === "en" && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Title (EN) */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Certificate Name / Title (English)
                    </label>
                    <input
                      type="text"
                      required={activeTab === "en"}
                      value={formData.titleEn}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      placeholder="e.g. ISO 9001:2015 Certification"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  {/* Authority (EN) */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Issuing Body / Authority (English)
                    </label>
                    <input
                      type="text"
                      required={activeTab === "en"}
                      value={formData.authorityEn}
                      onChange={(e) => setFormData({ ...formData, authorityEn: e.target.value })}
                      placeholder="e.g. International Quality Standards"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  {/* Description (EN) */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Compliance Description (English)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.descEn}
                      onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
                      placeholder="Enter description explaining standards met, design procedures, quality controls..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-none"
                    />
                  </div>

                </div>
              )}

              {/* Tab 3: Bangla details */}
              {activeTab === "bn" && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Title (BN) */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Certificate Name / Title (Bangla)
                    </label>
                    <input
                      type="text"
                      value={formData.titleBn}
                      onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                      placeholder="যেমন: ISO 9001:2015 সার্টিফিকেশন"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  {/* Authority (BN) */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Issuing Body / Authority (Bangla)
                    </label>
                    <input
                      type="text"
                      value={formData.authorityBn}
                      onChange={(e) => setFormData({ ...formData, authorityBn: e.target.value })}
                      placeholder="যেমন: আন্তর্জাতিক কোয়ালিটি স্ট্যান্ডার্ড"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  {/* Description (BN) */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Compliance Description (Bangla)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.descBn}
                      onChange={(e) => setFormData({ ...formData, descBn: e.target.value })}
                      placeholder="বাংলায় সার্টিফিকেটের বর্ণনা যোগ করুন..."
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
                  disabled={saving}
                  className="px-6 py-3 rounded-xl text-[14px] font-bold text-white bg-brand-red hover:bg-brand-red-hover shadow-xl shadow-brand-red/10 active:scale-98 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {saving && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  <span>{editingCert ? "Save Certificate" : "Create Certificate"}</span>
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
        onSelect={(url) => setFormData((prev) => ({ ...prev, image: url }))}
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
