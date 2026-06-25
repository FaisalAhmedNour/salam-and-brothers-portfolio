/**
 * Utility functions for color calculations.
 * Client-safe (no node.js / server dependencies).
 */

/**
 * Darkens a hex color by a specified percentage.
 * Helper for generating hover styles automatically.
 * 
 * @param hex The hex color code (e.g., "#dc2626")
 * @param percent Percentage to darken the color by (0 - 100)
 * @returns The darkened hex color code
 */
export function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  let R = (num >> 16) - amt;
  let G = ((num >> 8) & 0x00ff) - amt;
  let B = (num & 0x0000ff) - amt;

  R = R < 0 ? 0 : R > 255 ? 255 : R;
  G = G < 0 ? 0 : G > 255 ? 255 : G;
  B = B < 0 ? 0 : B > 255 ? 255 : B;

  return (
    "#" +
    (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)
  );
}
