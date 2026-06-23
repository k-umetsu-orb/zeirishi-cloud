import { PageMeta } from "@/lib/usePageMeta";
import LpVariantPage from "@/page-components/LpVariantPage";

const u = (s: string) => (
  <span className="relative inline-block">
    <span className="relative z-10">{s}</span>
    <span className="absolute bottom-1 left-0 right-0 h-3 bg-amber-400/40 -z-0" />
  </span>
);
const hi = (s: string) => (
  <span className="text-amber-500 underline underline-offset-2">{s}</span>
);

const painPoints = [
  <>1社だけ勧められても{hi("他と比較できない")}のが不安</>,
  <>{hi("しつこい営業電話")}は避けたい</>,
  <>{hi("口コミや実績")}を見て自分で選びたい</>,
  <>{hi("本当に無料か")}・登録が必要かが不安</>,
];

const requestDetailExamples = [
  "複数の税理士を比較したうえで選びたい",
  "営業電話なしで候補だけ知りたい",
];

export default function LpComparisonPage() {
  return (
    <>
      <PageMeta
        title="税理士は自分で比較して選べる無料紹介 | 税理士クラウド"
        description="営業電話で1社を勧められるのではなく、複数の候補を比較して納得の1社へ。完全無料・登録不要で、しつこい営業もありません。"
        noindex
      />
      <LpVariantPage
        slug="comparison"
        badge="完全無料・登録不要"
        headline={<>税理士は<br />{u("自分で比較")}して選べます</>}
        subtext="営業電話で1社を勧められるのではなく、複数の候補を比較して納得の1社へ。完全無料・登録不要で、しつこい営業もありません。"
        trustValue={<>掲載数<span className="text-amber-400"> 3,000件以上</span></>}
        empathyImageCaption="［画像：PCで複数社を比較検討する人］"
        empathyQuote={<>「結局、紹介された1社と<br />契約するしかないのでは……？」</>}
        empathyBody={
          <>
            <p>紹介サービスには「断りづらい」「比較ができない」といったイメージもあり、利用に慎重になる方も多くいらっしゃいます。</p>
            <p>税理士クラウドは、複数の税理士を比較したうえでご自身のペースで選べる仕組み。無理な勧誘は一切行いません。</p>
          </>
        }
        painPoints={painPoints}
        requestDetailExamples={requestDetailExamples}
      />
    </>
  );
}
