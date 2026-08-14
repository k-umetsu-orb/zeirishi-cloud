import { PageMeta } from "@/lib/usePageMeta";
import Partner from "@/page-components/Partner";

export default function PartnerPage() {
  return (
    <>
      <PageMeta
        title="税理士集客・税理士紹介エージェントなら税理士クラウド｜掲載をご検討の税理士・会計事務所さまへ"
        description="税理士集客を支援する税理士紹介エージェント、税理士クラウド。エリア・得意分野・対応業務など事務所の強みを分かりやすく掲載し、税理士を探す見込顧客との出会い・お問い合わせにつなげます。掲載をご希望の税理士・会計事務所さまは無料でご相談ください。"
        canonical="https://zeirishi-cloud.jp/partner"
      />
      <Partner />
    </>
  );
}
