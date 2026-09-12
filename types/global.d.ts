declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

interface Window {
  gtag?: (...args: unknown[]) => void;
  fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[] };
  dataLayer?: unknown[];
  oaiq?: (...args: unknown[]) => void;
}
