import { useEffect } from "react";

/** Injects (or removes) a <link rel="canonical"> tag. Pass null to render nothing. */
export function useCanonicalLink(href: string | null) {
  useEffect(() => {
    if (!href) return;
    const el = document.createElement("link");
    el.rel = "canonical";
    el.href = href;
    document.head.appendChild(el);
    return () => {
      document.head.removeChild(el);
    };
  }, [href]);
}
