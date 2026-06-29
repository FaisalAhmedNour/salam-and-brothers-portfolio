"use client";

import { useEffect } from "react";
import { darkenColor } from "@/lib/colorUtils";

/**
 * SiteThemeInitializer Component.
 * Runs client-side on mount to check if the visitor has set a personalized
 * brand color override in localStorage, updating the DOM stylesheet properties.
 */
export default function SiteThemeInitializer() {
  useEffect(() => {
    try {
      const adminColor = document.documentElement.getAttribute("data-default-color") || "#dc2626";
      const lastAdminColor = localStorage.getItem("last_admin_color");

      // Reset visitor's custom color selection if the admin has updated the brand color scheme
      if (lastAdminColor !== adminColor) {
        localStorage.removeItem("user_site_color");
        localStorage.setItem("last_admin_color", adminColor);
      }

      const userColor = localStorage.getItem("user_site_color");
      if (userColor && /^#[0-9A-F]{6}$/i.test(userColor)) {
        document.documentElement.style.setProperty("--primary-color", userColor);
        const hoverColor = darkenColor(userColor, 15);
        document.documentElement.style.setProperty("--primary-color-hover", hoverColor);
      }
    } catch (err) {
      console.warn("ThemeInitializer: Failed to apply local theme color configuration:", err);
    }
  }, []);

  return null;
}
