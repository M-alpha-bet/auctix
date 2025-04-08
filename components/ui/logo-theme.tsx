"use client";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Logo() {
  const { theme } = useTheme();
  return (
    <div>
      {theme === "dark" ? (
        <Image src="/logo-light.png" alt="logo" width={114} height={30} />
      ) : (
        <Image src="/logo-dark.png" alt="logo" width={114} height={30} />
      )}
    </div>
  );
}
