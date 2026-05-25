"use client";

import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";
import { SITE } from "@/content/site";

export function WhatsAppLink() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackWhatsAppClick}
      className="flex items-center gap-4 group"
    >
      <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
        <MessageCircle className="w-5 h-5 text-[#25D366]" />
      </div>
      <div>
        <span className="block text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
          WhatsApp
        </span>
        <span className="block text-xs text-[var(--text-muted)]">{SITE.phone}</span>
      </div>
    </a>
  );
}
