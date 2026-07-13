import type { GetStaticProps } from "next";
import { PageMeta } from "@/lib/usePageMeta";
import SitemapPage from "@/page-components/SitemapPage";
import { getAllOffices } from "@/lib/offices-server";
import { getAvailableCategorySlugs } from "@/lib/officeFilters";
import { CATEGORIES } from "@/lib/categorySlugMap";

interface SitemapPageRouteProps {
  availableCategorySlugs: string[];
}

export const getStaticProps: GetStaticProps<SitemapPageRouteProps> = async () => {
  return {
    props: {
      availableCategorySlugs: getAvailableCategorySlugs(getAllOffices(), CATEGORIES, {}),
    },
  };
};

export default function SitemapPageRoute({ availableCategorySlugs }: SitemapPageRouteProps) {
  return (
    <>
      <PageMeta title="サイトマップ | 税理士クラウド" />
      <SitemapPage availableCategorySlugs={availableCategorySlugs} />
    </>
  );
}
