import { PageMeta } from "@/lib/usePageMeta";
import Introduction from "@/page-components/Introduction";
import beautySalonOwnerH from "@/images/beauty-salon-owner-h.png";
import beautySalonOwnerY from "@/images/beauty-salon-owner-y.jpg";

const title = "美容サロンに強い税理士の無料紹介 | 税理士クラウド";
const description = "美容室・ヘアサロン・ネイル・エステなど、美容サロンに強い税理士を無料でご紹介。記帳、確定申告、税務調査、法人化、店舗展開まで、ご希望に合う税理士を専門コーディネーターがお探しします。";

type BeautySalonIntroductionProps = {
  hidePhoneCtas?: boolean;
  noindex?: boolean;
  canonical?: string;
  formStepPath?: string;
};

export default function BeautySalonIntroduction({
  hidePhoneCtas = false,
  noindex = false,
  canonical,
  formStepPath,
}: BeautySalonIntroductionProps) {
  return (
    <>
      <PageMeta
        title={title}
        description={description}
        canonical={canonical}
        noindex={noindex}
      />
      <Introduction
        showDesktopSatisfaction
        hidePhoneCtas={hidePhoneCtas}
        noindex={noindex}
        formStepPath={formStepPath}
        content={{
          pageTheme: "beauty",
          breadcrumbLabel: "美容サロン向け税理士紹介",
          heroHeadline: "美容サロンに強い税理士||をご紹介します",
          heroHighlight: "美容サロンに強い税理士",
          heroLead: ["美容サロン・美容師の税務に詳しい税理士を、ご希望の条件に合わせて無料でご紹介します。"],
          concernsHeading: "美容サロン経営で、こんなお悩みはありませんか？",
          concernsLead: "経理や税務を任せて、お客様と向き合う時間を増やしませんか。",
          concerns: [
            { title: "サロン経営の見通しを立てたい", body: "利益や納税、資金繰りを把握して\n数字に基づいて経営判断したい", tone: "teal", icon: "cloud" },
            { title: "新規店舗出店のために資金準備したい", body: "出店に必要な資金や融資について\n早めに専門家へ相談したい", tone: "purple", icon: "landmark" },
            { title: "閉店後の経理作業がつらい", body: "営業後のレシート整理や記帳で\n本業に集中する時間が足りない", tone: "blue", icon: "file" },
            { title: "サロンの経費判断に迷う", body: "材料費や設備、業務委託など\nどこまで経費になるか相談したい", tone: "orange", icon: "message" },
          ],
          industrySection: {
            heading: "美容サロン専門の税理士を紹介",
            lead: "美容サロン「だけ」やっているから|事例が豊富で安心。|美容サロン特有の会計を教えてくれます。",
            benefits: [
              { title: "サロンオーナーの工数と不安を解消", body: "記帳や確定申告などの事務作業を任せられるので、閉店後の負担や税金の不安を減らせます。" },
              { title: "フリーランス美容師も対応", body: "面貸しや業務委託で働くフリーランス美容師の確定申告や、経費の相談にも対応します。" },
              { title: "美容サロンの税務調査に強い", body: "現金売上や材料費の管理など、美容サロンで確認されやすいポイントを踏まえて備えられます。" },
            ],
            voicesHeading: "美容サロンオーナーの声",
            voices: [
              {
                photo: beautySalonOwnerH,
                photoAlt: "美容サロンオーナー Hさん",
                name: "Hさん",
                quote: "より多くのお客様の髪の悩みに応えられるようになった。",
                before: ["お客様ゼロから集客", "街で声をかけ、SNSで発信", "スタッフ採用にも苦労"],
                after: ["3人で店舗を運営", "仕組み化でスタッフが成長", "より多くの髪の悩みに対応"],
              },
              {
                photo: beautySalonOwnerY,
                photoAlt: "美容サロンオーナー Yさん",
                name: "Yさん",
                quote: "税務のことも、それ以外も。気軽に相談できる安心感。",
                before: ["営業後、深夜までレシート整理", "経費の疑問を相談できない", "確定申告期は本業に集中できない"],
                after: ["専用LINEで気軽に相談", "経営の不安や孤独を解消", "お客様との会話が増え、お店の雰囲気も改善"],
              },
            ],
          },
          faqItems: [
            { question: "美容サロンに詳しい税理士を紹介してもらえますか？", answer: "はい。美容業への対応実績やご相談内容、エリア、予算などの条件を伺い、ご希望に合う税理士・会計事務所をお探しします。" },
            { question: "個人の美容師や小規模サロンでも利用できますか？", answer: "はい。フリーランス美容師や個人経営の美容室、ネイルサロン、エステサロンなど、事業規模を問わずご利用いただけます。" },
            { question: "記帳や確定申告もまとめて依頼できますか？", answer: "対応可能です。日々の記帳、確定申告、決算、給与計算など、希望する業務内容をコーディネーターへお伝えください。" },
            { question: "法人化や店舗展開についても相談できますか？", answer: "はい。法人化のタイミング、スタッフ雇用、資金繰り、店舗展開など、将来の計画も含めて相談できる税理士をご紹介します。" },
            { question: "紹介サービスの利用に費用はかかりますか？", answer: "いいえ、税理士クラウドからのご紹介は無料です。紹介後の顧問料や依頼費用は、契約内容に応じて紹介先の税理士・会計事務所へお支払いいただきます。" },
          ],
          excludedConsultationStarters: ["相続税申告"],
          documentTitle: title,
          documentDescription: description,
        }}
      />
    </>
  );
}
