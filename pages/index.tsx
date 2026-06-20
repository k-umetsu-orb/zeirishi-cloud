import type { GetStaticProps } from "next";
import { PageMeta } from "@/lib/usePageMeta";
import Home from "@/page-components/Home";
import { getAllOffices, getOfficeById, buildInterviewUrl } from "@/lib/offices-server";
import { getAllInterviews } from "@/lib/data";

export const getStaticProps: GetStaticProps = async () => {
  const interviews = getAllInterviews().slice(0, 4);
  const interviewUrls: Record<string, string> = {};
  for (const iv of interviews) {
    const office = getOfficeById(iv.officeId);
    if (office) interviewUrls[iv.id] = buildInterviewUrl(iv, office);
  }
  return { props: { officeCount: getAllOffices().length, interviewUrls } };
};

export default function IndexPage({ officeCount, interviewUrls }: { officeCount: number; interviewUrls: Record<string, string> }) {
  return (
    <>
      <PageMeta
        title="税理士・会計事務所の検索や相談なら【税理士クラウド】"
        description="掲載事務所数3,000件以上！税理士クラウドは、全国の税理士・会計事務所をエリアや得意業種・依頼内容から検索できる、経営者・個人事業主のための税理士検索サイトです。"
      />
      <Home officeCount={officeCount} interviewUrls={interviewUrls} />
    </>
  );
}
