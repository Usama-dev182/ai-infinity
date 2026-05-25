"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

interface PageEventTrackerProps {
  eventName: string;
  params?: Record<string, string | number | boolean>;
}

export function PageEventTracker({ eventName, params }: PageEventTrackerProps) {
  const lastTrackedKey = useRef<string | null>(null);

  useEffect(() => {
    const trackingKey = `${eventName}:${JSON.stringify(params ?? {})}`;
    if (lastTrackedKey.current === trackingKey) return;

    trackEvent(eventName, params);
    lastTrackedKey.current = trackingKey;
  }, [eventName, params]);

  return null;
}