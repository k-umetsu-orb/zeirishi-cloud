import Link from "next/link";
import Image from "next/image";
import logo from "@/images/ロゴ7.png";

export default function GlobalFooter() {
  return (
    <footer className="bg-foreground/[0.03] border-t border-border mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand — SP: 左列（全幅）, PC: 1列目 */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Image src={logo} alt="税理士クラウド" width={28} height={28} className="object-contain bg-white rounded-xl" />
              <span className="font-serif font-bold text-foreground">税理士クラウド</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              全国の税理士・会計事務所をエリア・得意分野から検索できるポータルサイトです。
            </p>
          </div>

          {/* Search — SP: 左列, PC: 2列目 */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-sans font-semibold text-sm text-foreground mb-3">税理士検索</h3>
            <ul className="space-y-2">
              <li><Link href="/search" className="text-sm text-muted-foreground hover:text-primary transition-colors">エリアから探す</Link></li>
              <li><Link href="/search#requirements" className="text-sm text-muted-foreground hover:text-primary transition-colors">条件から探す</Link></li>
              {/* <li><Link href="/ranking" className="text-sm text-muted-foreground hover:text-primary transition-colors">ランキング</Link></li> */}
              <li><Link href="/recommendation" className="text-sm text-muted-foreground hover:text-primary transition-colors">おすすめ事務所</Link></li>
            </ul>
          </div>

          {/* Content — SP: 非表示, PC: 3列目 */}
          <div className="hidden md:block">
            <h3 className="font-sans font-semibold text-sm text-foreground mb-3">コンテンツ</h3>
            <ul className="space-y-2">
              <li><Link href="/interview" className="text-sm text-muted-foreground hover:text-primary transition-colors">インタビュー</Link></li>
              <li><Link href="/guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">選び方ガイド</Link></li>
              <li><Link href="/column" className="text-sm text-muted-foreground hover:text-primary transition-colors">コラム</Link></li>
              <li><Link href="/introduction" className="text-sm text-muted-foreground hover:text-primary transition-colors">税理士紹介サービス</Link></li>
            </ul>
          </div>

          {/* Info — SP: 右列, PC: 4列目 */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-sans font-semibold text-sm text-foreground mb-3">サイト情報</h3>
            <ul className="space-y-2">
              <li><a href="https://orb-inc.co.jp/company" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">運営会社</a></li>
              <li><a href="https://orb-inc.co.jp/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">プライバシーポリシー</a></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">利用規約</Link></li>
              <li><Link href="/sitemap" className="text-sm text-muted-foreground hover:text-primary transition-colors">サイトマップ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} 税理士クラウド All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
