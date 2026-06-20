import { useEffect } from "react";

const SITE_NAME = "税理士クラウド";
const DEFAULT_DESCRIPTION =
  "掲載事務所数3,000件以上！税理士クラウドは、全国の税理士・会計事務所をエリアや得意業種・依頼内容から検索できる、経営者・個人事業主のための税理士検索サイトです。";

export function usePageTitle(title: string, description?: string, noindex?: boolean) {
  useEffect(() => {
    document.title = title;

    const descMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (descMeta) {
      descMeta.content = description ?? DEFAULT_DESCRIPTION;
    }

    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (noindex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement("meta");
        robotsMeta.name = "robots";
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.content = "noindex";
    } else if (robotsMeta) {
      robotsMeta.remove();
    }

    return () => {
      document.title = SITE_NAME;
      if (descMeta) descMeta.content = DEFAULT_DESCRIPTION;
      document.querySelector('meta[name="robots"]')?.remove();
    };
  }, [title, description, noindex]);
}
