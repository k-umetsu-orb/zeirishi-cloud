import Head from "next/head";

const DEFAULT_DESCRIPTION =
  "掲載事務所数3,000件以上！税理士クラウドは、全国の税理士・会計事務所をエリアや得意業種・依頼内容から検索できる、経営者・個人事業主のための税理士検索サイトです。";

interface PageMetaProps {
  title: string;
  description?: string;
  noindex?: boolean;
}

export function PageMeta({ title, description, noindex }: PageMetaProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description ?? DEFAULT_DESCRIPTION} />
      {noindex && <meta name="robots" content="noindex" />}
    </Head>
  );
}
