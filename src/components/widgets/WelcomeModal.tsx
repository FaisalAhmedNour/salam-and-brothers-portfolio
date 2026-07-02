"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

/**
 * WelcomeModal Component.
 * Displays a configurable welcome notice modal popup to website visitors.
 * Controlled by the admin settings panel (image path, active state, and max show count).
 * Stores show counts in localStorage to respect show count limits.
 * Resets show counts when the active notice image path changes (new announcement).
 */
export default function WelcomeModal() {
  const { welcomeModal } = useLanguage();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !welcomeModal || !welcomeModal.active || !welcomeModal.imagePath) {
      return;
    }

    // Do not show on admin dashboard or login pages
    if (pathname && pathname.startsWith("/spl-dashboard")) {
      return;
    }

    // Retrieve the active image and show count from localStorage
    const currentBannerImage = localStorage.getItem("welcome_modal_banner_image");
    const showCountStr = localStorage.getItem("welcome_modal_show_count");
    let currentShowCount = showCountStr ? Number(showCountStr) : 0;

    // Reset show count if the image path has changed (new announcement banner)
    if (currentBannerImage !== welcomeModal.imagePath) {
      currentShowCount = 0;
      try {
        localStorage.setItem("welcome_modal_banner_image", welcomeModal.imagePath);
        localStorage.setItem("welcome_modal_show_count", "0");
      } catch (err) {
        console.warn("WelcomeModal: Failed to initialize localStorage values:", err);
      }
    }

    const maxShowLimit = welcomeModal.maxShowCount || 5;

    if (currentShowCount >= maxShowLimit) {
      // Modal has reached its maximum show limit for this user
      return;
    }

    // If active and limit not reached, show the modal
    setIsOpen(true);

    // Increment and save show count in localStorage
    try {
      localStorage.setItem("welcome_modal_show_count", String(currentShowCount + 1));
    } catch (err) {
      console.warn("WelcomeModal: Failed to update show count in localStorage:", err);
    }
  }, [mounted, welcomeModal]);

  const handleDismiss = () => {
    setIsOpen(false);
  };

  if (!mounted || !isOpen || !welcomeModal?.imagePath) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fade-in transition-all duration-300"
      onClick={handleDismiss}
    >
      <div
        className="relative max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-black/10 flex flex-col items-center animate-scale-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
      >
        {/* Absolute Close/Cross Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-all cursor-pointer shadow-md"
          aria-label="Close welcome banner"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        {/* Modal Announcement Banner */}
        <div className="relative w-full overflow-hidden flex items-center justify-center p-2">
          <img
            src={welcomeModal.imagePath}
            alt="SPL Welcome Announcement"
            className="w-full h-auto max-h-[80vh] object-contain rounded-2xl select-none"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
