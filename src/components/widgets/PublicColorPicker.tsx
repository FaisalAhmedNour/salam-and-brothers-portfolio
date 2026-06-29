"use client";

import { useState, useEffect, useRef } from "react";
import { darkenColor } from "@/lib/colorUtils";

const CURATED_COLORS = [
  { name: "Crimson Red", hex: "#dc2626" },
  { name: "Royal Blue", hex: "#2563eb" },
  { name: "Emerald Green", hex: "#059669" },
  { name: "Amber Orange", hex: "#d97706" },
  { name: "Sleek Violet", hex: "#7c3aed" },
];

/**
 * PublicColorPicker Component.
 * Displays a premium selector on the public header allowing visitors to override
 * the site's primary brand color. Syncs selections dynamically with localStorage.
 */
export default function PublicColorPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState("#dc2626");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Fetch current color configuration and reset if admin color changed
    const adminColor = document.documentElement.getAttribute("data-default-color") || "#dc2626";
    const lastAdminColor = localStorage.getItem("last_admin_color");
    
    if (lastAdminColor !== adminColor) {
      localStorage.removeItem("user_site_color");
      localStorage.setItem("last_admin_color", adminColor);
    }

    const savedColor = localStorage.getItem("user_site_color");
    if (savedColor) {
      setCurrentColor(savedColor);
    } else {
      setCurrentColor(adminColor);
    }
  }, []);

  // Sync with dynamic updates (e.g. if updated from another page control)
  useEffect(() => {
    const handleSync = () => {
      const savedColor = localStorage.getItem("user_site_color");
      const defaultColor = document.documentElement.getAttribute("data-default-color") || "#dc2626";
      setCurrentColor(savedColor || defaultColor);
    };
    window.addEventListener("siteColorChanged", handleSync);
    return () => window.removeEventListener("siteColorChanged", handleSync);
  }, []);

  // Handle clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectColor = (hex: string) => {
    setCurrentColor(hex);
    localStorage.setItem("user_site_color", hex);
    document.documentElement.style.setProperty("--primary-color", hex);
    const hoverColor = darkenColor(hex, 15);
    document.documentElement.style.setProperty("--primary-color-hover", hoverColor);
    setIsOpen(false);

    // Broadcast the change event
    window.dispatchEvent(new Event("siteColorChanged"));
  };

  const resetToDefault = () => {
    localStorage.removeItem("user_site_color");
    const defaultColor = document.documentElement.getAttribute("data-default-color") || "#dc2626";
    const defaultHover = document.documentElement.getAttribute("data-default-color-hover") || "#b91c1c";
    setCurrentColor(defaultColor);
    document.documentElement.style.setProperty("--primary-color", defaultColor);
    document.documentElement.style.setProperty("--primary-color-hover", defaultHover);
    setIsOpen(false);

    // Broadcast the change event
    window.dispatchEvent(new Event("siteColorChanged"));
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200/80 border border-gray-250 transition-all text-[13px] font-bold text-gray-700 cursor-pointer"
        aria-label="Change theme color"
      >
        <span
          className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs shrink-0"
          style={{ backgroundColor: currentColor }}
        />
        {/* <span className="hidden sm:inline">Theme</span> */}
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="h-3 w-3 text-gray-500 transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : undefined }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-44 rounded-2xl bg-white border border-gray-200 shadow-xl p-2 z-50 animate-fade-in text-black">
          <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider px-2.5 py-1.5 border-b border-gray-100 mb-1">
            Select Color
          </p>
          <div className="space-y-0.5">
            {CURATED_COLORS.map((color) => {
              const isActive = currentColor.toLowerCase() === color.hex.toLowerCase();
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => selectColor(color.hex)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-[13px] font-semibold transition-colors cursor-pointer ${isActive
                      ? "bg-gray-50 text-black"
                      : "text-gray-700 hover:bg-gray-55 hover:text-black"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/5 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </div>
                  {isActive && (
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-3.5 w-3.5 text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={resetToDefault}
            className="w-full text-center mt-2 pt-2 border-t border-gray-100 text-[11px] font-bold text-gray-500 hover:text-red-600 transition-colors uppercase tracking-wider block py-1 cursor-pointer"
          >
            Reset Default
          </button>
        </div>
      )}
    </div>
  );
}
