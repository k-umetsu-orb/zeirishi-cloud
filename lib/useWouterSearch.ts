import { useRouter } from "next/router";

// wouter useSearch → Next.js query string
export function useWouterSearch(): string {
  const router = useRouter();
  if (typeof window !== "undefined") {
    return window.location.search.replace(/^\?/, "");
  }
  const q = router.query;
  if (!q) return "";
  const params = new URLSearchParams();
  Object.entries(q).forEach(([k, v]) => {
    if (k === "slug") return; // catch-all route param, not an actual query string value
    if (Array.isArray(v)) v.forEach((val) => params.append(k, val));
    else if (v) params.append(k, v);
  });
  return params.toString();
}
