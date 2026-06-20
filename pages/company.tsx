import { PageMeta } from "@/lib/usePageMeta";
import { Company } from "@/page-components/StaticPages";

export default function CompanyPage() {
  return (
    <>
      <PageMeta title="運営会社 | 税理士クラウド" />
      <Company />
    </>
  );
}
