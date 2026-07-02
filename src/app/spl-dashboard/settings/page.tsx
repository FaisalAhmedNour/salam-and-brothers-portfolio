"use client";

import { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { darkenColor } from "@/lib/colorUtils";
import { SpecialtyTransformer } from "@/lib/settings";
import MediaPickerModal from "@/components/spl-dashboard/MediaPickerModal";

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

  // Scrolling texts config state
  const [scrollingTexts, setScrollingTexts] = useState<SpecialtyTransformer[]>([]);
  const [marqueeMessage, setMarqueeMessage] = useState("");
  const [marqueeError, setMarqueeError] = useState("");
  const [marqueeLoading, setMarqueeLoading] = useState(false);

  // Slogans config state
  const [slogan, setSlogan] = useState({
    rightLabelEn: "",
    rightLabelBn: "",
    rightTitleEn: "",
    rightTitleBn: "",
  });
  const [sloganMessage, setSloganMessage] = useState("");
  const [sloganError, setSloganError] = useState("");
  const [sloganLoading, setSloganLoading] = useState(false);

  // Logos, Favicon & Contact CTA config state
  const [logoPath, setLogoPath] = useState("");
  const [faviconPath, setFaviconPath] = useState("");
  const [contactCTAImagePath, setContactCTAImagePath] = useState("");
  const [assetsMessage, setAssetsMessage] = useState("");
  const [assetsError, setAssetsError] = useState("");
  const [assetsLoading, setAssetsLoading] = useState(false);

  // Social links & Google Maps config state
  const [facebookUrl, setFacebookUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [mapEmbedUrl, setMapEmbedUrl] = useState("");
  const [socialMessage, setSocialMessage] = useState("");
  const [socialError, setSocialError] = useState("");
  const [socialLoading, setSocialLoading] = useState(false);

  const [welcomeActive, setWelcomeActive] = useState(false);
  const [welcomeImagePath, setWelcomeImagePath] = useState("");
  const [welcomeMaxShowCount, setWelcomeMaxShowCount] = useState(5);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [welcomeError, setWelcomeError] = useState("");
  const [welcomeLoading, setWelcomeLoading] = useState(false);

  // Brand Introduction state
  const [brandIntro, setBrandIntro] = useState({
    subtitleEn: "",
    subtitleBn: "",
    titleEn: "",
    titleBn: "",
    descriptionEn: "",
    descriptionBn: "",
  });
  const [introMessage, setIntroMessage] = useState("");
  const [introError, setIntroError] = useState("");
  const [introLoading, setIntroLoading] = useState(false);

  // Brand Banner state
  const [brandBanner, setBrandBanner] = useState({
    leftPara1En: "",
    leftPara1Bn: "",
    leftPara2En: "",
    leftPara2Bn: "",
  });
  const [bannerMessage, setBannerMessage] = useState("");
  const [bannerError, setBannerError] = useState("");
  const [bannerLoading, setBannerLoading] = useState(false);

  // Media Picker state
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<"logo" | "favicon" | "contactCTAImage" | "welcomeModalImage" | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/spl-dashboard/settings");
        if (res.ok) {
          const data = await res.json();
          setDbStatus(data.database);
          setUploadPaths(data.uploads);
          setEmailJsConfig(data.emailJs);
          if (data.siteSettings) {
            if (data.siteSettings.primaryColor) {
              setSelectedColor(data.siteSettings.primaryColor);
            }
            if (data.siteSettings.scrollingTexts) {
              setScrollingTexts(data.siteSettings.scrollingTexts);
            }
            if (data.siteSettings.logoPath) {
              setLogoPath(data.siteSettings.logoPath);
            }
            if (data.siteSettings.faviconPath) {
              setFaviconPath(data.siteSettings.faviconPath);
            }
            if (data.siteSettings.contactCTAImagePath) {
              setContactCTAImagePath(data.siteSettings.contactCTAImagePath);
            }
            if (data.siteSettings.brandBannerSlogan) {
              setSlogan(data.siteSettings.brandBannerSlogan);
            }
            if (data.siteSettings.socialLinks) {
              setFacebookUrl(data.siteSettings.socialLinks.facebook || "");
              setLinkedinUrl(data.siteSettings.socialLinks.linkedin || "");
              setInstagramUrl(data.siteSettings.socialLinks.instagram || "");
              setYoutubeUrl(data.siteSettings.socialLinks.youtube || "");
            }
            if (data.siteSettings.googleMapsEmbedUrl) {
              setMapEmbedUrl(data.siteSettings.googleMapsEmbedUrl);
            }
            if (data.siteSettings.welcomeModal) {
              setWelcomeActive(data.siteSettings.welcomeModal.active || false);
              setWelcomeImagePath(data.siteSettings.welcomeModal.imagePath || "");
              setWelcomeMaxShowCount(data.siteSettings.welcomeModal.maxShowCount || 5);
            }
            if (data.siteSettings.brandIntro) {
              setBrandIntro(data.siteSettings.brandIntro);
            }
            if (data.siteSettings.brandBanner) {
              setBrandBanner(data.siteSettings.brandBanner);
            }
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

  const handleUpdateSlogan = async (e: React.FormEvent) => {
    e.preventDefault();
    setSloganMessage("");
    setSloganError("");
    setSloganLoading(true);

    try {
      const res = await fetch("/api/spl-dashboard/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandBannerSlogan: slogan }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSloganMessage(data.message || "Brand slogans updated successfully.");
      } else {
        setSloganError(data.error || "Failed to save slogans settings.");
      }
    } catch (err) {
      setSloganError("Network error updating slogans.");
    } finally {
      setSloganLoading(false);
    }
  };

  const handleSelectMedia = async (url: string) => {
    if (!mediaPickerTarget) return;

    const target = mediaPickerTarget;
    setAssetsMessage("");
    setAssetsError("");
    setAssetsLoading(true);

    try {
      let updatePayload = {};
      if (target === "logo") {
        updatePayload = { logoPath: url };
      } else if (target === "favicon") {
        updatePayload = { faviconPath: url };
      } else if (target === "contactCTAImage") {
        updatePayload = { contactCTAImagePath: url };
      } else if (target === "welcomeModalImage") {
        updatePayload = {
          welcomeModal: {
            active: welcomeActive,
            imagePath: url,
            maxShowCount: welcomeMaxShowCount
          }
        };
      }

      const res = await fetch("/api/spl-dashboard/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (target === "logo") {
          setLogoPath(url);
        } else if (target === "favicon") {
          setFaviconPath(url);
        } else if (target === "contactCTAImage") {
          setContactCTAImagePath(url);
        } else if (target === "welcomeModalImage") {
          setWelcomeImagePath(url);
        }
        setAssetsMessage(`${
          target === "logo"
            ? "Brand logo"
            : target === "favicon"
            ? "Favicon"
            : target === "contactCTAImage"
            ? "Contact CTA image"
            : "Welcome modal image"
        } updated successfully.`);
      } else {
        setAssetsError(data.error || "Failed to update assets setting.");
      }
    } catch (err) {
      setAssetsError("Network error updating assets setting.");
    } finally {
      setAssetsLoading(false);
      setIsMediaPickerOpen(false);
      setMediaPickerTarget(null);
    }
  };

  const handleUpdateMarquee = async (e: React.FormEvent) => {
    e.preventDefault();
    setMarqueeMessage("");
    setMarqueeError("");
    setMarqueeLoading(true);

    try {
      const res = await fetch("/api/spl-dashboard/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scrollingTexts }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMarqueeMessage(data.message || "Scrolling marquee texts updated successfully.");
      } else {
        setMarqueeError(data.error || "Failed to save marquee settings.");
      }
    } catch (err) {
      setMarqueeError("Network error updating marquee settings.");
    } finally {
      setMarqueeLoading(false);
    }
  };

  const handleMarqueeChange = (index: number, field: "en" | "bn", val: string) => {
    const updated = [...scrollingTexts];
    updated[index] = { ...updated[index], [field]: val };
    setScrollingTexts(updated);
  };

  const handleAddMarqueeItem = () => {
    setScrollingTexts([...scrollingTexts, { en: "", bn: "" }]);
  };

  const handleRemoveMarqueeItem = (index: number) => {
    const updated = scrollingTexts.filter((_, idx) => idx !== index);
    setScrollingTexts(updated);
  };

  const handleMoveMarqueeItem = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === scrollingTexts.length - 1) return;

    const updated = [...scrollingTexts];
    const swapWithIndex = direction === "up" ? index - 1 : index + 1;
    const temp = updated[index];
    updated[index] = updated[swapWithIndex];
    updated[swapWithIndex] = temp;
    setScrollingTexts(updated);
  };

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

  const handleUpdateSocialsAndMap = async (e: React.FormEvent) => {
    e.preventDefault();
    setSocialMessage("");
    setSocialError("");
    setSocialLoading(true);

    try {
      const res = await fetch("/api/spl-dashboard/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          socialLinks: {
            facebook: facebookUrl,
            linkedin: linkedinUrl,
            instagram: instagramUrl,
            youtube: youtubeUrl,
          },
          googleMapsEmbedUrl: mapEmbedUrl,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSocialMessage(data.message || "Social links and Map URL updated successfully.");
      } else {
        setSocialError(data.error || "Failed to update social & map settings.");
      }
    } catch (err) {
      setSocialError("Network error updating socials & map link.");
    } finally {
      setSocialLoading(false);
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

  const handleUpdateWelcomeModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setWelcomeMessage("");
    setWelcomeError("");
    setWelcomeLoading(true);

    try {
      const res = await fetch("/api/spl-dashboard/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          welcomeModal: {
            active: welcomeActive,
            imagePath: welcomeImagePath,
            maxShowCount: Number(welcomeMaxShowCount) || 5,
          },
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setWelcomeMessage(data.message || "Welcome modal settings updated successfully.");
      } else {
        setWelcomeError(data.error || "Failed to save welcome modal settings.");
      }
    } catch (err) {
      setWelcomeError("Network error updating welcome modal settings.");
    } finally {
      setWelcomeLoading(false);
    }
  };

  const handleUpdateBrandIntro = async (e: React.FormEvent) => {
    e.preventDefault();
    setIntroMessage("");
    setIntroError("");
    setIntroLoading(true);

    try {
      const res = await fetch("/api/spl-dashboard/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandIntro }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIntroMessage(data.message || "Brand introduction updated successfully.");
      } else {
        setIntroError(data.error || "Failed to save brand introduction.");
      }
    } catch (err) {
      setIntroError("Network error updating brand introduction.");
    } finally {
      setIntroLoading(false);
    }
  };

  const handleUpdateBrandBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    setBannerMessage("");
    setBannerError("");
    setBannerLoading(true);

    try {
      const res = await fetch("/api/spl-dashboard/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandBanner }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBannerMessage(data.message || "Brand banner updated successfully.");
      } else {
        setBannerError(data.error || "Failed to save brand banner descriptions.");
      }
    } catch (err) {
      setBannerError("Network error updating brand banner.");
    } finally {
      setBannerLoading(false);
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

          {/* Scrolling Marquee Texts Card */}
          <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6">
            <form onSubmit={handleUpdateMarquee} className="space-y-5">
              <div>
                <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-dash-text-muted">
                  Scrolling Marquee Texts
                </h3>
                <p className="text-[12px] text-dash-text-muted mt-1">
                  Manage the English and Bangla translations for specialty items scrolling vertically in the landing page banner.
                </p>
              </div>

              {marqueeMessage && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-[13px] font-bold rounded-xl animate-fade-in">
                  {marqueeMessage}
                </div>
              )}
              {marqueeError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[13px] font-bold rounded-xl animate-fade-in">
                  {marqueeError}
                </div>
              )}

              <div className="space-y-3 max-h-120 overflow-y-auto pr-1">
                {scrollingTexts.length === 0 ? (
                  <p className="text-sm font-semibold text-dash-text-muted py-4 text-center">
                    No scrolling texts configured. Add some items below.
                  </p>
                ) : (
                  scrollingTexts.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row items-start md:items-center gap-3 p-4 rounded-xl bg-dash-hover-bg/30 border border-dash-border group transition-all"
                    >
                      <div className="flex-1 w-full space-y-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-dash-text-muted uppercase w-16">English</span>
                          <input
                            type="text"
                            required
                            value={item.en}
                            onChange={(e) => handleMarqueeChange(index, "en", e.target.value)}
                            placeholder="e.g. Renewable Energy Transformers"
                            className="flex-1 bg-dash-card-bg border border-dash-border focus:border-brand-red/30 rounded-lg px-3 py-1.5 text-[13px] focus:outline-hidden text-dash-text font-semibold placeholder-dash-text-muted/30"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-dash-text-muted uppercase w-16">Bangla</span>
                          <input
                            type="text"
                            required
                            value={item.bn}
                            onChange={(e) => handleMarqueeChange(index, "bn", e.target.value)}
                            placeholder="e.g. নবায়নযোগ্য শক্তি ট্রান্সফরমার"
                            className="flex-1 bg-dash-card-bg border border-dash-border focus:border-brand-red/30 rounded-lg px-3 py-1.5 text-[13px] focus:outline-hidden text-dash-text font-semibold placeholder-dash-text-muted/30"
                          />
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 mt-2 md:mt-0 self-end md:self-auto shrink-0">
                        {/* Move Up */}
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMoveMarqueeItem(index, "up")}
                          className="p-1.5 rounded-lg border border-dash-border bg-dash-card-bg text-dash-text hover:bg-dash-hover-bg hover:text-brand-red disabled:opacity-30 disabled:hover:text-dash-text-muted cursor-pointer transition-colors"
                          title="Move Up"
                        >
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                          </svg>
                        </button>

                        {/* Move Down */}
                        <button
                          type="button"
                          disabled={index === scrollingTexts.length - 1}
                          onClick={() => handleMoveMarqueeItem(index, "down")}
                          className="p-1.5 rounded-lg border border-dash-border bg-dash-card-bg text-dash-text hover:bg-dash-hover-bg hover:text-brand-red disabled:opacity-30 disabled:hover:text-dash-text-muted cursor-pointer transition-colors"
                          title="Move Down"
                        >
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleRemoveMarqueeItem(index)}
                          className="p-1.5 rounded-lg border border-dash-border bg-dash-card-bg text-red-500 hover:bg-red-500/10 hover:border-red-500/20 cursor-pointer transition-colors"
                          title="Delete Item"
                        >
                          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleAddMarqueeItem}
                  className="w-full sm:w-auto bg-dash-hover-bg hover:bg-dash-hover-bg/85 border border-dash-border text-dash-text hover:text-brand-red font-bold px-5 py-2.5 rounded-xl transition-all text-[13px] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add New Text
                </button>

                <button
                  type="submit"
                  disabled={marqueeLoading}
                  className="w-full sm:w-auto sm:ml-auto bg-brand-red hover:bg-brand-red-hover disabled:bg-neutral-800 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-brand-red/10 hover:shadow-brand-red/20 active:scale-98 transition-all text-[13px] cursor-pointer"
                >
                  {marqueeLoading ? "Saving..." : "Save Marquee Texts"}
                </button>
              </div>
            </form>
          </div>

          {/* Brand Banner Slogans Card */}
          <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6">
            <form onSubmit={handleUpdateSlogan} className="space-y-5">
              <div>
                <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-dash-text-muted">
                  Brand Banner Slogans
                </h3>
                <p className="text-[12px] text-dash-text-muted mt-1">
                  Configure the English and Bangla text displayed on the home page trust slogan banner (BrandBanner).
                </p>
              </div>

              {sloganMessage && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-[13px] font-bold rounded-xl animate-fade-in">
                  {sloganMessage}
                </div>
              )}
              {sloganError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[13px] font-bold rounded-xl animate-fade-in">
                  {sloganError}
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Right Label (English)
                    </label>
                    <input
                      type="text"
                      required
                      value={slogan.rightLabelEn}
                      onChange={(e) => setSlogan({ ...slogan, rightLabelEn: e.target.value })}
                      placeholder="e.g. Energizing Today"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Right Label (Bangla)
                    </label>
                    <input
                      type="text"
                      required
                      value={slogan.rightLabelBn}
                      onChange={(e) => setSlogan({ ...slogan, rightLabelBn: e.target.value })}
                      placeholder="e.g. এনার্জাইজিং টুডে"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Right Title / Accent (English)
                    </label>
                    <input
                      type="text"
                      required
                      value={slogan.rightTitleEn}
                      onChange={(e) => setSlogan({ ...slogan, rightTitleEn: e.target.value })}
                      placeholder="e.g. Empowering Tomorrow"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Right Title / Accent (Bangla)
                    </label>
                    <input
                      type="text"
                      required
                      value={slogan.rightTitleBn}
                      onChange={(e) => setSlogan({ ...slogan, rightTitleBn: e.target.value })}
                      placeholder="e.g. এম্পাওয়ারিং টুমোরো"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={sloganLoading}
                  className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-hover disabled:bg-neutral-800 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-brand-red/10 hover:shadow-brand-red/20 active:scale-98 transition-all text-[13px] cursor-pointer"
                >
                  {sloganLoading ? "Saving..." : "Save Banner Slogans"}
                </button>
              </div>
            </form>
          </div>

          {/* Brand Introduction Settings Card */}
          <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6">
            <form onSubmit={handleUpdateBrandIntro} className="space-y-5">
              <div>
                <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-dash-text-muted">
                  Brand Introduction Section
                </h3>
                <p className="text-[12px] text-dash-text-muted mt-1">
                  Manage the text contents shown inside the brand introduction overview block on the home page.
                </p>
              </div>

              {introMessage && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-[13px] font-bold rounded-xl animate-fade-in">
                  {introMessage}
                </div>
              )}
              {introError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[13px] font-bold rounded-xl animate-fade-in">
                  {introError}
                </div>
              )}

              <div className="space-y-4">
                {/* Subtitle EN/BN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Subtitle / Label (English)
                    </label>
                    <input
                      type="text"
                      required
                      value={brandIntro.subtitleEn}
                      onChange={(e) => setBrandIntro({ ...brandIntro, subtitleEn: e.target.value })}
                      placeholder="e.g. SEECO Transformer"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Subtitle / Label (Bangla)
                    </label>
                    <input
                      type="text"
                      required
                      value={brandIntro.subtitleBn}
                      onChange={(e) => setBrandIntro({ ...brandIntro, subtitleBn: e.target.value })}
                      placeholder="e.g. সিকো ট্রান্সফরমার"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>
                </div>

                {/* Title EN/BN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Title / Heading (English)
                    </label>
                    <input
                      type="text"
                      required
                      value={brandIntro.titleEn}
                      onChange={(e) => setBrandIntro({ ...brandIntro, titleEn: e.target.value })}
                      placeholder="e.g. High Quality Transformers"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Title / Heading (Bangla)
                    </label>
                    <input
                      type="text"
                      required
                      value={brandIntro.titleBn}
                      onChange={(e) => setBrandIntro({ ...brandIntro, titleBn: e.target.value })}
                      placeholder="e.g. উচ্চ মানের ডিস্ট্রিবিউশন ট্রান্সফরমার"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>
                </div>

                {/* Description EN */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                    Description Paragraph (English)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={brandIntro.descriptionEn}
                    onChange={(e) => setBrandIntro({ ...brandIntro, descriptionEn: e.target.value })}
                    placeholder="Describe the company's leading industry position and quality..."
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-y"
                  />
                </div>

                {/* Description BN */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                    Description Paragraph (Bangla)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={brandIntro.descriptionBn}
                    onChange={(e) => setBrandIntro({ ...brandIntro, descriptionBn: e.target.value })}
                    placeholder="কোম্পানির অগ্রণী অবস্থান ও গুণমানের বিবরণ বাংলাতে লিখুন..."
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-y"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={introLoading}
                  className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-hover disabled:bg-neutral-800 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-brand-red/10 hover:shadow-brand-red/20 active:scale-98 transition-all text-[13px] cursor-pointer"
                >
                  {introLoading ? "Saving..." : "Save Brand Introduction"}
                </button>
              </div>
            </form>
          </div>

          {/* Brand Banner Descriptions Card */}
          <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6">
            <form onSubmit={handleUpdateBrandBanner} className="space-y-5">
              <div>
                <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-dash-text-muted">
                  Brand Banner Descriptions
                </h3>
                <p className="text-[12px] text-dash-text-muted mt-1">
                  Manage the text paragraphs shown inside the split brand trust banner on the home page.
                </p>
              </div>

              {bannerMessage && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-[13px] font-bold rounded-xl animate-fade-in">
                  {bannerMessage}
                </div>
              )}
              {bannerError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[13px] font-bold rounded-xl animate-fade-in">
                  {bannerError}
                </div>
              )}

              <div className="space-y-4">
                {/* Paragraph 1 EN */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                    Left Paragraph 1 (English)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={brandBanner.leftPara1En}
                    onChange={(e) => setBrandBanner({ ...brandBanner, leftPara1En: e.target.value })}
                    placeholder="Paragraph 1 text..."
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-y"
                  />
                </div>

                {/* Paragraph 1 BN */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                    Left Paragraph 1 (Bangla)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={brandBanner.leftPara1Bn}
                    onChange={(e) => setBrandBanner({ ...brandBanner, leftPara1Bn: e.target.value })}
                    placeholder="অনুচ্ছেদ ১ এর লেখা..."
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-y"
                  />
                </div>

                {/* Paragraph 2 EN */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                    Left Paragraph 2 (English)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={brandBanner.leftPara2En}
                    onChange={(e) => setBrandBanner({ ...brandBanner, leftPara2En: e.target.value })}
                    placeholder="Paragraph 2 text..."
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-y"
                  />
                </div>

                {/* Paragraph 2 BN */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                    Left Paragraph 2 (Bangla)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={brandBanner.leftPara2Bn}
                    onChange={(e) => setBrandBanner({ ...brandBanner, leftPara2Bn: e.target.value })}
                    placeholder="অনুচ্ছেদ ২ এর লেখা..."
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-y"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={bannerLoading}
                  className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-hover disabled:bg-neutral-800 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-brand-red/10 hover:shadow-brand-red/20 active:scale-98 transition-all text-[13px] cursor-pointer"
                >
                  {bannerLoading ? "Saving..." : "Save Banner Descriptions"}
                </button>
              </div>
            </form>
          </div>

          {/* Site Assets & Images Card */}
          <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-dash-text-muted">
                Site Assets & Images
              </h3>
              <p className="text-[12px] text-dash-text-muted mt-1">
                Upload and replace site brand logo, browser favicon, and the homepage Contact CTA team image.
              </p>
            </div>

            {assetsMessage && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-[13px] font-bold rounded-xl animate-fade-in">
                {assetsMessage}
              </div>
            )}
            {assetsError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[13px] font-bold rounded-xl animate-fade-in">
                {assetsError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Site Header & Footer Logo */}
              <div className="p-4 rounded-xl bg-dash-hover-bg/30 border border-dash-border flex flex-col items-center text-center justify-between min-h-64">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                  Primary Brand Logo
                </span>
                
                <div className="my-4 h-16 w-full flex items-center justify-center relative">
                  {logoPath ? (
                    <img
                      src={logoPath}
                      alt="Brand Logo Preview"
                      className="max-h-full max-w-[200px] object-contain brightness-95"
                    />
                  ) : (
                    <span className="text-[12px] text-dash-text-muted">No Logo Configured</span>
                  )}
                </div>

                <div className="w-full space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMediaPickerTarget("logo");
                      setIsMediaPickerOpen(true);
                    }}
                    className="block w-full text-center bg-dash-card-bg hover:bg-dash-hover-bg border border-dash-border hover:border-brand-red/30 hover:text-brand-red text-dash-text font-bold py-2.5 px-4 rounded-xl text-[12px] transition-all cursor-pointer shadow-sm"
                  >
                    Choose Brand Logo
                  </button>
                  <p className="text-[9px] text-dash-text-muted font-medium">Select or upload from Media Library (Transparent PNG recommended)</p>
                </div>
              </div>

              {/* Contact CTA Image */}
              <div className="p-4 rounded-xl bg-dash-hover-bg/30 border border-dash-border flex flex-col items-center text-center justify-between min-h-64">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                  Contact CTA Team Photo
                </span>

                <div className="my-4 h-16 w-16 flex items-center justify-center relative border border-dashed border-dash-border rounded-xl p-0.5 bg-dash-card-bg overflow-hidden">
                  {contactCTAImagePath ? (
                    <img
                      src={contactCTAImagePath}
                      alt="Contact CTA Preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-[12px] text-dash-text-muted">None</span>
                  )}
                </div>

                <div className="w-full space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMediaPickerTarget("contactCTAImage");
                      setIsMediaPickerOpen(true);
                    }}
                    className="block w-full text-center bg-dash-card-bg hover:bg-dash-hover-bg border border-dash-border hover:border-brand-red/30 hover:text-brand-red text-dash-text font-bold py-2.5 px-4 rounded-xl text-[12px] transition-all cursor-pointer shadow-sm"
                  >
                    Choose Team Image
                  </button>
                  <p className="text-[9px] text-dash-text-muted font-medium">Select or upload from Media Library (Aspect ratio 4:5 recommended)</p>
                </div>
              </div>

              {/* Browser Favicon */}
              <div className="p-4 rounded-xl bg-dash-hover-bg/30 border border-dash-border flex flex-col items-center text-center justify-between min-h-64">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                  Browser Favicon
                </span>

                <div className="my-4 h-16 w-16 flex items-center justify-center relative border border-dashed border-dash-border rounded-xl p-3 bg-dash-card-bg">
                  {faviconPath ? (
                    <img
                      src={faviconPath}
                      alt="Favicon Preview"
                      className="h-10 w-10 object-contain"
                    />
                  ) : (
                    <span className="text-[12px] text-dash-text-muted">None</span>
                  )}
                </div>

                <div className="w-full space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMediaPickerTarget("favicon");
                      setIsMediaPickerOpen(true);
                    }}
                    className="block w-full text-center bg-dash-card-bg hover:bg-dash-hover-bg border border-dash-border hover:border-brand-red/30 hover:text-brand-red text-dash-text font-bold py-2.5 px-4 rounded-xl text-[12px] transition-all cursor-pointer shadow-sm"
                  >
                    Choose Favicon
                  </button>
                  <p className="text-[9px] text-dash-text-muted font-medium">Select or upload from Media Library (Square proportions recommended)</p>
                </div>
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

          {/* Welcome Modal Configuration Card */}
          <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6">
            <form onSubmit={handleUpdateWelcomeModal} className="space-y-5">
              <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-dash-text-muted mb-4">
                Welcome Popup Modal
              </h3>

              {welcomeMessage && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-[13px] font-bold rounded-xl animate-fade-in">
                  {welcomeMessage}
                </div>
              )}
              {welcomeError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[13px] font-bold rounded-xl animate-fade-in">
                  {welcomeError}
                </div>
              )}

              {/* Status active/inactive switch toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-dash-hover-bg/30 border border-dash-border">
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold">Show Welcome Notice</span>
                  <span className="text-[10px] text-dash-text-muted mt-0.5">Toggle welcome image modal popup</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={welcomeActive}
                    onChange={(e) => setWelcomeActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-red" />
                </label>
              </div>

              {/* Image picker */}
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                  Notice Image Banner
                </span>
                <div className="flex flex-col items-center border border-dashed border-dash-border rounded-xl p-4 bg-dash-hover-bg/10 min-h-48 justify-center gap-3">
                  {welcomeImagePath ? (
                    <img
                      src={welcomeImagePath}
                      alt="Welcome Modal Banner Preview"
                      className="max-h-40 max-w-full object-contain rounded-lg shadow-sm"
                    />
                  ) : (
                    <span className="text-[12px] text-dash-text-muted">No Image Selected</span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setMediaPickerTarget("welcomeModalImage");
                      setIsMediaPickerOpen(true);
                    }}
                    className="bg-dash-card-bg hover:bg-dash-hover-bg border border-dash-border hover:border-brand-red/30 hover:text-brand-red text-dash-text font-bold py-2 px-4 rounded-lg text-[12px] transition-all cursor-pointer shadow-xs"
                  >
                    {welcomeImagePath ? "Change Image" : "Select Image"}
                  </button>
                </div>
              </div>

              {/* Max show count input */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                  Maximum Show Count (Times)
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  required
                  value={welcomeMaxShowCount}
                  onChange={(e) => setWelcomeMaxShowCount(Number(e.target.value) || 1)}
                  className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text font-semibold"
                  placeholder="e.g. 5"
                />
                <p className="text-[10px] text-dash-text-muted leading-relaxed">
                  The popup will show to each visitor up to this number of times before staying hidden.
                </p>
              </div>

              <button
                type="submit"
                disabled={welcomeLoading}
                className="w-full bg-brand-red hover:bg-brand-red-hover disabled:bg-neutral-800 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-brand-red/10 hover:shadow-brand-red/20 active:scale-98 transition-all text-[14px] cursor-pointer mt-4"
              >
                {welcomeLoading ? "Saving..." : "Save Welcome Settings"}
              </button>
            </form>
          </div>

          {/* Social Media & Google Map Settings Card */}
          <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6">
            <form onSubmit={handleUpdateSocialsAndMap} className="space-y-5">
              <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-dash-text-muted mb-4">
                Social Links & Google Map Embed
              </h3>

              {socialMessage && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-[13px] font-bold rounded-xl animate-fade-in">
                  {socialMessage}
                </div>
              )}
              {socialError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[13px] font-bold rounded-xl animate-fade-in">
                  {socialError}
                </div>
              )}

              <div className="space-y-4">
                {/* Facebook */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                    Facebook Page URL
                  </label>
                  <input
                    type="url"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    placeholder="e.g. https://facebook.com/..."
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                  />
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="e.g. https://linkedin.com/in/..."
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                  />
                </div>

                {/* Instagram */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="e.g. https://instagram.com/..."
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                  />
                </div>

                {/* YouTube */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                    YouTube Channel URL
                  </label>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="e.g. https://youtube.com/..."
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                  />
                </div>

                {/* Google Maps iframe URL */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                    Google Maps Embed Link (iframe src)
                  </label>
                  <textarea
                    rows={3}
                    value={mapEmbedUrl}
                    onChange={(e) => setMapEmbedUrl(e.target.value)}
                    placeholder="e.g. https://www.google.com/maps/embed?pb=..."
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={socialLoading}
                className="w-full bg-brand-red hover:bg-brand-red-hover disabled:bg-neutral-800 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-brand-red/10 hover:shadow-brand-red/20 active:scale-98 transition-all text-[14px] cursor-pointer mt-4"
              >
                {socialLoading ? "Saving..." : "Save Links & Map"}
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

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => {
          setIsMediaPickerOpen(false);
          setMediaPickerTarget(null);
        }}
        onSelect={handleSelectMedia}
        allowedTypes="images"
      />

      </div>

    </div>
  );
}
