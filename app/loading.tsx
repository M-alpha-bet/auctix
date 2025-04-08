"use client";

import { ClimbingBoxLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <ClimbingBoxLoader color="#000000" size={20} />
    </div>
  );
}
