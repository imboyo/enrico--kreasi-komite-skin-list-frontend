"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import NavigationProgressBar from "@/components/atomic/atom/NavigationProgressBar";

export default function NavigationProgressProvider() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  // Keep ref to the interval so we can clear it anytime
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Track the pathname at the moment navigation started to detect completion
  const startPathnameRef = useRef<string>(pathname);

  function startProgress() {
    // Already running — do nothing
    if (visible) return;

    setProgress(10);
    setVisible(true);
    startPathnameRef.current = pathname;

    // Slowly crawl the bar toward 90% while waiting for the route to load
    tickRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          if (tickRef.current) clearInterval(tickRef.current);
          return 90;
        }
        // Decelerate as it gets closer to 90
        return prev + Math.max(1, (90 - prev) * 0.1);
      });
    }, 200);
  }

  function finishProgress() {
    if (tickRef.current) clearInterval(tickRef.current);
    setProgress(100);
    // Hide the bar shortly after it reaches 100%
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 400);
  }

  // Detect navigation completion: pathname changed after we started
  useEffect(() => {
    if (visible && pathname !== startPathnameRef.current) {
      finishProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Listen for link clicks to start the progress bar
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Only track same-origin, non-hash internal navigations
      const isInternal =
        href.startsWith("/") ||
        href.startsWith(window.location.origin);
      const isHash = href.startsWith("#");
      const isExternal = anchor.target === "_blank";

      if (!isInternal || isHash || isExternal) return;

      // Don't start if already on that page
      const targetPath = href.startsWith("/")
        ? href
        : href.replace(window.location.origin, "");
      if (targetPath === pathname) return;

      startProgress();
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, visible]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  return <NavigationProgressBar progress={progress} visible={visible} />;
}
