import Head from "next/head";

interface JsonLdProps {
  data: object | object[];
}

/** `</script>`によるタグ脱出を防ぐため、`<`をエスケープしてから埋め込む。 */
function serialize(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <Head>
      {items.map((item, index) => {
        // next/headは複数のHead呼び出し間で同じkeyのタグを重複排除するため、
        // ページ内で衝突しないよう@typeをkeyに使う（indexだけだと他コンポーネントのJsonLdと衝突する）。
        const type = "@type" in item ? String((item as { "@type": unknown })["@type"]) : String(index);
        return (
          <script
            key={`ld-json-${type}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serialize(item) }}
          />
        );
      })}
    </Head>
  );
}
