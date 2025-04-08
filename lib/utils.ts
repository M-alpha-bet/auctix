import { writeClient } from "@/sanity/lib/write-client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);

  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return `${day}${getOrdinal(day)} ${month} ${year}`;
};

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (
      (num / 1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 1) +
      " billion"
    );
  }
  if (num >= 1_000_000) {
    return (
      (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + " million"
    );
  }
  if (num >= 1_000) {
    return num.toLocaleString(); // adds commas like 10,000
  }
  return num.toString();
}

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}
