"use client";

import { useState } from "react";
import { useDashboard, Notice, NoticeFile } from "@/context/DashboardContext";

/**
 * DashboardNotices Component.
 * Implements notices and announcements publishing portal.
 * Admin can manage references, signatories, content EN/BN, and upload PDFs.
 */
export default function DashboardNotices() {
  const { notices, addNotice, editNotice, deleteNotice } = useDashboard();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "en" | "bn" | "attachments">("general");

  // Upload states
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const initialNoticeState = {
    refNo: "",
    publishDate: new Date().toISOString().split("T")[0],
    category: "tender" as any,
    titleEn: "",
    titleBn: "",
    contentEn: "",
    contentBn: "",
    files: [] as NoticeFile[],
    signatoryEn: "Engr. Monirul Islam",
    signatoryBn: "ইঞ্জি. মনিরুল ইসলাম",
    designationEn: "Head of Procurement Division, SPL",
    designationBn: "প্রধান, ক্রয় বিভাগ, এসপিএল",
  };

  const [formData, setFormData] = useState<Omit<Notice, "id">>(initialNoticeState);

  // Filter list
  const filteredNotices = notices.filter((n) => {
    const matchesSearch =
      n.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (n.titleBn && n.titleBn.toLowerCase().includes(searchTerm.toLowerCase())) ||
      n.refNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || n.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingNotice(null);
    setFormData(initialNoticeState);
    setActiveTab("general");
    setIsModalOpen(true);
  };

  const openEditModal = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData(notice);
    setActiveTab("general");
    setIsModalOpen(true);
  };

  /**
   * Action: Upload attachment file, append to formData.files array.
   */
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        const newAttachment: NoticeFile = {
          nameEn: file.name,
          nameBn: file.name, // Defaults to English name
          url: data.url,
          size: data.size || "1.0 MB",
        };
        setFormData((prev) => ({
          ...prev,
          files: [...prev.files, newAttachment],
        }));
      } else {
        setUploadError(data.error || "File upload failed.");
      }
    } catch (err) {
      setUploadError("Network error during file upload.");
    } finally {
      setUploading(false);
    }
  };

  const removeAttachment = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;

    if (editingNotice) {
      success = await editNotice(editingNotice.id, { ...formData, id: editingNotice.id });
    } else {
      success = await addNotice(formData);
    }

    if (success) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-dash-text select-none">
      
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[24px] font-extrabold tracking-wide">Notices Board Manager</h2>
          <p className="text-[14px] text-dash-text-muted mt-1">
            Manage tenders, career circulars, quality audits, and corporate declarations.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-brand-red hover:bg-brand-red-hover text-white text-[14px] font-bold px-5 py-3 rounded-xl shadow-lg shadow-brand-red/10 transition-all active:scale-98 cursor-pointer flex items-center gap-2"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Publish Circular</span>
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-dash-card-bg border border-dash-border p-4 rounded-2xl">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search circulars by title, reference..."
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
            { id: "all", label: "All Notices" },
            { id: "tender", label: "Tenders" },
            { id: "recruitment", label: "Careers" },
            { id: "general", label: "General" },
            { id: "certification", label: "Audits" },
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

      {/* Notices List Table */}
      <div className="bg-dash-card-bg border border-dash-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-dash-border bg-dash-hover-bg/20 text-[12px] font-extrabold text-dash-text-muted uppercase tracking-wider">
                <th className="py-4.5 px-6">Reference No.</th>
                <th className="py-4.5 px-6">Title (EN)</th>
                <th className="py-4.5 px-6">Category</th>
                <th className="py-4.5 px-6">Files</th>
                <th className="py-4.5 px-6">Publish Date</th>
                <th className="py-4.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dash-border text-[14px] font-semibold text-dash-text">
              {filteredNotices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-dash-text-muted font-medium">
                    No notices published yet.
                  </td>
                </tr>
              ) : (
                filteredNotices.map((n) => (
                  <tr key={n.id} className="hover:bg-dash-hover-bg/10 transition-colors">
                    <td className="py-4 px-6 font-mono text-dash-text text-[13px]">
                      {n.refNo}
                    </td>
                    <td className="py-4 px-6 font-bold max-w-xs truncate" title={n.titleEn}>
                      {n.titleEn}
                    </td>
                    <td className="py-4 px-6">
                      <span className={[
                        "px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide",
                        n.category === "tender" ? "bg-brand-red/10 text-brand-red" :
                        n.category === "recruitment" ? "bg-blue-500/10 text-blue-500" :
                        n.category === "general" ? "bg-green-500/10 text-green-500" :
                        "bg-yellow-500/10 text-yellow-500"
                      ].join(" ")}>
                        {n.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-dash-text-muted text-[13px] font-mono">
                      {n.files?.length || 0} Attachments
                    </td>
                    <td className="py-4 px-6 text-dash-text-muted text-[13px] font-mono">
                      {n.publishDate}
                    </td>
                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-3.5">
                        <button
                          onClick={() => openEditModal(n)}
                          className="text-[13px] text-brand-red hover:text-brand-red-hover font-bold cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Are you sure you want to delete notice "${n.refNo}"?`)) {
                              await deleteNotice(n.id);
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-dash-card-bg border border-dash-border rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-dash-border shrink-0">
              <h3 className="font-extrabold text-[18px]">
                {editingNotice ? `Edit Circular: ${editingNotice.refNo}` : "Publish New Circular"}
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

            {/* Modal Tabs */}
            <div className="flex bg-dash-hover-bg/30 border-b border-dash-border px-6 py-2 shrink-0 gap-2">
              {[
                { id: "general", label: "Notice Setup" },
                { id: "en", label: "English Details" },
                { id: "bn", label: "Bengali Details" },
                { id: "attachments", label: "Attachments" },
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

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Tab 1: General */}
              {activeTab === "general" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                        Reference Number
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.refNo}
                        onChange={(e) => setFormData({ ...formData, refNo: e.target.value })}
                        placeholder="SPL/HO/TND/2026/049"
                        className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                        Publish Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.publishDate}
                        onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                        className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Circular Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full bg-dash-card-bg border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3.5 text-[14px] focus:outline-hidden text-dash-text font-semibold"
                    >
                      <option value="tender">Tender notices</option>
                      <option value="recruitment">Careers / Recuritment</option>
                      <option value="general">General Circulars</option>
                      <option value="certification">Corporate Audits</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                        Signatory Authorized (EN)
                      </label>
                      <input
                        type="text"
                        value={formData.signatoryEn}
                        onChange={(e) => setFormData({ ...formData, signatoryEn: e.target.value })}
                        placeholder="Engr. Monirul Islam"
                        className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                        Signatory Authorized (BN)
                      </label>
                      <input
                        type="text"
                        value={formData.signatoryBn}
                        onChange={(e) => setFormData({ ...formData, signatoryBn: e.target.value })}
                        placeholder="ইঞ্জি. মনিরুল ইসলাম"
                        className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                        Designation (EN)
                      </label>
                      <input
                        type="text"
                        value={formData.designationEn}
                        onChange={(e) => setFormData({ ...formData, designationEn: e.target.value })}
                        placeholder="Head of Procurement Division, SPL"
                        className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                        Designation (BN)
                      </label>
                      <input
                        type="text"
                        value={formData.designationBn}
                        onChange={(e) => setFormData({ ...formData, designationBn: e.target.value })}
                        placeholder="প্রধান, ক্রয় বিভাগ, এসপিএল"
                        className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: English details */}
              {activeTab === "en" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Circular Title (EN)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.titleEn}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      placeholder="e.g. Tender Notice: Procurement of Super Enameled Copper Wire"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Official content (EN)
                    </label>
                    <textarea
                      rows={8}
                      value={formData.contentEn}
                      onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                      placeholder="Enter official circular message content..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: Bangla details */}
              {activeTab === "bn" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Circular Title (BN)
                    </label>
                    <input
                      type="text"
                      value={formData.titleBn}
                      onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                      placeholder="বাংলা দরপত্র শিরোনাম"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Official content (BN)
                    </label>
                    <textarea
                      rows={8}
                      value={formData.contentBn}
                      onChange={(e) => setFormData({ ...formData, contentBn: e.target.value })}
                      placeholder="নোটিশের বিস্তারিত বাংলা বিবরণ..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Tab 4: Attachments */}
              {activeTab === "attachments" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      PDF Document Attachments
                    </label>
                    <label className="bg-brand-red hover:bg-brand-red-hover text-white text-[12px] font-bold px-4 py-2.5 rounded-lg cursor-pointer transition-all flex items-center gap-1">
                      <span>{uploading ? "Uploading..." : "Add File"}</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        className="hidden"
                        disabled={uploading}
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>

                  {uploadError && (
                    <div className="text-[12px] font-bold text-brand-red bg-brand-red/10 border border-brand-red/10 p-3 rounded-lg">
                      {uploadError}
                    </div>
                  )}

                  {/* List uploaded attachments */}
                  <div className="space-y-3">
                    {formData.files.length === 0 ? (
                      <div className="text-center py-8 text-dash-text-muted text-[13px] font-medium bg-dash-hover-bg/20 border border-dash-border border-dashed rounded-xl">
                        No attachments uploaded for this notice.
                      </div>
                    ) : (
                      formData.files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3.5 bg-dash-hover-bg/20 border border-dash-border rounded-xl text-[13px] font-bold"
                        >
                          <div className="min-w-0 pr-4">
                            <p className="text-dash-text truncate" title={file.nameEn}>
                              {file.nameEn}
                            </p>
                            <span className="text-[10px] text-dash-text-muted font-mono mt-1 block">
                              Size: {file.size} | <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">Link</a>
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(idx)}
                            className="text-dash-text-muted hover:text-brand-red transition-colors text-[13px] font-extrabold cursor-pointer shrink-0"
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-dash-border shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-xl text-[14px] font-bold text-dash-text-muted hover:text-dash-text bg-dash-hover-bg hover:bg-dash-hover-bg/85 border border-dash-border transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-[14px] font-bold text-white bg-brand-red hover:bg-brand-red-hover shadow-xl shadow-brand-red/10 active:scale-98 transition-colors cursor-pointer"
                >
                  {editingNotice ? "Save Notice" : "Publish Notice"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
