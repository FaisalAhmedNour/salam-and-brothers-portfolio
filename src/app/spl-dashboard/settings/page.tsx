"use client";

import { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { darkenColor } from "@/lib/colorUtils";

interface DatabaseStatus {
  configured: boolean;
  connected: boolean;
  message: string;
}

interface UploadSettings {
  uploadDir: string;
  uploadUrl: string;
}

const CURATED_COLORS = [
  { name: "Crimson Red", hex: "#dc2626" },
  { name: "Royal Blue", hex: "#2563eb" },
  { name: "Emerald Green", hex: "#059669" },
  { name: "Amber Orange", hex: "#d97706" },
  { name: "Sleek Violet", hex: "#7c3aed" },
];

/**
 * DashboardSettings Component.
 * Admin settings circular panel including database connection checks,
 * EmailJS configuration tables, environment variable paths, credentials modification,
 * and site-wide brand color configuration.
 */
export default function DashboardSettings() {
  const { theme } = useDashboard();
  const [dbStatus, setDbStatus] = useState<DatabaseStatus>({
    configured: false,
    connected: false,
    message: "Verifying connection...",
  });
  const [uploadPaths, setUploadPaths] = useState<UploadSettings>({
    uploadDir: "Default (public/uploads)",
    uploadUrl: "Default (/uploads)",
  });
  const [emailJsConfig, setEmailJsConfig] = useState({
    serviceId: "Unset",
    templateId: "Unset",
    publicKey: "Unset",
  });

  const [loading, setLoading] = useState(true);
  
  // Credentials update state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [credMessage, setCredMessage] = useState("");
  const [credError, setCredError] = useState("");
  const [credLoading, setCredLoading] = useState(false);

  // Color config state
  const [selectedColor, setSelectedColor] = useState("#dc2626");
  const [colorMessage, setColorMessage] = useState("");
  const [colorError, setColorError] = useState("");
  const [colorLoading, setColorLoading] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/spl-dashboard/settings");
        if (res.ok) {
          const data = await res.json();
          setDbStatus(data.database);
          setUploadPaths(data.uploads);
          setEmailJsConfig(data.emailJs);
          if (data.siteSettings && data.siteSettings.primaryColor) {
            setSelectedColor(data.siteSettings.primaryColor);
          }
        }
      } catch (error) {
        console.error("Failed to query settings details:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredMessage("");
    setCredError("");

    if (!username) {
      setCredError("Username is required.");
      return;
    }
    if (password && password !== confirmPassword) {
      setCredError("Passwords do not match.");
      return;
    }

    setCredLoading(true);
    try {
      const res = await fetch("/api/spl-dashboard/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCredMessage(data.message || "Credentials updated successfully.");
        setPassword("");
        setConfirmPassword("");
      } else {
        setCredError(data.error || "Failed to update credentials.");
      }
    } catch (error) {
      setCredError("Network error during credentials update.");
    } finally {
      setCredLoading(false);
    }
  };

  const handleUpdateColor = async (e: React.FormEvent) => {
    e.preventDefault();
    setColorMessage("");
    setColorError("");
    setColorLoading(true);

    try {
      const res = await fetch("/api/spl-dashboard/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ primaryColor: selectedColor }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setColorMessage(data.message || "Primary brand color updated successfully.");
        
        // Apply instantly on document properties
        document.documentElement.style.setProperty("--primary-color", selectedColor);
        const hoverColor = darkenColor(selectedColor, 15);
        document.documentElement.style.setProperty("--primary-color-hover", hoverColor);
        // Sync custom events
        window.dispatchEvent(new Event("siteColorChanged"));
        
        // Remove local overrides so visitor matches the default
        localStorage.removeItem("user_site_color");
      } else {
        setColorError(data.error || "Failed to save color settings.");
      }
    } catch (err) {
      setColorError("Network error updating brand color.");
    } finally {
      setColorLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in text-dash-text select-none">
      
      {/* Title Header */}
      <div>
        <h2 className="text-[24px] font-extrabold tracking-wide">System Settings</h2>
        <p className="text-[14px] text-dash-text-muted mt-1">
          Monitor database health checks, verify EmailJS variables, update credentials, and change default brand colors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns: Status Cards */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Database Health Card */}
          <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6">
            <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-dash-text-muted mb-6">
              Database Connection
            </h3>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-dash-hover-bg/30 border border-dash-border">
              <div className={`w-3.5 h-3.5 rounded-full shrink-0 ${dbStatus.connected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold">
                  MySQL Status: {dbStatus.connected ? "Online / Connected" : "Offline / Unreachable"}
                </p>
                <p className="text-[12px] text-dash-text-muted mt-1 truncate">
                  {dbStatus.message}
                </p>
              </div>
            </div>
          </div>

          {/* Directory Path Configuration Card */}
          <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6 space-y-5">
            <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-dash-text-muted">
              Filesystem Directories (cPanel)
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                  Target Upload Directory (Local storage path)
                </span>
                <p className="p-3 bg-dash-hover-bg/30 border border-dash-border rounded-xl font-mono text-[13px] text-dash-text overflow-x-auto select-text font-semibold">
                  {uploadPaths.uploadDir}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                  Public Mapped URL (Frontend render endpoint)
                </span>
                <p className="p-3 bg-dash-hover-bg/30 border border-dash-border rounded-xl font-mono text-[13px] text-dash-text overflow-x-auto select-text font-semibold">
                  {uploadPaths.uploadUrl}
                </p>
              </div>
            </div>
          </div>

          {/* EmailJS Variables Card */}
          <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6">
            <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-dash-text-muted mb-5">
              EmailJS Configuration (.env)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px] font-bold">
              <div className="p-3.5 bg-dash-hover-bg/20 border border-dash-border rounded-xl">
                <p className="text-[10px] text-dash-text-muted uppercase tracking-wider">Service ID</p>
                <p className="font-mono mt-1 select-text truncate">{emailJsConfig.serviceId}</p>
              </div>
              <div className="p-3.5 bg-dash-hover-bg/20 border border-dash-border rounded-xl">
                <p className="text-[10px] text-dash-text-muted uppercase tracking-wider">Template ID</p>
                <p className="font-mono mt-1 select-text truncate">{emailJsConfig.templateId}</p>
              </div>
              <div className="p-3.5 bg-dash-hover-bg/20 border border-dash-border rounded-xl">
                <p className="text-[10px] text-dash-text-muted uppercase tracking-wider">Public Key</p>
                <p className="font-mono mt-1 select-text truncate">{emailJsConfig.publicKey}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Columns: Credentials and Color Editing Stack */}
        <div className="space-y-6 flex flex-col">
          
          {/* Site Primary Color Selector */}
          <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6">
            <form onSubmit={handleUpdateColor} className="space-y-5">
              <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-dash-text-muted mb-4">
                Default Site Brand Color
              </h3>

              {colorMessage && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-[13px] font-bold rounded-xl">
                  {colorMessage}
                </div>
              )}
              {colorError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[13px] font-bold rounded-xl">
                  {colorError}
                </div>
              )}

              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                  Select Theme Tint
                </span>
                <div className="flex flex-wrap gap-3.5 mt-3">
                  {CURATED_COLORS.map((color) => {
                    const isSel = selectedColor.toLowerCase() === color.hex.toLowerCase();
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.hex)}
                        className="relative w-9 h-9 rounded-full cursor-pointer transition-transform hover:scale-110 active:scale-95 flex items-center justify-center border border-black/10 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {isSel && (
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="h-4.5 w-4.5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={colorLoading}
                className="w-full bg-brand-red hover:bg-brand-red-hover disabled:bg-neutral-800 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-brand-red/10 hover:shadow-brand-red/20 active:scale-98 transition-all text-[14px] cursor-pointer mt-4"
              >
                {colorLoading ? "Saving..." : "Save Brand Color"}
              </button>
            </form>
          </div>

          {/* Admin Credentials Panel */}
          <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6">
            <form onSubmit={handleUpdateCredentials} className="space-y-5">
              <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-dash-text-muted mb-6">
                Update Admin Login
              </h3>

              {/* Notification messages */}
              {credMessage && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-[13px] font-bold rounded-xl">
                  {credMessage}
                </div>
              )}
              {credError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[13px] font-bold rounded-xl">
                  {credError}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                  New Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep same"
                  className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                />
              </div>

              <button
                type="submit"
                disabled={credLoading}
                className="w-full bg-brand-red hover:bg-brand-red-hover disabled:bg-neutral-800 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-brand-red/10 hover:shadow-brand-red/20 active:scale-98 transition-all text-[14px] cursor-pointer mt-4"
              >
                {credLoading ? "Updating..." : "Save Credentials"}
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
