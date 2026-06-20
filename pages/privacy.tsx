import { PageMeta } from "@/lib/usePageMeta";
import { Privacy } from "@/page-components/StaticPages";

export default function PrivacyPage() {
  return (
    <>
      <PageMeta title="プライバシーポリシー | 税理士クラウド" noindex />
      <Privacy />
    </>
  );
}
