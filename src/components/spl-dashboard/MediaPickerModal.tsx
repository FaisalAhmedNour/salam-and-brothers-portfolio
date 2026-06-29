"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export interface MediaItem {
  id: string | number;
  filename: string;
  originalName: string;
  mimeType: string;
  fileSize: string;
  url: string;
  createdAt: string;
}

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string, item?: MediaItem) => void;
  allowedTypes?: "images" | "all";
}

/**
 * MediaPickerModal Component.
 * Pop-up modal containing a WordPress-style file library interface:
 * Tab 1 allows selecting from existing items in a searchable grid.
 * Tab 2 allows direct local file uploads, auto-selecting on success.
 */
export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  allowedTypes = "images",
}: MediaPickerModalProps) {
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  // File upload state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (isOpen) {
      fetchMedia();
      setSelectedItem(null);
      setActiveTab("library");
      setErrorMsg("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Upload handler
  const uploadFiles = async (files: FileList) => {
    if (files.length === 0) return;
    setUploading(true);
    setUploadProgress("Uploading file...");
    setErrorMsg("");

    const file = files[0];
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
        setSelectedItem(newItem);
        setActiveTab("library"); // Switch back to grid view
      } else {
        const errData = await res.json();
        setErrorMsg(errData.error || "Upload failed.");
      }
    } catch (err) {
      setErrorMsg("Network error during file upload.");
    } finally {
      setUploading(false);
      setUploadProgress("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

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

  // Filter items based on props
  const filteredList = mediaList.filter((item) => {
    const matchesSearch = item.originalName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = allowedTypes === "all" ? true : item.mimeType.startsWith("image/");
    return matchesSearch && matchesType;
  });

  const getFileIcon = (mimeType: string) => {
    if (mimeType === "application/pdf") {
      return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-red-500/10 text-red-500 rounded-lg">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6" />
          </svg>
          <span className="text-[9px] font-bold mt-0.5">PDF</span>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-blue-500/10 text-blue-500 rounded-lg">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125" />
        </svg>
        <span className="text-[9px] font-bold mt-0.5">FILE</span>
      </div>
    );
  };

  const handleSelectConfirm = () => {
    if (selectedItem) {
      onSelect(selectedItem.url, selectedItem);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 select-none">
      
      {/* Modal Card wrapper */}
      <div className="w-full max-w-5xl h-[80vh] bg-dash-card-bg border border-dash-border rounded-3xl flex flex-col overflow-hidden shadow-2xl animate-scale-in">
        
        {/* Header Tab panel */}
        <div className="h-16 border-b border-dash-border px-6 flex items-center justify-between shrink-0 bg-dash-bg/50">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("library")}
              className={`text-[14px] font-extrabold pb-4 pt-4 border-b-2 cursor-pointer transition-all ${
                activeTab === "library"
                  ? "border-brand-red text-brand-red"
                  : "border-transparent text-dash-text-muted hover:text-dash-text"
              }`}
            >
              Media Library
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`text-[14px] font-extrabold pb-4 pt-4 border-b-2 cursor-pointer transition-all ${
                activeTab === "upload"
                  ? "border-brand-red text-brand-red"
                  : "border-transparent text-dash-text-muted hover:text-dash-text"
              }`}
            >
              Upload Files
            </button>
          </div>
          
          <button
            onClick={onClose}
            className="text-dash-text-muted hover:text-dash-text cursor-pointer p-1.5 hover:bg-dash-hover-bg rounded-lg transition-colors"
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error panel */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-red-500/10 text-red-500 rounded-xl text-[12px] font-semibold border border-red-500/20 shrink-0">
            {errorMsg}
          </div>
        )}

        {/* Content Pane */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {activeTab === "upload" ? (
            /* Upload Zone tab */
            <div className="flex-1 p-8 flex flex-col items-center justify-center">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={[
                  "w-full max-w-lg border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 relative",
                  dragging
                    ? "border-brand-red bg-brand-red/5 scale-[1.01]"
                    : "border-dash-border bg-dash-bg/30 hover:bg-dash-hover-bg/25",
                ].join(" ")}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files && uploadFiles(e.target.files)}
                  className="hidden"
                  accept={allowedTypes === "images" ? "image/*" : "image/*,application/pdf,.doc,.docx,.xls,.xlsx"}
                />

                <div className="p-4 bg-brand-red/10 text-brand-red rounded-full shadow-inner animate-pulse">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                </div>

                <div className="text-center">
                  <p className="text-[15px] font-bold">Drag and drop file here, or click to browse</p>
                  <p className="text-[12px] text-dash-text-muted mt-1">
                    {allowedTypes === "images" ? "Supports Images (PNG, JPG, WEBP, SVG)" : "Supports Images & PDFs"}
                  </p>
                </div>

                {uploading && (
                  <div className="absolute inset-0 bg-dash-card-bg/95 rounded-3xl flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
                    <p className="text-[13px] font-extrabold text-brand-red tracking-wide">{uploadProgress}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Media Library Grid Tab */
            <div className="flex-1 flex overflow-hidden">
              
              {/* Grid Column */}
              <div className="flex-1 flex flex-col overflow-hidden p-6 min-h-0 border-r border-dash-border">
                
                {/* Search control */}
                <div className="relative mb-5 shrink-0">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search files..."
                    className="w-full bg-dash-hover-bg/30 border border-dash-border rounded-xl pl-10 pr-4 py-2.5 text-[13px] focus:outline-hidden focus:border-brand-red/30 text-dash-text placeholder-dash-text-muted/40 font-semibold"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dash-text-muted">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="h-4.5 w-4.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
                    </svg>
                  </span>
                </div>

                {/* Grid List */}
                <div className="flex-1 overflow-y-auto min-h-0 pr-1">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
                      <p className="text-[12px] text-dash-text-muted mt-2">Loading library...</p>
                    </div>
                  ) : filteredList.length === 0 ? (
                    <div className="text-center py-16 text-dash-text-muted text-[13px]">
                      No matching media files.
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                      {filteredList.map((item) => {
                        const isImage = item.mimeType.startsWith("image/");
                        const isSelected = selectedItem?.id === item.id;
                        
                        return (
                          <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={[
                              "group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all bg-dash-bg",
                              isSelected
                                ? "border-brand-red ring-3 ring-brand-red/10 scale-[0.98]"
                                : "border-dash-border hover:border-dash-text-muted/40 hover:scale-[1.01]",
                            ].join(" ")}
                          >
                            {isImage ? (
                              <Image
                                src={item.url}
                                alt={item.originalName}
                                fill
                                sizes="(max-width: 640px) 33vw, 15vw"
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              getFileIcon(item.mimeType)
                            )}

                            <div className="absolute inset-x-0 bottom-0 bg-black/60 px-2 py-1 text-white text-[9px] truncate opacity-0 group-hover:opacity-100 transition-opacity">
                              {item.originalName}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Selection Sidebar (Right Column) */}
              <div className="w-72 bg-dash-bg/20 shrink-0 p-6 flex flex-col justify-between overflow-y-auto select-none border-l border-dash-border md:flex hidden">
                {selectedItem ? (
                  <div className="flex flex-col gap-5 h-full">
                    <h4 className="text-[12px] font-extrabold uppercase text-dash-text-muted tracking-wider border-b border-dash-border pb-2">
                      Selected File
                    </h4>
                    
                    <div className="relative aspect-video w-full border border-dash-border rounded-xl overflow-hidden bg-neutral-900 flex items-center justify-center">
                      {selectedItem.mimeType.startsWith("image/") ? (
                        <Image
                          src={selectedItem.url}
                          alt={selectedItem.originalName}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      ) : (
                        <div className="scale-90">{getFileIcon(selectedItem.mimeType)}</div>
                      )}
                    </div>

                    <div className="space-y-3.5 text-[12px]">
                      <div>
                        <label className="text-[10px] font-bold text-dash-text-muted block uppercase">File Name</label>
                        <p className="font-bold mt-0.5 break-all text-dash-text">{selectedItem.originalName}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-dash-text-muted block uppercase">Size</label>
                          <p className="font-semibold mt-0.5">{selectedItem.fileSize}</p>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-dash-text-muted block uppercase">Type</label>
                          <p className="font-semibold mt-0.5 truncate" title={selectedItem.mimeType}>{selectedItem.mimeType}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto border-t border-dash-border pt-4">
                      <button
                        onClick={handleSelectConfirm}
                        className="w-full bg-brand-red hover:bg-brand-red-hover text-white text-[13px] font-bold py-2.5 rounded-xl shadow-lg shadow-brand-red/10 cursor-pointer transition-all select-none active:scale-98"
                      >
                        Select Media
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-full text-dash-text-muted text-[13px] font-medium py-10">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 mb-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <span>Click on any file to select</span>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* Footer Actions Panel for small/mobile views */}
        {selectedItem && activeTab === "library" && (
          <div className="md:hidden border-t border-dash-border p-4 bg-dash-bg flex items-center justify-between shrink-0">
            <span className="text-[12px] font-bold truncate max-w-[180px]">{selectedItem.originalName}</span>
            <button
              onClick={handleSelectConfirm}
              className="bg-brand-red hover:bg-brand-red-hover text-white text-[12px] font-bold px-4 py-2 rounded-lg cursor-pointer transition-all"
            >
              Select Media
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
