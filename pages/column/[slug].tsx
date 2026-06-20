import type { GetStaticPaths, GetStaticProps } from "next";
import { PageMeta } from "@/lib/usePageMeta";
import ArticlePage from "@/page-components/ArticlePage";
import { getArticlesByCategory, getArticleBySlug, type Article } from "@/lib/data";

type Props = { article: Article; title: string; description: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getArticlesByCategory("column");
  return {
    paths: articles.map((a) => ({ params: { slug: a.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const article = getArticleBySlug(slug);
  if (!article || article.category !== "column") return { notFound: true };
  return {
    props: {
      article,
      title: `${article.title} | 税理士クラウド`,
      description: article.excerpt,
    },
  };
};

export default function ColumnArticlePage({ article, title, description }: Props) {
  return (
    <>
      <PageMeta title={title} description={description} />
      <ArticlePage article={article} />
    </>
  );
}
