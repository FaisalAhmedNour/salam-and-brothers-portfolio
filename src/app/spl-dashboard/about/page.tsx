"use client";

import { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import MediaPickerModal from "@/components/spl-dashboard/MediaPickerModal";

export default function DashboardAboutSettings() {
  const { theme } = useDashboard();
  const [loading, setLoading] = useState(true);

  // About Intro texts state
  const [aboutIntro, setAboutIntro] = useState({
    subtitleEn: "",
    subtitleBn: "",
    titleEn: "",
    titleBn: "",
    para1En: "",
    para1Bn: "",
    para2En: "",
    para2Bn: "",
  });

  // About Intro Image path state
  const [aboutImagePath, setAboutImagePath] = useState("");

  // Mission, Vision, and Values states
  const [missionPointsEnText, setMissionPointsEnText] = useState("");
  const [missionPointsBnText, setMissionPointsBnText] = useState("");
  const [visionTextEn, setVisionTextEn] = useState("");
  const [visionTextBn, setVisionTextBn] = useState("");
  const [valuesPointsEnText, setValuesPointsEnText] = useState("");
  const [valuesPointsBnText, setValuesPointsBnText] = useState("");

  // Status indicators
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Media Picker state
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  useEffect(() => {
    async function loadAboutSettings() {
      try {
        const res = await fetch("/api/spl-dashboard/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.siteSettings) {
            if (data.siteSettings.aboutIntro) {
              setAboutIntro(data.siteSettings.aboutIntro);
            }
            if (data.siteSettings.aboutImagePath) {
              setAboutImagePath(data.siteSettings.aboutImagePath);
            }
            if (data.siteSettings.missionVision) {
              const mv = data.siteSettings.missionVision;
              setMissionPointsEnText((mv.missionPointsEn || []).join("\n"));
              setMissionPointsBnText((mv.missionPointsBn || []).join("\n"));
              setVisionTextEn(mv.visionTextEn || "");
              setVisionTextBn(mv.visionTextBn || "");
              setValuesPointsEnText((mv.valuesPointsEn || []).join("\n"));
              setValuesPointsBnText((mv.valuesPointsBn || []).join("\n"));
            }
          }
        }
      } catch (err) {
        console.error("Failed to load about us settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAboutSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    const missionVision = {
      missionPointsEn: missionPointsEnText.split("\n").map(l => l.trim()).filter(Boolean),
      missionPointsBn: missionPointsBnText.split("\n").map(l => l.trim()).filter(Boolean),
      visionTextEn,
      visionTextBn,
      valuesPointsEn: valuesPointsEnText.split("\n").map(l => l.trim()).filter(Boolean),
      valuesPointsBn: valuesPointsBnText.split("\n").map(l => l.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/spl-dashboard/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aboutIntro,
          aboutImagePath,
          missionVision,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage("About Us configurations saved successfully!");
      } else {
        setError(data.error || "Failed to update About Us settings.");
      }
    } catch (err) {
      setError("Network error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const handleSelectMedia = async (url: string) => {
    setAboutImagePath(url);
    setIsMediaPickerOpen(false);

    try {
      const res = await fetch("/api/spl-dashboard/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aboutImagePath: url,
        }),
      });
      if (!res.ok) {
        console.error("Failed to auto-save About Us banner image.");
      }
    } catch (err) {
      console.error("Network error auto-saving About Us banner image:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Page Info bar */}
      <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-[22px] font-black text-dash-text tracking-tight">
            About Us Settings
          </h1>
          <p className="text-[12px] text-dash-text-muted mt-0.5">
            Customize the introduction texts and banner photo displayed on the public About page.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Columns: Text configurations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-dash-text-muted mb-4">
                Introduction Texts
              </h3>

              {message && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-[13px] font-bold rounded-xl animate-fade-in">
                  {message}
                </div>
              )}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[13px] font-bold rounded-xl animate-fade-in">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Subtitle */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Subtitle (English)
                    </label>
                    <input
                      type="text"
                      required
                      value={aboutIntro.subtitleEn}
                      onChange={(e) => setAboutIntro({ ...aboutIntro, subtitleEn: e.target.value })}
                      placeholder="e.g. Powering Bangladesh's Energy Grid"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Subtitle (Bangla)
                    </label>
                    <input
                      type="text"
                      required
                      value={aboutIntro.subtitleBn}
                      onChange={(e) => setAboutIntro({ ...aboutIntro, subtitleBn: e.target.value })}
                      placeholder="e.g. বাংলাদেশের বিদ্যুৎ অবকাঠামো বিনির্মাণে"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Title (English)
                    </label>
                    <input
                      type="text"
                      required
                      value={aboutIntro.titleEn}
                      onChange={(e) => setAboutIntro({ ...aboutIntro, titleEn: e.target.value })}
                      placeholder="e.g. Leading Electrical Solutions Provider"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Title (Bangla)
                    </label>
                    <input
                      type="text"
                      required
                      value={aboutIntro.titleBn}
                      onChange={(e) => setAboutIntro({ ...aboutIntro, titleBn: e.target.value })}
                      placeholder="e.g. উন্নত বৈদ্যুতিক সমাধান সরবরাহকারী"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold"
                    />
                  </div>
                </div>

                {/* Paragraph 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Paragraph 1 (English)
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={aboutIntro.para1En}
                      onChange={(e) => setAboutIntro({ ...aboutIntro, para1En: e.target.value })}
                      placeholder="Enter paragraph 1 text..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[13px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Paragraph 1 (Bangla)
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={aboutIntro.para1Bn}
                      onChange={(e) => setAboutIntro({ ...aboutIntro, para1Bn: e.target.value })}
                      placeholder="অনুচ্ছেদ ১ এর লেখা লিখুন..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[13px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-none"
                    />
                  </div>
                </div>

                {/* Paragraph 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Paragraph 2 (English)
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={aboutIntro.para2En}
                      onChange={(e) => setAboutIntro({ ...aboutIntro, para2En: e.target.value })}
                      placeholder="Enter paragraph 2 text..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[13px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Paragraph 2 (Bangla)
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={aboutIntro.para2Bn}
                      onChange={(e) => setAboutIntro({ ...aboutIntro, para2Bn: e.target.value })}
                      placeholder="অনুচ্ছেদ ২ এর লেখা লিখুন..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[13px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-hover disabled:bg-neutral-800 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-brand-red/10 hover:shadow-brand-red/20 active:scale-98 transition-all text-[13px] cursor-pointer"
                >
                  {saving ? "Saving..." : "Save About Us Texts"}
                </button>
              </div>
            </form>
          </div>

          {/* Mission, Vision & Values Card */}
          <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6 mt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-dash-text-muted">
                  Mission, Vision & Values
                </h3>
                <p className="text-[12px] text-dash-text-muted mt-1">
                  Manage the Mission points, Vision statements, and Core Values lists. Enter each item/point on a new line.
                </p>
              </div>

              <div className="space-y-4">
                {/* Vision Text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Vision Statement (English)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={visionTextEn}
                      onChange={(e) => setVisionTextEn(e.target.value)}
                      placeholder="e.g. To become a leading transformer manufacturer..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Vision Statement (Bangla)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={visionTextBn}
                      onChange={(e) => setVisionTextBn(e.target.value)}
                      placeholder="e.g. দেশব্যাপী টেকসই এবং নিরবচ্ছিন্ন বিদ্যুৎ নিশ্চিত করতে..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-none"
                    />
                  </div>
                </div>

                {/* Mission Points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Mission Points (English - One per line)
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={missionPointsEnText}
                      onChange={(e) => setMissionPointsEnText(e.target.value)}
                      placeholder="To manufacture high-quality, cost effective transformers..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[13px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Mission Points (Bangla - One per line)
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={missionPointsBnText}
                      onChange={(e) => setMissionPointsBnText(e.target.value)}
                      placeholder="বাংলাদেশের পরিবেশ ও গ্রিড ব্যবস্থার উপযোগী..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[13px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-none"
                    />
                  </div>
                </div>

                {/* Values Points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Value Items / Points (English - One per line)
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={valuesPointsEnText}
                      onChange={(e) => setValuesPointsEnText(e.target.value)}
                      placeholder="Power Transformers (up to 132kV and beyond)..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[13px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-dash-text-muted">
                      Value Items / Points (Bangla - One per line)
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={valuesPointsBnText}
                      onChange={(e) => setValuesPointsBnText(e.target.value)}
                      placeholder="পাওয়ার ট্রান্সফরমার (১৩২কেভি এবং এর বেশি)..."
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[13px] focus:outline-hidden text-dash-text placeholder-dash-text-muted/40 font-semibold resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto bg-brand-red hover:bg-brand-red-hover disabled:bg-neutral-800 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-brand-red/10 hover:shadow-brand-red/20 active:scale-98 transition-all text-[13px] cursor-pointer"
                >
                  {saving ? "Saving..." : "Save Mission & Vision"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: About Banner Photo Picker */}
        <div className="space-y-6">
          <div className="bg-dash-card-bg border border-dash-border rounded-2xl p-6 flex flex-col items-center text-center justify-between min-h-80">
            <div className="w-full">
              <h3 className="font-extrabold text-[14px] uppercase tracking-wider text-dash-text-muted">
                About Us Banner Photo
              </h3>
              <p className="text-[11px] text-dash-text-muted mt-1">
                Upload or select a photo from the Media Library to show beside the introduction texts.
              </p>
            </div>

            <div className="my-6 h-36 w-full flex items-center justify-center relative border border-dashed border-dash-border rounded-2xl p-0.5 bg-dash-hover-bg/20 overflow-hidden">
              {aboutImagePath ? (
                <img
                  src={aboutImagePath}
                  alt="About Us Banner Preview"
                  className="h-full w-full object-cover rounded-xl"
                />
              ) : (
                <span className="text-[12px] text-dash-text-muted">None Selected</span>
              )}
            </div>

            <div className="w-full space-y-2">
              <button
                type="button"
                onClick={() => setIsMediaPickerOpen(true)}
                className="block w-full text-center bg-brand-red hover:bg-brand-red-hover text-white font-bold py-2.5 px-4 rounded-xl text-[12px] transition-all cursor-pointer shadow-md"
              >
                Choose Banner Photo
              </button>
              <p className="text-[9px] text-dash-text-muted font-semibold tracking-wide">
                Square or Landscape aspect ratios recommended
              </p>
            </div>
          </div>
        </div>
      </div>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onSelect={handleSelectMedia}
        onClose={() => setIsMediaPickerOpen(false)}
        allowedTypes="images"
      />
    </div>
  );
}
