import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
  onNavigate?: () => void;
}

const navBtnClass =
  "p-2 rounded-md border border-border text-muted-foreground hover:bg-muted transition-colors";
const navBtnDisabledClass =
  "p-2 rounded-md border border-border text-muted-foreground/40 cursor-not-allowed";
const pageBtnClass =
  "w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium border border-border text-muted-foreground hover:bg-muted transition-colors";
const pageBtnActiveClass =
  "w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground";

export default function Pagination({ currentPage, totalPages, buildHref, onNavigate }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <nav aria-label="ページネーション" className="flex items-center justify-center gap-1 mt-8">
      {currentPage > 1 ? (
        <Link href={buildHref(currentPage - 1)} onClick={onNavigate} className={navBtnClass} aria-label="前のページ">
          <ChevronLeft className="w-4 h-4" />
        </Link>
      ) : (
        <span className={navBtnDisabledClass} aria-disabled="true">
          <ChevronLeft className="w-4 h-4" />
        </span>
      )}

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-muted-foreground">...</span>
        ) : page === currentPage ? (
          <span key={page} aria-current="page" className={pageBtnActiveClass}>
            {page}
          </span>
        ) : (
          <Link key={page} href={buildHref(page)} onClick={onNavigate} className={pageBtnClass}>
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link href={buildHref(currentPage + 1)} onClick={onNavigate} className={navBtnClass} aria-label="次のページ">
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className={navBtnDisabledClass} aria-disabled="true">
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}
