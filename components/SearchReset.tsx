"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function SearchReset() {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      className="search_icon"
      onClick={reset}
      type="reset"
    >
      <Link href="/">
        <X className="text-white size-5" />
      </Link>
    </motion.button>
  );
}
