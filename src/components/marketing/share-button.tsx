"use client";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButton() {
  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };
  return (
    <Button variant="ghost" onClick={handleShare} className="flex items-center gap-2">
      <Share2 className="w-4 h-4" /> Share
    </Button>
  );
}
