"use client";

import { useEffect } from "react";
import { darkenColor } from "@/lib/colorUtils";

/**
 * SiteThemeInitializer Component.
 * Runs client-side on mount to check if the visitor has set a personalized
 * brand color override in localStorage, updating the DOM stylesheet properties.
 * Also queries settings dynamically to resolve stale cached static layouts in production.
 */
export default function SiteThemeInitializer() {
  useEffect(() => {
    try {
      // 1. Immediately apply visitor's custom color preference if stored
      const userColor = localStorage.getItem("user_site_color");
      if (userColor && /^#[0-9A-F]{6}$/i.test(userColor)) {
        document.documentElement.style.setProperty("--primary-color", userColor);
        const hoverColor = darkenColor(userColor, 15);
        document.documentElement.style.setProperty("--primary-color-hover", hoverColor);
      }

      // 2. Fetch the latest settings from the server to check for admin brand color updates dynamically.
      // This bypasses the stale layout cache issue in server deployments.
      fetch("/api/public/settings")
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Failed to fetch settings");
        })
        .then((data) => {
          if (data && data.primaryColor) {
            const adminColor = data.primaryColor;
            const lastAdminColor = localStorage.getItem("last_admin_color");

            // Reset visitor's custom color selection if the admin has updated the brand color scheme
            if (lastAdminColor !== adminColor) {
              localStorage.removeItem("user_site_color");
              localStorage.setItem("last_admin_color", adminColor);

              // Apply the new admin color immediately since visitor overrides are cleared
              document.documentElement.style.setProperty("--primary-color", adminColor);
              const hoverColor = data.primaryColorHover || darkenColor(adminColor, 15);
              document.documentElement.style.setProperty("--primary-color-hover", hoverColor);
            } else {
              // Ensure we apply the correct brand color if no user override exists
              const currentUserColor = localStorage.getItem("user_site_color");
              if (!currentUserColor) {
                document.documentElement.style.setProperty("--primary-color", adminColor);
                const hoverColor = data.primaryColorHover || darkenColor(adminColor, 15);
                document.documentElement.style.setProperty("--primary-color-hover", hoverColor);
              }
            }

            // Sync data-default-color attributes for other widgets (e.g. PublicColorPicker)
            document.documentElement.setAttribute("data-default-color", adminColor);
            document.documentElement.setAttribute("data-default-color-hover", data.primaryColorHover || darkenColor(adminColor, 15));

            // Notify color pickers to update their display state
            window.dispatchEvent(new Event("siteColorChanged"));
          }
        })
        .catch((err) => {
          console.warn("ThemeInitializer: Failed to fetch dynamic brand color configuration:", err);
        });
    } catch (err) {
      console.warn("ThemeInitializer: Failed to apply local theme color configuration:", err);
    }
  }, []);

  return null;
}
