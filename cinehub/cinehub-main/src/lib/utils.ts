import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type UtmParams = {
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
};

export function buildUrlWithUtm(baseUrl: string, params: UtmParams): string {
  // Avoid trying to add params to placeholder URLs
  if (baseUrl.startsWith("COLE_AQUI") || !baseUrl) {
    return "#";
  }

  try {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(`utm_${key}`, value);
      }
    });
    return url.toString();
  } catch (error) {
    console.error("Invalid base URL for UTM builder:", baseUrl);
    return baseUrl; // Return base URL if it's invalid
  }
}
