import { useEffect } from "react";

/**
 * Injects (or removes) a <link rel="canonical"> tag. Pass null to render nothing.
 * Reconciles with an existing canonical tag (e.g. one rendered server-side)
 * instead of blindly appending a duplicate.
 */
export function useCanonicalLink(href: string | null) {
  useEffect(() => {
    if (!href) return;

    const existing = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (existing) {
      const prevHref = existing.href;
      existing.href = href;
      return () => {
        existing.href = prevHref;
      };
    }

    const el = document.createElement("link");
    el.rel = "canonical";
    el.href = href;
    document.head.appendChild(el);
    return () => {
      el.remove();
    };
  }, [href]);
}
