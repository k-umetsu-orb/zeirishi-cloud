import type { GetStaticProps } from "next";
import { PageMeta } from "@/lib/usePageMeta";
import InterviewList from "@/page-components/InterviewList";
import { getAllInterviews } from "@/lib/data";
import { getOfficeById, buildInterviewUrl } from "@/lib/offices-server";

export const getStaticProps: GetStaticProps = async () => {
  const interviews = getAllInterviews();
  const interviewUrls: Record<string, string> = {};
  for (const iv of interviews) {
    const office = getOfficeById(iv.officeId);
    if (office) interviewUrls[iv.id] = buildInterviewUrl(iv, office);
  }
  return { props: { interviewUrls } };
};

export default function InterviewIndexPage({ interviewUrls }: { interviewUrls: Record<string, string> }) {
  return (
    <>
      <PageMeta
        title="インタビュー一覧 | 税理士クラウド"
        description="税理士・会計事務所の担当者へのインタビュー一覧です。気になる会計事務所があればインタビュー記事の内容をチェック！"
      />
      <InterviewList interviewUrls={interviewUrls} />
    </>
  );
}
