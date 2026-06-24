import { PageMeta } from "@/lib/usePageMeta";
import SitemapPage from "@/page-components/SitemapPage";

export default function SitemapPageRoute() {
  return (
    <>
      <PageMeta title="サイトマップ | 税理士クラウド" />
      <SitemapPage />
    </>
  );
}
