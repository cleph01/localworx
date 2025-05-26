// components/ui/LazyLoadWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  rootMargin?: string;
  className?: string;
  fallback?: React.ReactNode; // shown until inView + delay
  delayMs?: number; // optional delay before rendering
  timeoutMs?: number; // optional max wait time fallback
}

export default function LazyLoadWrapper({
  children,
  rootMargin = "200px",
  className = "",
  fallback = null,
  delayMs = 0,
  timeoutMs,
}: LazyLoadWrapperProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin,
  });

  const [shouldRender, setShouldRender] = useState(false);

  // Delay before rendering
  useEffect(() => {
    if (!inView) return;

    const delayTimer = setTimeout(() => {
      setShouldRender(true);
    }, delayMs);

    return () => clearTimeout(delayTimer);
  }, [inView, delayMs]);

  // Optional timeout fallback
  useEffect(() => {
    if (!timeoutMs) return;

    const timeout = setTimeout(() => {
      setShouldRender(true);
    }, timeoutMs);

    return () => clearTimeout(timeout);
  }, [timeoutMs]);

  return (
    <div ref={ref} className={className}>
      {shouldRender ? children : fallback}
    </div>
  );
}

/**
 * Lazy Map with Spinner Placeholder
  <LazyLoadWrapper
  fallback={<p className="text-center text-sm text-gray-400">Loading map...</p>}
  delayMs={300}
  timeoutMs={4000}
>
  <Map center={{ lat: 34.8526, lng: -82.3940 }} />
</LazyLoadWrapper>

 */

/**
 * Lazy Image with Gray Box Placeholder 
  <LazyLoadWrapper
  fallback={<div className="w-full h-48 bg-gray-200 rounded animate-pulse" />}
  delayMs={200}
  timeoutMs={5000}
>
  <img
    src={imageUrl}
    alt="Business preview"
    className="w-full h-48 object-cover rounded"
  />
</LazyLoadWrapper>

 */

/**
 * Lazy Video with Timeout Fallback
  <LazyLoadWrapper
  fallback={<div className="w-full aspect-video bg-black/10 animate-pulse" />}
  delayMs={500}
  timeoutMs={6000}
>
  <video controls className="w-full h-auto rounded shadow">
    <source src={mediaUrl} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</LazyLoadWrapper>
 
 */
