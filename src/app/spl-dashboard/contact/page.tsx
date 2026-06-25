"use client";

import { useState, useEffect } from "react";
import { useDashboard } from "@/context/DashboardContext";

interface ContactInfo {
  addressEn: string;
  addressBn: string;
  factoryAddressEn: string;
  factoryAddressBn: string;
  email: string;
  email2: string;
  phone: string;
}

/**
 * DashboardContactSettings Component.
 * Admin dashboard page for configuring the company's official contact information
 * such as office location, factory location, primary support emails, and phone numbers.
 * Changes apply dynamically to Header, Footer, and Contact cards.
 */
export default function DashboardContactSettings() {
  const { theme } = useDashboard();
  const [info, setInfo] = useState<ContactInfo>({
    addressEn: "",
    addressBn: "",
    factoryAddressEn: "",
    factoryAddressBn: "",
    email: "",
    email2: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [activeFormTab, setActiveFormTab] = useState<"general" | "en" | "bn">("general");

  const fetchContactSettings = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/spl-dashboard/contact");
      if (res.ok) {
        const data = await res.json();
        setInfo(data);
      } else {
        const errData = await res.json();
        setErrorMsg(errData.error || "Failed to load contact settings.");
      }
    } catch (err) {
      setErrorMsg("Network error loading contact settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactSettings();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/spl-dashboard/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });

      if (res.ok) {
        showToast("Contact details saved successfully!");
        fetchContactSettings();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to save contact settings.");
      }
    } catch (err) {
      alert("Network error updating contact settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-dash-text select-none">
      
      {/* Title Header */}
      <div>
        <h2 className="text-[24px] font-extrabold tracking-wide">Company Contact Settings</h2>
        <p className="text-[14px] text-dash-text-muted mt-1">
          Manage the official office locations, dispatch factories, phone numbers, and support email addresses.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-500/10 text-red-500 rounded-xl text-[13px] font-semibold border border-red-500/20 max-w-3xl">
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-dash-card-bg border border-dash-border rounded-3xl max-w-3xl">
          <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
          <p className="text-[13px] text-dash-text-muted mt-3 font-semibold">Loading contact details...</p>
        </div>
      ) : (
        <div className="bg-dash-card-bg border border-dash-border rounded-3xl max-w-3xl overflow-hidden flex flex-col">
          
          {/* Internal sub-tabs for General details vs localizations */}
          <div className="flex bg-dash-hover-bg/30 px-6 border-b border-dash-border shrink-0 gap-1.5 py-3">
            {[
              { id: "general", label: "General details" },
              { id: "en", label: "English address details" },
              { id: "bn", label: "Bangla address details" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFormTab(tab.id as any)}
                className={[
                  "px-4 py-2 text-[13px] font-bold rounded-lg cursor-pointer transition-all",
                  activeFormTab === tab.id
                    ? "bg-dash-card-bg text-dash-text border border-dash-border shadow-xs"
                    : "text-dash-text-muted hover:text-dash-text hover:bg-dash-hover-bg/45",
                ].join(" ")}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Tab 1: General Details */}
            {activeFormTab === "general" && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                    Official Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={info.phone}
                    onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                    placeholder="e.g. +88 01714-102859"
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Primary Email */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      General Inquiry Email (Primary)
                    </label>
                    <input
                      type="email"
                      required
                      value={info.email}
                      onChange={(e) => setInfo({ ...info, email: e.target.value })}
                      placeholder="e.g. info@seecopowerlimited.com"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text font-semibold"
                    />
                  </div>

                  {/* Secondary Email */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                      Sales / Support Email (Secondary)
                    </label>
                    <input
                      type="email"
                      required
                      value={info.email2}
                      onChange={(e) => setInfo({ ...info, email2: e.target.value })}
                      placeholder="e.g. sales@seecopowerlimited.com"
                      className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text font-semibold"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* Tab 2: English address details */}
            {activeFormTab === "en" && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Head office address EN */}
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                    Head Office Address (English)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={info.addressEn}
                    onChange={(e) => setInfo({ ...info, addressEn: e.target.value })}
                    placeholder="e.g. 3rd Floor, 5 BCC Rd, Dhaka 1203"
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text font-semibold resize-none"
                  />
                </div>

                {/* Factory address EN */}
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                    Factory Address (English)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={info.factoryAddressEn}
                    onChange={(e) => setInfo({ ...info, factoryAddressEn: e.target.value })}
                    placeholder="e.g. Ekuria Tila Bari, South Keranigonj Dhaka- 1311"
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text font-semibold resize-none"
                  />
                </div>

              </div>
            )}

            {/* Tab 3: Bangla address details */}
            {activeFormTab === "bn" && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Head office address BN */}
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                    Head Office Address (Bangla)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={info.addressBn}
                    onChange={(e) => setInfo({ ...info, addressBn: e.target.value })}
                    placeholder="যেমন: ৩য় তলা, ৫ বিসিসি রোড, ঢাকা ১২০৩"
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text font-semibold resize-none"
                  />
                </div>

                {/* Factory address BN */}
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-dash-text-muted block">
                    Factory Address (Bangla)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={info.factoryAddressBn}
                    onChange={(e) => setInfo({ ...info, factoryAddressBn: e.target.value })}
                    placeholder="যেমন: একুরিয়া টিলা বাড়ি, দক্ষিণ কেরানীগঞ্জ ঢাকা- ১৩১১"
                    className="w-full bg-dash-hover-bg/30 border border-dash-border focus:border-brand-red/30 rounded-xl px-4 py-3 text-[14px] focus:outline-hidden text-dash-text font-semibold resize-none"
                  />
                </div>

              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-dash-border">
              <button
                type="submit"
                disabled={saving}
                className="bg-brand-red hover:bg-brand-red-hover text-white text-[14px] font-bold px-6 py-3 rounded-xl shadow-lg shadow-brand-red/10 active:scale-98 transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                {saving && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                <span>Save Contact Info</span>
              </button>
            </div>

          </form>

        </div>
      )}

      {/* Floating Notification Toast */}
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
