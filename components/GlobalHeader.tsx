import Link from "next/link"
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import logo from "@/images/税アイコン.png";
import textLogo from "@/images/ロゴテキスト.png";

const navItems = [
  { label: "税理士検索", href: "/search" },
  // { label: "ランキング", href: "/ranking" },
  { label: "インタビュー", href: "/interview" },
  { label: "選び方ガイド", href: "/guide" },
  { label: "コラム", href: "/column" },
];

export default function GlobalHeader() {
  const router = useRouter(); const location = router.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldShowActiveNav = !(
    location === "/introduction" ||
    location.startsWith("/introduction/") ||
    location.startsWith("/introduction-") ||
    location.startsWith("/lp/")
  );

  // メニュー開閉時にbodyスクロールを制御
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const close = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0" onClick={close}>
              <Image src={logo} alt="税理士クラウド" width={32} height={32} className="object-contain bg-white rounded-xl" priority />
              <Image src={textLogo} alt="税理士クラウド" width={144} height={24} className="object-contain" priority />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = shouldShowActiveNav && (location === item.href || location.startsWith(item.href + "/"));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "text-primary bg-primary/5"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/introduction"
                className="ml-2 inline-flex h-10 items-center justify-center rounded-lg bg-[#1a50a8] px-4 text-sm font-bold text-white transition-colors hover:bg-[#0c3282]"
              >
                税理士紹介(無料)
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="メニュー"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── SP ドロワーメニュー ── */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* 背景オーバーレイ */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={close}
        />

        {/* ドロワーパネル（右からスライド） */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-xs bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* パネルヘッダー */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-border shrink-0">
            <Link href="/" className="flex items-center gap-2" onClick={close}>
              <Image src={logo} alt="税理士クラウド" width={28} height={28} className="object-contain bg-white rounded-xl" />
              <Image src={textLogo} alt="税理士クラウド" width={120} height={20} className="object-contain" />
            </Link>
            <button onClick={close} className="p-2 rounded-md hover:bg-muted" aria-label="閉じる">
              <X className="w-5 h-5 text-foreground/70" />
            </button>
          </div>

          {/* ナビゲーション */}
          <nav className="flex-1 overflow-y-auto">
            {/* 税理士紹介CTA（SP限定・オレンジグラデーション） */}
            <Link
              href="/introduction"
              onClick={close}
              className="flex items-center justify-between px-5 py-5 border-b border-orange-400/30 transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(to right, #f97316, #fb923c)" }}
            >
              <span className="text-white text-sm font-bold">税理士の無料紹介はこちら</span>
              <ChevronRight className="w-4 h-4 text-white shrink-0" />
            </Link>

            {/* 通常ナビ */}
            {navItems.map((item) => {
              const isActive = shouldShowActiveNav && (location === item.href || location.startsWith(item.href + "/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-5 py-4 border-b border-border text-sm font-medium transition-colors ${
                    isActive ? "text-primary bg-primary/5" : "text-foreground hover:bg-muted/50"
                  }`}
                  onClick={close}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
