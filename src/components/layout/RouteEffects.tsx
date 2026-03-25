"use client";

import { usePathname } from "next/navigation";
import GrainOverlay from "@/components/ui/GrainOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function RouteEffects() {
  const pathname = usePathname();
  const isCanvasRoute = pathname?.startsWith("/canvas");

  if (isCanvasRoute) {
    return null;
  }

  return (
    <>
      <GrainOverlay />
      <ScrollProgress />
    </>
  );
}
