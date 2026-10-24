import { PageMeta } from "@/lib/usePageMeta";
import Introduction, { type IntroductionPageContent } from "@/page-components/Introduction";
import itFreelancerCase1 from "@/images/industry-cases/it-freelancer-1.png";
import itFreelancerCase2 from "@/images/industry-cases/it-freelancer-2.png";
import restaurantCase1 from "@/images/industry-cases/restaurant-1.png";
import restaurantCase2 from "@/images/industry-cases/restaurant-2.png";
import constructionCase1 from "@/images/industry-cases/construction-1.png";
import constructionCase2 from "@/images/industry-cases/construction-2.png";
import retailCase1 from "@/images/industry-cases/retail-1.png";
import retailCase2 from "@/images/industry-cases/retail-2.png";

export type IndustryIntroductionKey = "it" | "restaurant" | "construction" | "retail";

type IndustryConfig = {
  slug: string;
  title: string;
  description: string;
  content: IntroductionPageContent;
};

const commonFaq = {
  price: {
    question: "税理士の紹介に費用はかかりますか？",
    answer: "いいえ、税理士クラウドからのご紹介は無料です。紹介後の顧問料や依頼費用は、契約内容に応じて紹介先の税理士・会計事務所へお支払いいただきます。",
  },
  contract: {
    question: "紹介された税理士と必ず契約する必要はありますか？",
    answer: "いいえ、必ず契約する必要はありません。対応内容や費用、相性を確認したうえで、ご自身に合う相談先をお選びいただけます。",
  },
};

const industryConfigs: Record<IndustryIntroductionKey, IndustryConfig> = {
  it: {
    slug: "introduction-it",
    title: "IT業に強い税理士の無料紹介 | 税理士クラウド",
    description: "IT企業・エンジニアの経理や申告に対応できる税理士を無料でご紹介。クラウド会計、フリーランスの法人化、スタートアップの税務や資金調達まで相談できます。",
    content: {
      pageTheme: "it",
      breadcrumbLabel: "IT業向け税理士紹介",
      heroHeadline: "IT業に強い税理士||をご紹介します",
      heroHighlight: "IT業に強い税理士",
      heroLead: ["IT企業・フリーランスの税務や申告に対応できる税理士を、", "ご希望の条件に合わせて無料でご紹介します。"],
      concernsHeading: "IT業の税務で、こんなお悩みはありませんか？",
      concernsLead: "事業の成長速度に、経理と資金管理も追いつかせませんか。",
      concerns: [
        { title: "クラウド会計を整えたい", body: "売上や外注費、広告費を連携し\n月次の数字を早く把握したい", tone: "blue", icon: "cloud" },
        { title: "法人化・資金調達に備えたい", body: "事業計画や資金繰りを整えて\n次の成長に備えたい", tone: "purple", icon: "landmark" },
        { title: "確定申告や経費処理に迷う", body: "開発機材やクラウド利用料などを\nどう処理するか相談したい", tone: "teal", icon: "file" },
        { title: "フリーランスの案件を管理したい", body: "業務委託の売上や経費を案件ごとに整理して\n手取りと納税額を把握したい", tone: "orange", icon: "message" },
      ],
      industrySection: {
        heading: "IT業に詳しい税理士を紹介",
        lead: "IT事業の収益構造と成長段階を理解できる相談先なら、|日々の申告から法人化・資金調達まで話がスムーズです。",
        benefits: [
          { title: "エンジニア・ITコンサルにも対応", body: "開発費、業務委託、クラウド利用料など、IT企業やエンジニアに多い取引を整理して相談できます。" },
          { title: "法人化・税金対策など実績多数", body: "フリーランスの法人化や、スタートアップの資金繰り・事業計画を相談できる税理士を探せます。" },
          { title: "コストパフォーマンス重視の税理士を厳選", body: "クラウド会計やオンライン面談など、場所を選ばずスムーズに連携できる税理士を探せます。" },
        ],
        voicesHeading: "ITフリーランスの事例",
        voices: [
          {
            photo: itFreelancerCase1,
            photoAlt: "オフィスにいるITフリーランスのイメージ",
            name: "Tさん",
            quote: "確定申告に追われる時間を、開発に使えるようになりました。",
            before: ["案件を優先して、帳簿づけは後回し", "PCやソフトの費用処理に迷っていた", "申告前にまとめて作業し、仕事を圧迫"],
            after: ["記帳から申告まで、依頼範囲を整理できた", "機材やサービス利用料の扱いを相談", "申告前も慌てず、案件に集中できるように"],
          },
          {
            photo: itFreelancerCase2,
            photoAlt: "グレーのニットを着たITフリーランスのイメージ",
            name: "Yさん",
            quote: "独立してからのお金の疑問を、ひとつずつ相談できました。",
            before: ["独立後、税金のためにいくら残すか不安", "仕事用と生活用の支出が混ざりがち", "自分の規模で税理士に頼んでよいか迷う"],
            after: ["納税に備えるお金の目安を相談できた", "事業と生活のお金を分けて管理", "小さな疑問も聞けて、安心して仕事に向き合える"],
          },
        ],
      },
      faqItems: [
        { question: "IT企業やエンジニアに詳しい税理士を紹介してもらえますか？", answer: "はい。IT企業、SaaS、システム開発、Web制作、フリーランスのエンジニアやクリエイターなどの事業内容と、ご相談内容、エリア、予算を伺い、ご希望に合う税理士・会計事務所をお探しします。" },
        { question: "クラウド会計の導入や運用も相談できますか？", answer: "相談可能です。利用中または導入予定のクラウド会計や周辺サービスを伺い、データ連携や日々の運用を相談できる税理士をご紹介します。" },
        { question: "開発費やソフトウェアの会計処理も相談できますか？", answer: "相談可能です。実際の契約内容や開発工程によって処理が異なるため、取引の状況を確認できる税理士をご紹介します。" },
        { question: "資金調達や法人化も相談できますか？", answer: "はい。資金繰り、事業計画、法人化のタイミングなど、今後の成長計画も含めて相談できる税理士をお探しします。" },
        commonFaq.contract,
        commonFaq.price,
      ],
      excludedConsultationStarters: ["相続税申告"],
    },
  },
  restaurant: {
    slug: "introduction-restaurant",
    title: "飲食店に強い税理士の無料紹介 | 税理士クラウド",
    description: "飲食店・カフェ・居酒屋・レストランなど、飲食業の会計や税務に詳しい税理士を無料でご紹介。原価、人件費、POS売上、資金繰り、出店まで相談先をお探しします。",
    content: {
      pageTheme: "restaurant",
      breadcrumbLabel: "飲食店向け税理士紹介",
      heroHeadline: "飲食店に強い税理士||をご紹介します",
      heroHighlight: "飲食店に強い税理士",
      heroLead: ["飲食店の経理や確定申告に対応できる税理士を、", "ご希望の条件に合わせて無料でご紹介します。"],
      concernsHeading: "飲食店経営で、こんなお悩みはありませんか？",
      concernsLead: "毎日の営業に集中しながら、利益が残る経営を目指しませんか。",
      concerns: [
        { title: "原価と人件費を把握したい", body: "食材費やシフトの変動を整理し\n利益が残る水準を確認したい", tone: "orange", icon: "file" },
        { title: "売上データをまとめたい", body: "現金・POS・キャッシュレス・デリバリーの\n売上を漏れなく整理したい", tone: "blue", icon: "cloud" },
        { title: "閉店後の経理を減らしたい", body: "レシート整理や記帳を任せて\n仕込みや接客に集中したい", tone: "teal", icon: "message" },
        { title: "出店資金を準備したい", body: "新規出店や多店舗化に向けて\n資金繰りや融資を相談したい", tone: "purple", icon: "landmark" },
      ],
      industrySection: {
        heading: "飲食店経営に強い税理士を紹介",
        lead: "原価・人件費・資金繰りから、|開業・法人化・多店舗展開まで相談できます。",
        benefits: [
          { title: "飲食店オーナーの工数と不安を解消", body: "日々の売上や仕入れ、人件費を整理し、利益を残すために確認したい数字や経営判断を相談できます。" },
          { title: "開業・法人化・多店舗展開など実績多数", body: "開業準備や法人化、出店計画、融資、資金繰りなど、店舗の成長段階に合う相談先を探せます。" },
          { title: "飲食店の税務調査に強い", body: "インボイス制度への対応や日々の証憑管理、税務調査を見据えた経理体制について相談できます。" },
        ],
        voicesHeading: "飲食店オーナーの事例",
        voices: [
          {
            photo: restaurantCase1,
            photoAlt: "店内にいる飲食店オーナーのイメージ",
            name: "Hさん",
            quote: "閉店後の帳簿より、明日の仕込みに時間を使えるように。",
            before: ["閉店後にレシート整理や帳簿づけ", "食材費や人件費を引くと、いくら残るか曖昧", "申告の準備で、休みの日も落ち着かない"],
            after: ["記帳を任せて、閉店後の作業を軽減", "毎月の利益を確認し、仕入れや経費を見直せる", "仕込みや新メニューを考える時間に余裕"],
          },
          {
            photo: restaurantCase2,
            photoAlt: "エプロン姿の小規模飲食店オーナーのイメージ",
            name: "Sさん",
            quote: "小さなお店の疑問も、気軽に聞ける先生に出会えました。",
            before: ["初めての店舗経営で、経理は手探り", "現金やキャッシュレスの売上管理に戸惑う", "ちょっとした疑問を聞ける相手がいない"],
            after: ["お店に合った売上管理の方法がわかった", "経費や申告の疑問を、その都度相談", "お金の不安が減り、接客に集中できるように"],
          },
        ],
      },
      faqItems: [
        { question: "飲食店に詳しい税理士を紹介してもらえますか？", answer: "はい。店舗形態や店舗数、売上管理の方法、ご相談内容、エリア、予算を伺い、ご希望に合う税理士・会計事務所をお探しします。" },
        { question: "POSやキャッシュレス決済の売上も相談できますか？", answer: "相談可能です。ご利用中のPOSや決済サービス、会計ソフトとの連携状況を伺い、管理方法を相談できる税理士をご紹介します。" },
        { question: "新規出店や融資の相談もできますか？", answer: "はい。出店計画、設備投資、資金繰り、融資に向けた準備などを相談できる税理士をお探しします。" },
        commonFaq.contract,
        commonFaq.price,
      ],
      excludedConsultationStarters: ["相続税申告"],
    },
  },
  construction: {
    slug: "introduction-construction",
    title: "建設業に強い税理士の無料紹介 | 税理士クラウド",
    description: "建設会社・工務店・一人親方など、建設業の会計や税務に詳しい税理士を無料でご紹介。工事別原価、外注費、資金繰り、建設業許可や経審を見据えた決算まで相談先をお探しします。",
    content: {
      pageTheme: "construction",
      breadcrumbLabel: "建設業向け税理士紹介",
      heroHeadline: "建設業に強い税理士||をご紹介します",
      heroHighlight: "建設業に強い税理士",
      heroLead: ["建設業・建築業の経理や申告に対応できる税理士を、", "ご希望の条件に合わせて無料でご紹介します。"],
      concernsHeading: "建設業の経営で、こんなお悩みはありませんか？",
      concernsLead: "現場ごとの利益と資金の流れを整理し、安定した経営につなげませんか。",
      concerns: [
        { title: "工事ごとの利益を把握したい", body: "材料費・労務費・外注費を整理し\n案件ごとの採算を確認したい", tone: "blue", icon: "file" },
        { title: "確定申告や経費処理に迷う", body: "経費やインボイスへの対応を\n専門家へ相談したい", tone: "orange", icon: "message" },
        { title: "入金までの資金繰りが不安", body: "支払いが先行する工事でも\n手元資金を安定させたい", tone: "teal", icon: "cloud" },
        { title: "許可・経審を見据えて整えたい", body: "建設業許可や経営事項審査も考えて\n決算書と管理体制を整えたい", tone: "purple", icon: "landmark" },
      ],
      industrySection: {
        heading: "建設業の会計に詳しい税理士を紹介",
        lead: "工事別の原価と入出金の流れを理解できる相談先なら、|現場と経営の数字をつなげられます。",
        benefits: [
          { title: "工事別原価を整理", body: "材料費、労務費、外注費、経費を工事ごとに整理し、案件別の採算を把握する方法を相談できます。" },
          { title: "資金繰り・融資を相談", body: "入金までの期間や先行支払いを踏まえ、運転資金や設備資金について相談できる税理士を探せます。" },
          { title: "一人親方・法人化にも対応", body: "確定申告やインボイス対応、法人化、建設業許可・経審を見据えた決算まで相談できる税理士を探せます。" },
        ],
        voicesHeading: "建設業オーナーの事例",
        voices: [
          {
            photo: constructionCase1,
            photoAlt: "ピンクのトップスを着た一人親方のイメージ",
            name: "Uさん",
            quote: "現場のあとに、ひとりで経理を抱え込まなくてよくなった。",
            before: ["日中は現場、帰宅後は領収書の整理", "工具代や車両費の扱いに迷う", "確定申告が近づくたびに焦っていた"],
            after: ["記帳や申告を任せて、夜の作業を軽減", "仕事に使う支出の扱いを相談できる", "現場の段取りや見積もりに時間を使える"],
          },
          {
            photo: constructionCase2,
            photoAlt: "作業着を着た建設会社経営者のイメージ",
            name: "Sさん",
            quote: "次の工事を受ける前に、お金の見通しを相談できる安心感。",
            before: ["材料費や外注費の支払いが先に来る", "工事ごとの利益を把握しきれていない", "受注を増やしても、資金が足りるか不安"],
            after: ["入金と支払いの予定を整理できた", "工事ごとの収支を確認する習慣ができた", "資金の見通しを踏まえて、受注を検討できる"],
          },
        ],
      },
      faqItems: [
        { question: "建設業に詳しい税理士を紹介してもらえますか？", answer: "はい。建設会社、工務店、一人親方などの事業形態と、ご相談内容、エリア、予算を伺い、ご希望に合う税理士・会計事務所をお探しします。" },
        { question: "工事台帳や工事別原価も相談できますか？", answer: "相談可能です。現在の管理方法や工事件数を伺い、材料費・労務費・外注費などを整理できる税理士をご紹介します。" },
        { question: "一人親方の確定申告やインボイス対応も相談できますか？", answer: "はい。売上や経費の状況、取引先との関係、インボイス登録の有無を伺い、確定申告や日々の経理を相談できる税理士をお探しします。" },
        { question: "建設業許可や経審を見据えた決算も相談できますか？", answer: "はい。許可や経営事項審査への影響を踏まえた会計・決算について相談できる税理士をお探しします。行政手続きそのものは、必要に応じて対応可能な専門家との連携をご確認ください。" },
        commonFaq.contract,
        commonFaq.price,
      ],
      excludedConsultationStarters: ["相続税申告"],
    },
  },
  retail: {
    slug: "introduction-retail",
    title: "物販・小売に強い税理士の無料紹介 | 税理士クラウド",
    description: "物販・アパレル・ネットショップの経理や申告に対応できる税理士を無料でご紹介。在庫・仕入れ、消費税、法人化、EC・店舗の売上管理まで相談できます。",
    content: {
      pageTheme: "retail",
      breadcrumbLabel: "物販・小売向け税理士紹介",
      heroHeadline: "物販に強い税理士||をご紹介します",
      heroHighlight: "物販に強い税理士",
      heroLead: ["物販・アパレル・ネットショップの経理や申告に対応できる税理士を、", "ご希望の条件に合わせて無料でご紹介します。"],
      concernsHeading: "物販・小売の経営で、こんなお悩みはありませんか？",
      concernsLead: "売上と在庫、利益のつながりを見える化し、次の仕入れに生かしませんか。",
      concerns: [
        { title: "店舗とECの売上をまとめたい", body: "POS・EC・モール・卸の売上を\n一つの数字として把握したい", tone: "teal", icon: "cloud" },
        { title: "在庫と粗利を正確に見たい", body: "仕入れや棚卸しを整理して\n商品ごとの利益を判断したい", tone: "orange", icon: "file" },
        { title: "消費税の扱いに迷う", body: "輸入・せどり・モール販売などの\n消費税や経費を相談したい", tone: "blue", icon: "message" },
        { title: "仕入れ・出店資金を準備したい", body: "繁忙期の仕入れや新規出店に向けて\n資金繰りを相談したい", tone: "purple", icon: "landmark" },
      ],
      industrySection: {
        heading: "物販・小売の会計に詳しい税理士を紹介",
        lead: "売上経路と在庫の動きを理解できる相談先なら、|粗利を守りながら事業を伸ばせます。",
        benefits: [
          { title: "物販・ECの売上を一元化", body: "POS、EC、自社サイト、モール、卸など、複数チャネルの売上を整理する方法を相談できます。" },
          { title: "在庫と粗利を見える化", body: "仕入れ、棚卸し、返品、値引きを含めて在庫を管理し、商品やチャネルごとの粗利を把握できます。" },
          { title: "仕入れ・出店の資金を計画", body: "季節仕入れや新規出店、EC拡大に必要な資金とキャッシュフローを相談できる税理士を探せます。" },
        ],
        voicesHeading: "物販・小売オーナーの事例",
        voices: [
          {
            photo: retailCase1,
            photoAlt: "パソコンに向かうネットショップ運営者のイメージ",
            name: "Sさん",
            quote: "売上だけでなく、手元に残る利益も見えるようになりました。",
            before: ["複数の販売先の売上集計に時間がかかる", "送料や手数料を含めた利益が曖昧", "仕入れにお金を使いすぎていないか不安"],
            after: ["販売先ごとの売上や経費を整理", "仕入れや送料を含めて、利益を確認", "数字を見ながら、仕入れを検討できるように"],
          },
          {
            photo: retailCase2,
            photoAlt: "スマートフォンを持つ物販事業者のイメージ",
            name: "Oさん",
            quote: "注文が増えても、経理で手いっぱいにならなくなった。",
            before: ["注文が増えるほど、売上の確認が負担に", "仕入れの記録や在庫の整理が後回し", "申告時期は商品選びや販促の手が止まる"],
            after: ["売上や仕入れを管理する流れが整った", "在庫や棚卸しの疑問も相談できる", "商品選びや販売ページの改善に時間を使える"],
          },
        ],
      },
      faqItems: [
        { question: "物販・アパレル・ネットショップに詳しい税理士を紹介してもらえますか？", answer: "はい。店舗小売、アパレル、ネットショップ、せどり、輸入物販、D2C、卸売などの販売形態と、ご相談内容、エリア、予算を伺い、ご希望に合う税理士・会計事務所をお探しします。" },
        { question: "ECモールやPOSの売上も相談できますか？", answer: "相談可能です。利用中のPOS、ECカート、モール、決済サービス、会計ソフトを伺い、売上や手数料の整理を相談できる税理士をご紹介します。" },
        { question: "輸入物販や消費税の扱いも相談できますか？", answer: "はい。国内外の仕入れや販売方法、課税状況を伺い、輸入物販や消費税の扱いを相談できる税理士をお探しします。" },
        { question: "在庫や棚卸しの管理も相談できますか？", answer: "はい。取扱商品、販売チャネル、現在の在庫管理方法を踏まえ、棚卸しや粗利管理を相談できる税理士をお探しします。" },
        commonFaq.contract,
        commonFaq.price,
      ],
      excludedConsultationStarters: ["相続税申告"],
    },
  },
};

type IndustryIntroductionProps = {
  industry: IndustryIntroductionKey;
  hidePhoneCtas?: boolean;
  noindex?: boolean;
  canonical?: string;
  formStepPath?: string;
};

export default function IndustryIntroduction({
  industry,
  hidePhoneCtas = false,
  noindex = false,
  canonical,
  formStepPath,
}: IndustryIntroductionProps) {
  const config = industryConfigs[industry];
  const resolvedCanonical = canonical ?? (noindex ? undefined : `https://zeirishi-cloud.jp/${config.slug}`);

  return (
    <>
      <PageMeta
        title={config.title}
        description={config.description}
        canonical={resolvedCanonical}
        noindex={noindex}
      />
      <Introduction
        showDesktopSatisfaction
        hidePhoneCtas={hidePhoneCtas}
        noindex={noindex}
        formStepPath={formStepPath}
        content={{
          ...config.content,
          documentTitle: config.title,
          documentDescription: config.description,
        }}
      />
    </>
  );
}
