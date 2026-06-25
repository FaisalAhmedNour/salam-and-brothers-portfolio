"use client";

import { useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { BlogPost } from "@/data/blogData";
import MediaPickerModal from "@/components/spl-dashboard/MediaPickerModal";

/**
 * DashboardBlogs Component.
 * Manage blog posts, publish articles, configure titles/content in bilingual
 * formats (EN/BN), upload header banners, and delete posts.
 */
export default function DashboardBlogs() {
  const { blogs, addBlog, editBlog, deleteBlog } = useDashboard();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "en" | "bn">("general");

  // Media Library Picker state
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  // Upload states
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const initialBlogState = {
    publishDate: new Date().toISOString().split("T")[0],
    authorEn: "Engr. Monirul Islam",
    authorBn: "ইঞ্জি. মনিরুল ইসলাম",
    readTimeEn: "5 min read",
    readTimeBn: "৫ মিনিট পাঠ",
    category: "transformers" as any,
    image: "",
    titleEn: "",
    titleBn: "",
    excerptEn: "",
    excerptBn: "",
    contentEn: "",
    contentBn: "",
  };

  const [formData, setFormData] = useState<Omit<BlogPost, "id">>(initialBlogState);

  // Filter list
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.titleBn && b.titleBn.toLowerCase().includes(searchTerm.toLowerCase())) ||
      b.authorEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingBlog(null);
    setFormData(initialBlogState);
    setActiveTab("general");
    setIsModalOpen(true);
  };

  const openEditModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData(blog);
    setActiveTab("general");
    setIsModalOpen(true);
  };

  /**
   * Action: Uploads banner image, updates state.
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
        setFormData((prev) => ({ ...prev, image: data.url }));
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

    if (editingBlog) {
      success = await editBlog(editingBlog.id, { ...formData, id: editingBlog.id });
    } else {
      success = await addBlog(formData);
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
          <h2 className="text-[24px] font-extrabold tracking-wide">Blogs Hub Manager</h2>
          <p className="text-[14px] text-dash-text-muted mt-1">
            Write guides, publish engineering circulars, and share industry reports.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-brand-red hover:bg-brand-red-hover text-white text-[14px] font-bold px-5 py-3 rounded-xl shadow-lg shadow-brand-red/10 transition-all active:scale-98 cursor-pointer flex items-center gap-2"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Write Article</span>
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
            placeholder="Search articles by title, author..."
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
            { id: "generators", label: "Generators" },
            { id: "switchgear", label: "Switchgear" },
            { id: "distribution", label: "Distribution" },
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

      {/* Blogs List Table */}
      <div className="bg-dash-card-bg border border-dash-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-dash-border bg-dash-hover-bg/20 text-[12px] font-extrabold text-dash-text-muted uppercase tracking-wider">
                <th className="py-4.5 px-6 w-24">Banner</th>
                <th className="py-4.5 px-6">Title (EN)</th>
                <th className="py-4.5 px-6">Author</th>
                <th className="py-4.5 px-6">Category</th>
                <th className="py-4.5 px-6">Publish Date</th>
                <th className="py-4.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dash-border text-[14px] font-semibold text-dash-text">
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-dash-text-muted font-medium">
                    No articles found matching search query.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((b) => (
                  <tr key={b.id} className="hover:bg-dash-hover-bg/10 transition-colors">
                    <td className="py-4 px-6">
                      <div className="relative w-12 h-12 bg-dash-hover-bg border border-dash-border rounded-lg overflow-hidden flex items-center justify-center">
                        {b.image ? (
                          <img
                            src={b.image}
                            alt={b.titleEn}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-[10px] text-dash-text-muted uppercase font-extrabold text-center">No img</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold max-w-sm truncate" title={b.titleEn}>
                      <div>
                        <p className="leading-tight truncate">{b.titleEn}</p>
                        <p className="text-[11px] text-dash-text-muted mt-1 font-mono">{b.id}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-dash-text-muted">
                      {b.authorEn}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[11px] bg-brand-red/10 border border-brand-red/10 px-2.5 py-1 rounded-full uppercase tracking-wider text-brand-red font-extrabold">
                        {b.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-dash-text-muted text-[13px] font-mono">
                      {b.publishDate}
                    </td>
                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-3.5">
                        <button
                          onClick={() => openEditModal(b)}
                          className="text-[13px] text-brand-red hover:text-brand-red-hover font-bold cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Are you sure you want to delete "${b.titleEn}"?`)) {
                              await deleteBlog(b.id);
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
          <div className="relative w-full max-w-2xl bg-dash-card-bg border border-dash-border rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-dash-text">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-dash-border shrink-0">
              <h3 className="font-extrabold text-[18px]">
                {editingBlog ? "Edit Article" : "Write New Article"}
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
                { id: "general", label: "General Settings" },
                { id: "en", label: "English Draft" },
                { id: "bn", label: "Bengali Draft" },
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
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full bg-dash-card-bg border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3.5 text-[14px] focus:outline-hidden text-dash-text font-semibold"
                      >
                        <option value="transformers">Transformers</option>
                        <option value="generators">Generators</option>
                        <option value="switchgear">Switchgear</option>
                        <option value="distribution">Distribution</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                        Author (EN)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.authorEn}
                        onChange={(e) => setFormData({ ...formData, authorEn: e.target.value })}
                        placeholder="Engr. Monirul Islam"
                        className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                        Author (BN)
                      </label>
                      <input
                        type="text"
                        value={formData.authorBn}
                        onChange={(e) => setFormData({ ...formData, authorBn: e.target.value })}
                        placeholder="ইঞ্জি. মনিরুল ইসলাম"
                        className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                        Read Time (EN)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.readTimeEn}
                        onChange={(e) => setFormData({ ...formData, readTimeEn: e.target.value })}
                        placeholder="5 min read"
                        className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                        Read Time (BN)
                      </label>
                      <input
                        type="text"
                        value={formData.readTimeBn}
                        onChange={(e) => setFormData({ ...formData, readTimeBn: e.target.value })}
                        placeholder="৫ মিনিট পাঠ"
                        className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                      />
                    </div>
                  </div>

                  {/* Banner Image */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Article Banner Image
                    </label>
                    <div className="flex gap-4 items-center">
                      <div className="w-20 h-20 bg-dash-hover-bg border border-dash-border rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                        {formData.image ? (
                          <img
                            src={formData.image}
                            alt="Banner Preview"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-[10px] text-dash-text-muted uppercase font-extrabold text-center px-1">No Image</span>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="Or enter banner image URL manually"
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
                            <span>{uploading ? "Uploading..." : "Upload Banner"}</span>
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

              {/* Tab 2: English Draft */}
              {activeTab === "en" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Article Title (EN)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.titleEn}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      placeholder="Enter English Title"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Excerpt / Summary (EN)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.excerptEn}
                      onChange={(e) => setFormData({ ...formData, excerptEn: e.target.value })}
                      placeholder="Enter short article excerpt for layout listing summaries..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Content Description (EN)
                    </label>
                    <textarea
                      rows={8}
                      required
                      value={formData.contentEn}
                      onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                      placeholder="Write full article description content in markdown or plain text format..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: Bangla Draft */}
              {activeTab === "bn" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Article Title (BN)
                    </label>
                    <input
                      type="text"
                      value={formData.titleBn}
                      onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                      placeholder="আর্টিকেলের বাংলা শিরোনাম"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Excerpt / Summary (BN)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.excerptBn}
                      onChange={(e) => setFormData({ ...formData, excerptBn: e.target.value })}
                      placeholder="সংক্ষিপ্ত বিবরণী প্যারাগ্রাফ..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Content Description (BN)
                    </label>
                    <textarea
                      rows={8}
                      value={formData.contentBn}
                      onChange={(e) => setFormData({ ...formData, contentBn: e.target.value })}
                      placeholder="আর্টিকেলের মূল বাংলা বিবরণ..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold font-mono"
                    />
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
                  {editingBlog ? "Save Draft" : "Publish Article"}
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
        onSelect={(url) => setFormData((prev) => ({ ...prev, image: url }))}
        allowedTypes="images"
      />

    </div>
  );
}
