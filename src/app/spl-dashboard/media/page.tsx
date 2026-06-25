"use client";

import { useState, useEffect, useRef } from "react";
import { useDashboard } from "@/context/DashboardContext";
import Image from "next/image";

interface MediaItem {
  id: string | number;
  filename: string;
  originalName: string;
  mimeType: string;
  fileSize: string;
  url: string;
  createdAt: string;
}

/**
 * MediaManager Component.
 * Implements a WordPress-like visual media library manager supporting drag-and-drop upload,
 * list/grid layouts, file details drawers, search/filters, and item deletion.
 */
export default function MediaManager() {
  const { theme } = useDashboard();
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "images" | "documents" | "others">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Selected file details drawer
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  // File upload drag & drop states
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toast notifications state
  const [toastMessage, setToastMessage] = useState("");

  const fetchMedia = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/spl-dashboard/media");
      if (res.ok) {
        const data = await res.json();
        setMediaList(data);
      } else {
        const errData = await res.json();
        setErrorMsg(errData.error || "Failed to load media library.");
      }
    } catch (err) {
      setErrorMsg("Network error loading media library.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // Show auto-dismissing toast notifications
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // Upload handler
  const uploadFiles = async (files: FileList) => {
    if (files.length === 0) return;
    setUploading(true);
    setUploadProgress("Uploading file...");
    setErrorMsg("");

    const file = files[0]; // Process one file for simplicity
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/spl-dashboard/media", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const newItem = await res.json();
        setMediaList((prev) => [newItem, ...prev]);
        setSelectedItem(newItem); // Automatically inspect newly uploaded file
        showToast("File uploaded successfully!");
      } else {
        const errData = await res.json();
        setErrorMsg(errData.error || "Failed to upload file.");
      }
    } catch (err) {
      setErrorMsg("Network error during file upload.");
    } finally {
      setUploading(false);
      setUploadProgress("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // File drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  // Copy to clipboard
  const copyToClipboard = (url: string) => {
    // Resolve absolute URL
    const absoluteUrl = url.startsWith("http")
      ? url
      : `${window.location.origin}${url}`;

    navigator.clipboard.writeText(absoluteUrl);
    showToast("Link copied to clipboard!");
  };

  // Delete media item
  const handleDeleteItem = async (item: MediaItem) => {
    if (!confirm(`Are you sure you want to permanently delete "${item.originalName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/spl-dashboard/media?id=${item.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m.id !== item.id));
        if (selectedItem?.id === item.id) {
          setSelectedItem(null);
        }
        showToast("File deleted permanently.");
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to delete file.");
      }
    } catch (err) {
      alert("Network error deleting file.");
    }
  };

  // Filters
  const filteredList = mediaList.filter((item) => {
    const matchesSearch = item.originalName.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesType = true;
    if (filterType === "images") {
      matchesType = item.mimeType.startsWith("image/");
    } else if (filterType === "documents") {
      matchesType =
        item.mimeType === "application/pdf" ||
        item.mimeType.includes("document") ||
        item.mimeType.includes("sheet") ||
        item.mimeType.includes("presentation") ||
        item.filename.endsWith(".pdf") ||
        item.filename.endsWith(".docx") ||
        item.filename.endsWith(".xlsx");
    } else if (filterType === "others") {
      matchesType = !item.mimeType.startsWith("image/") && 
                    item.mimeType !== "application/pdf" &&
                    !item.mimeType.includes("document") &&
                    !item.mimeType.includes("sheet");
    }

    return matchesSearch && matchesType;
  });

  const getFileIcon = (mimeType: string) => {
    if (mimeType === "application/pdf") {
      return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-red-500/10 text-red-500 rounded-lg">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span className="text-[11px] font-bold mt-1 uppercase tracking-wider">PDF</span>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-blue-500/10 text-blue-500 rounded-lg">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <span className="text-[11px] font-bold mt-1 uppercase tracking-wider">FILE</span>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in text-dash-text">
      
      {/* Title Header */}
      <div className="flex justify-between items-center select-none">
        <div>
          <h2 className="text-[24px] font-extrabold tracking-wide">Media Library</h2>
          <p className="text-[14px] text-dash-text-muted mt-1">
            Upload, manage, and inspect media assets used across products and articles.
          </p>
        </div>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={[
          "border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 relative select-none",
          dragging
            ? "border-brand-red bg-brand-red/5 scale-[1.01]"
            : "border-dash-border bg-dash-card-bg/50 hover:bg-dash-hover-bg/25 hover:border-dash-text-muted/40",
        ].join(" ")}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files && uploadFiles(e.target.files)}
          className="hidden"
          accept="image/*,application/pdf"
        />

        <div className="p-4 bg-brand-red/10 text-brand-red rounded-full shadow-inner animate-pulse">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
        </div>

        <div className="text-center">
          <p className="text-[16px] font-bold">Drag and drop file here, or click to browse</p>
          <p className="text-[12px] text-dash-text-muted mt-1">Supports Images (PNG, JPG, WEBP, SVG) & PDFs up to 10MB</p>
        </div>

        {uploading && (
          <div className="absolute inset-0 bg-dash-card-bg/90 rounded-3xl flex flex-col items-center justify-center gap-3 transition-opacity">
            <div className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
            <p className="text-[14px] font-extrabold text-brand-red tracking-wide">{uploadProgress}</p>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-500/10 text-red-500 rounded-xl text-[13px] font-semibold border border-red-500/20">
          {errorMsg}
        </div>
      )}

      {/* Toolbar / Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-dash-card-bg border border-dash-border p-4 rounded-2xl select-none">
        
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search media files..."
            className="w-full bg-dash-hover-bg/30 border border-dash-border rounded-xl pl-11 pr-4 py-3 text-[14px] focus:outline-hidden focus:border-brand-red/30 text-dash-text placeholder-dash-text-muted/40 font-semibold"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dash-text-muted">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
            </svg>
          </span>
        </div>

        {/* Filters and View Toggles */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex gap-1.5">
            {[
              { id: "all", label: "All Items" },
              { id: "images", label: "Images" },
              { id: "documents", label: "Documents" },
              { id: "others", label: "Others" },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id as any)}
                className={[
                  "px-3.5 py-2 rounded-lg text-[13px] font-bold cursor-pointer transition-all",
                  filterType === type.id
                    ? "bg-dash-hover-bg text-dash-text border border-dash-border"
                    : "text-dash-text-muted hover:text-dash-text hover:bg-dash-hover-bg/50 border border-transparent",
                ].join(" ")}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-dash-border hidden sm:block" />

          {/* View Toggles */}
          <div className="flex border border-dash-border rounded-lg overflow-hidden bg-dash-hover-bg/10">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 cursor-pointer transition-colors ${viewMode === "grid" ? "bg-dash-hover-bg text-dash-text" : "text-dash-text-muted hover:text-dash-text"}`}
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 cursor-pointer transition-colors ${viewMode === "list" ? "bg-dash-hover-bg text-dash-text" : "text-dash-text-muted hover:text-dash-text"}`}
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12M8.25 17.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Core Media List Area */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Main Content Pane */}
        <div className="flex-1 w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-dash-card-bg border border-dash-border rounded-3xl">
              <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
              <p className="text-[13px] text-dash-text-muted mt-3 font-semibold">Loading assets...</p>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="py-20 text-center bg-dash-card-bg border border-dash-border rounded-3xl text-dash-text-muted font-medium">
              No media assets match your filters or criteria.
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredList.map((item) => {
                const isImage = item.mimeType.startsWith("image/");
                const isSelected = selectedItem?.id === item.id;
                
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={[
                      "group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-200 bg-dash-card-bg",
                      isSelected
                        ? "border-brand-red ring-4 ring-brand-red/10 scale-[0.98]"
                        : "border-dash-border hover:border-dash-text-muted/40 hover:scale-[1.01]",
                    ].join(" ")}
                  >
                    {isImage ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={item.url}
                          alt={item.originalName}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          unoptimized
                        />
                      </div>
                    ) : (
                      getFileIcon(item.mimeType)
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-3 pt-8 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
                      <p className="text-white text-[11px] font-bold truncate">{item.originalName}</p>
                      <p className="text-white/60 text-[9px] mt-0.5 font-medium">{item.fileSize}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="bg-dash-card-bg border border-dash-border rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse select-none">
                <thead>
                  <tr className="border-b border-dash-border bg-dash-hover-bg/20 text-[12px] font-extrabold text-dash-text-muted uppercase tracking-wider">
                    <th className="py-4.5 px-6 w-20">Preview</th>
                    <th className="py-4.5 px-6">File Name</th>
                    <th className="py-4.5 px-6">Mime Type</th>
                    <th className="py-4.5 px-6">Size</th>
                    <th className="py-4.5 px-6">Uploaded At</th>
                    <th className="py-4.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dash-border text-[13px] font-semibold text-dash-text">
                  {filteredList.map((item) => {
                    const isImage = item.mimeType.startsWith("image/");
                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`hover:bg-dash-hover-bg/10 transition-colors cursor-pointer ${selectedItem?.id === item.id ? "bg-dash-hover-bg/20" : ""}`}
                      >
                        <td className="py-3 px-6">
                          <div className="relative w-12 h-12 rounded-lg border border-dash-border overflow-hidden bg-neutral-900 flex items-center justify-center">
                            {isImage ? (
                              <Image
                                src={item.url}
                                alt={item.originalName}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="scale-75">{getFileIcon(item.mimeType)}</div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-6 font-bold max-w-xs truncate">{item.originalName}</td>
                        <td className="py-3 px-6 text-dash-text-muted text-[12px]">{item.mimeType}</td>
                        <td className="py-3 px-6 text-dash-text-muted">{item.fileSize}</td>
                        <td className="py-3 px-6 text-dash-text-muted">
                          {new Date(item.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="py-3 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => copyToClipboard(item.url)}
                              className="p-1.5 hover:bg-dash-hover-bg rounded-lg text-dash-text-muted hover:text-dash-text transition-colors"
                              title="Copy URL"
                            >
                              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4.5 w-4.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-3a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5m-9-9h10.875c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125H6.75A1.125 1.125 0 015.625 18V8.625c0-.621.504-1.125 1.125-1.125z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item)}
                              className="p-1.5 hover:bg-red-500/10 rounded-lg text-dash-text-muted hover:text-red-500 transition-colors"
                              title="Delete File"
                            >
                              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4.5 w-4.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Sidebar details Drawer */}
        {selectedItem && (
          <div className="w-full lg:w-80 bg-dash-card-bg border border-dash-border rounded-3xl p-6 space-y-6 select-none shrink-0 sticky top-6 animate-slide-in">
            <div className="flex justify-between items-center border-b border-dash-border pb-3">
              <h3 className="text-[15px] font-extrabold tracking-wide uppercase text-dash-text-muted">Asset Details</h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-dash-text-muted hover:text-dash-text cursor-pointer"
              >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Preview */}
            <div className="relative aspect-video w-full border border-dash-border rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center">
              {selectedItem.mimeType.startsWith("image/") ? (
                <Image
                  src={selectedItem.url}
                  alt={selectedItem.originalName}
                  fill
                  className="object-contain"
                  unoptimized
                />
              ) : (
                <div className="scale-125">{getFileIcon(selectedItem.mimeType)}</div>
              )}
            </div>

            {/* Metadata breakdown */}
            <div className="space-y-4 text-[13px]">
              <div>
                <label className="text-[11px] font-bold text-dash-text-muted block uppercase">File Name</label>
                <p className="font-bold mt-1 text-dash-text break-all">{selectedItem.originalName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-dash-text-muted block uppercase">File Size</label>
                  <p className="font-semibold mt-0.5">{selectedItem.fileSize}</p>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-dash-text-muted block uppercase">Mime Type</label>
                  <p className="font-semibold mt-0.5 truncate" title={selectedItem.mimeType}>{selectedItem.mimeType}</p>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-dash-text-muted block uppercase">Uploaded At</label>
                <p className="font-semibold mt-0.5">
                  {new Date(selectedItem.createdAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <div>
                <label className="text-[11px] font-bold text-dash-text-muted block uppercase">Public Path URL</label>
                <div className="flex gap-2 items-center mt-1">
                  <input
                    type="text"
                    readOnly
                    value={selectedItem.url}
                    className="flex-1 bg-dash-hover-bg/30 border border-dash-border text-[11px] rounded-lg px-2.5 py-1.5 focus:outline-hidden font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(selectedItem.url)}
                    className="bg-dash-hover-bg hover:bg-dash-hover-bg/85 border border-dash-border p-2 rounded-lg text-dash-text transition-colors cursor-pointer"
                    title="Copy URL"
                  >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4.5 w-4.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-3a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5m-9-9h10.875c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125H6.75A1.125 1.125 0 015.625 18V8.625c0-.621.504-1.125 1.125-1.125z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-2 gap-3 border-t border-dash-border pt-4">
              <a
                href={selectedItem.url}
                target="_blank"
                rel="noreferrer"
                className="bg-dash-hover-bg hover:bg-dash-hover-bg/85 border border-dash-border text-dash-text text-[13px] font-bold py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4.5 w-4.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                <span>Open File</span>
              </a>
              <button
                onClick={() => handleDeleteItem(selectedItem)}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 text-[13px] font-bold py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4.5 w-4.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Toast Notification */}
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
