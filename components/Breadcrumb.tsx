import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: "default" | "light";
  className?: string;
}

export default function Breadcrumb({ items, variant = "default", className = "py-3" }: BreadcrumbProps) {
  const isLight = variant === "light";
  return (
    <nav aria-label="パンくずリスト" className={`${className} overflow-x-auto scrollbar-none`}>
      <ol className="flex items-center flex-nowrap md:flex-wrap gap-1 text-sm whitespace-nowrap">
        <li className="flex items-center shrink-0">
          <Link
            href="/"
            className={`transition-colors flex items-center gap-1 ${
              isLight ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>税理士・会計事務所検索なら「税理士クラウド」</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center shrink-0">
            <ChevronRight className={`w-3.5 h-3.5 mx-1 ${isLight ? "text-white/40" : "text-muted-foreground/50"}`} />
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className={`transition-colors ${
                  isLight ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <span className={`font-medium ${isLight ? "text-white" : "text-foreground"}`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
