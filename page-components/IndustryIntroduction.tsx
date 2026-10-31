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
import careFacilityCase1 from "@/images/industry-cases/care-facility-1.png";
import careFacilityCase2 from "@/images/industry-cases/care-facility-2.png";
import fitnessGymCase1 from "@/images/industry-cases/fitness-gym-1.png";
import fitnessGymCase2 from "@/images/industry-cases/fitness-gym-2.png";
import dentalClinicCase1 from "@/images/industry-cases/dental-clinic-1.png";
import dentalClinicCase2 from "@/images/industry-cases/dental-clinic-2.png";

export type IndustryIntroductionKey =
  | "it"
  | "restaurant"
  | "construction"
  | "retail"
  | "care-facility"
  | "fitness-gym"
  | "dental-clinic";

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
        { title: "閉店後の経理作業を減らしたい", body: "レシート整理や記帳を任せて\n仕込みや接客に集中したい", tone: "teal", icon: "message" },
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
        voicesHeading: "飲食店オーナー様の事例",
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
        voicesHeading: "建設業オーナー様の事例",
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
        voicesHeading: "物販・小売オーナー様の事例",
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
  "care-facility": {
    slug: "introduction-care-facility",
    title: "介護施設専門の税理士を無料紹介 | 税理士クラウド",
    description: "介護施設・デイサービス・訪問介護など、介護事業の会計や税務に詳しい税理士を無料でご紹介。介護報酬、資金繰り、人件費、施設ごとの収支管理まで相談できます。",
    content: {
      pageTheme: "care-facility",
      breadcrumbLabel: "介護施設向け税理士紹介",
      heroHeadline: "介護施設専門の税理士||をご紹介します",
      heroHighlight: "介護施設専門の税理士",
      heroLead: ["介護報酬や施設運営の会計・税務に詳しい税理士を、", "ご希望の条件に合わせて無料でご紹介します。"],
      concernsHeading: "介護施設経営で、こんなお悩みはありませんか？",
      concernsLead: "経理を任せて、利用者様と施設運営に向き合う時間を増やしませんか。",
      concerns: [
        { title: "現場後の経理作業を減らしたい", body: "記帳や支払い業務を任せて\n利用者様と向き合う時間を増やしたい", tone: "orange", icon: "file" },
        { title: "入金までの資金繰りが不安", body: "介護報酬の入金サイクルを踏まえて\n手元資金を安定させたい", tone: "blue", icon: "cloud" },
        { title: "人件費と収支を把握したい", body: "職員配置や加算も踏まえて\n施設ごとの利益を確認したい", tone: "teal", icon: "message" },
        { title: "新しい事業所を開設したい", body: "採用や設備に必要な資金を整理して\n事業所の拡大に備えたい", tone: "purple", icon: "landmark" },
      ],
      industrySection: {
        heading: "介護施設専門の税理士を紹介",
        lead: "介護施設「だけ」やっているから事例が豊富で安心。|介護施設特有の会計を教えてくれます。",
        benefits: [
          { title: "経理を任せて、施設運営に集中", body: "記帳や決算、支払いに関する業務を整理し、利用者様や職員と向き合う時間を確保できます。" },
          { title: "介護報酬の入金待ち・資金繰りを相談", body: "介護報酬の入金サイクルや先行する人件費を踏まえ、運転資金や融資について相談できます。" },
          { title: "人件費・施設ごとの収支管理にも対応", body: "職員配置や加算、事業所別の売上・経費を整理し、採用や新規開設の判断につなげられます。" },
        ],
        voicesHeading: "介護施設オーナー様の事例",
        voices: [
          {
            photo: careFacilityCase1,
            photoAlt: "介護施設の前に立つ水色のポロシャツ姿の女性",
            name: "Sさん",
            quote: "書類とにらめっこする時間が減り、利用者様と話す時間が増えました。",
            before: ["現場後に経理・支払い", "入金管理が複雑", "加算等の処理に不安"],
            after: ["記帳・決算を任せる", "毎月の収支が見える", "利用者様と向き合う余裕"],
          },
          {
            photo: careFacilityCase2,
            photoAlt: "介護施設の事務所にいるジャケット姿の男性経営者",
            name: "Kさん",
            quote: "採用も新しい事業所も、お金の見通しを立てて進められるように。",
            before: ["人件費の負担が不安", "入金までの資金繰り", "事業所別収支が不明"],
            after: ["採用前に収支を相談", "資金繰りを安定", "数字で事業所拡大を検討"],
          },
        ],
      },
      faqItems: [
        { question: "介護施設に詳しい税理士を紹介してもらえますか？", answer: "はい。介護施設、デイサービス、訪問介護などの事業形態と、ご相談内容、エリア、予算を伺い、ご希望に合う税理士・会計事務所をお探しします。" },
        { question: "介護報酬や加算の会計処理も相談できますか？", answer: "相談可能です。提供サービスや請求・入金の状況を伺い、介護報酬や加算を含む日々の経理を相談できる税理士をご紹介します。" },
        { question: "施設ごとの収支や人件費も相談できますか？", answer: "はい。事業所数や職員体制、現在の管理方法を踏まえ、施設別の収支や人件費を整理できる税理士をお探しします。" },
        { question: "新規開設や融資も相談できますか？", answer: "はい。開設計画、設備投資、採用、資金繰り、融資に向けた準備を相談できる税理士をお探しします。" },
        commonFaq.contract,
        commonFaq.price,
      ],
      excludedConsultationStarters: ["相続税申告"],
    },
  },
  "fitness-gym": {
    slug: "introduction-fitness-gym",
    title: "フィットネスジムに強い税理士を無料紹介 | 税理士クラウド",
    description: "フィットネスジム・パーソナルジムの会計や税務に詳しい税理士を無料でご紹介。会費・回数券、器具の費用処理、開業融資、法人化、多店舗展開まで相談できます。",
    content: {
      pageTheme: "fitness-gym",
      breadcrumbLabel: "フィットネスジム向け税理士紹介",
      heroHeadline: "フィットネスジムに強い||税理士をご紹介します",
      heroHighlight: "フィットネスジムに強い||税理士",
      heroLead: ["フィットネスジム・パーソナルジムの会計や税務に詳しい税理士を、", "ご希望の条件に合わせて無料でご紹介します。"],
      concernsHeading: "フィットネスジム経営で、こんなお悩みはありませんか？",
      concernsLead: "経理を任せて、指導や店舗運営に集中できる環境を整えませんか。",
      concerns: [
        { title: "営業後の経理作業を減らしたい", body: "記帳や領収書整理を任せて\n指導やメニュー作りに集中したい", tone: "purple", icon: "file" },
        { title: "会費・回数券の入金を整理したい", body: "月会費や回数券、都度利用の売上を\n漏れなく管理したい", tone: "blue", icon: "cloud" },
        { title: "器具の費用処理に迷う", body: "トレーニング器具や内装の費用を\nどう処理するか相談したい", tone: "teal", icon: "message" },
        { title: "次の店舗を出店したい", body: "開業融資や人件費を整理して\n法人化・多店舗展開に備えたい", tone: "orange", icon: "landmark" },
      ],
      industrySection: {
        heading: "フィットネスジム経営に詳しい税理士を紹介",
        lead: "ジム特有の会計や設備投資を理解できる相談先なら、|日々の経理から開業・多店舗展開まで話がスムーズです。",
        benefits: [
          { title: "経理を任せて、指導や店舗運営に集中", body: "記帳や決算、領収書整理を任せ、会員対応やトレーニング指導、店舗づくりに使う時間を増やせます。" },
          { title: "会費・回数券等ジム特有の会計に対応", body: "月会費、回数券、都度利用、物販など、複数の売上を整理して毎月の利益を確認できます。" },
          { title: "開業融資・法人化・多店舗展開も相談", body: "器具・内装への投資、採用、融資、法人化、2店舗目以降の収支計画を相談できる税理士を探せます。" },
        ],
        voicesHeading: "フィットネスジムオーナー様の事例",
        voices: [
          {
            photo: fitnessGymCase1,
            photoAlt: "トレーニングジムにいる黒いTシャツ姿の男性トレーナー",
            name: "Mさん",
            quote: "セッションの合間に帳簿をつける日々から、卒業できました。",
            before: ["営業後に経費を入力", "会費・回数券の入金管理", "器具の費用処理に迷う"],
            after: ["記帳を任せ負担軽減", "売上をすぐ確認", "指導やメニュー作りに集中"],
          },
          {
            photo: fitnessGymCase2,
            photoAlt: "フィットネスジムにいるスポーツウェア姿の男性オーナー",
            name: "Tさん",
            quote: "2店舗目を出す前に、数字で話せる相談相手ができました。",
            before: ["店舗別の利益が不明", "初期費用・資金が不安", "採用手続きが増える"],
            after: ["店舗別収支を毎月確認", "借入れ計画を事前相談", "数字で次の出店を検討"],
          },
        ],
      },
      faqItems: [
        { question: "フィットネスジムに詳しい税理士を紹介してもらえますか？", answer: "はい。フィットネスジム、パーソナルジム、オンライン指導などの事業形態と、ご相談内容、エリア、予算を伺い、ご希望に合う税理士・会計事務所をお探しします。" },
        { question: "月会費や回数券の売上管理も相談できますか？", answer: "相談可能です。決済方法や会員管理システム、回数券の運用を伺い、ジムに合う売上管理を相談できる税理士をご紹介します。" },
        { question: "トレーニング器具や内装の費用処理も相談できますか？", answer: "はい。購入・リースの内容や利用状況によって処理が異なるため、実際の契約や設備計画を確認できる税理士をご紹介します。" },
        { question: "開業融資や多店舗展開も相談できますか？", answer: "はい。出店計画、設備投資、採用、法人化、資金繰り、融資に向けた準備を相談できる税理士をお探しします。" },
        commonFaq.contract,
        commonFaq.price,
      ],
      excludedConsultationStarters: ["相続税申告"],
    },
  },
  "dental-clinic": {
    slug: "introduction-dental-clinic",
    title: "歯科医院に強い税理士を無料紹介 | 税理士クラウド",
    description: "歯科医院の会計や税務に詳しい税理士を無料でご紹介。保険診療・自費診療の会計、医療機器への設備投資、開業、採用、医療法人化まで相談できます。",
    content: {
      pageTheme: "dental-clinic",
      breadcrumbLabel: "歯科医院向け税理士紹介",
      heroHeadline: "歯科医院に強い税理士||をご紹介します",
      heroHighlight: "歯科医院に強い税理士",
      heroLead: ["歯科医院の会計や税務に詳しい税理士を、", "ご希望の条件に合わせて無料でご紹介します。"],
      concernsHeading: "歯科医院経営で、こんなお悩みはありませんか？",
      concernsLead: "経理を任せて、患者様の診療に集中できる環境を整えませんか。",
      concerns: [
        { title: "診療後の経理作業を減らしたい", body: "記帳や申告を任せて\n患者様と向き合う時間を増やしたい", tone: "blue", icon: "file" },
        { title: "保険・自費診療を整理したい", body: "保険診療と自費診療の売上を分けて\n医院の収支を確認したい", tone: "teal", icon: "cloud" },
        { title: "医療機器の導入に迷う", body: "設備投資や借入れの計画を立てて\n導入時期を判断したい", tone: "purple", icon: "landmark" },
        { title: "採用・法人化を相談したい", body: "人件費や将来の分院展開も踏まえて\n医療法人化を検討したい", tone: "orange", icon: "message" },
      ],
      industrySection: {
        heading: "歯科医院経営に詳しい税理士を紹介",
        lead: "保険診療・自費診療や医療機器への投資を理解できる相談先なら、|日々の経理から医療法人化まで話がスムーズです。",
        benefits: [
          { title: "経理を任せて、患者様の診療に集中", body: "記帳や決算、申告に関する業務を整理し、患者様の診療やスタッフとの連携に使う時間を増やせます。" },
          { title: "保険診療・自費診療の会計に対応", body: "保険診療と自費診療の売上、材料費、人件費を整理し、医院の収支を確認できます。" },
          { title: "設備投資・医療法人化のタイミングを相談", body: "医療機器の導入、借入れ、採用、分院展開、医療法人化を数字に基づいて相談できる税理士を探せます。" },
        ],
        voicesHeading: "歯科医院オーナー様の事例",
        voices: [
          {
            photo: dentalClinicCase1,
            photoAlt: "診療室にいるネイビーのスクラブ姿の男性歯科医師",
            name: "Nさん",
            quote: "診療後の事務作業が減り、患者さんと向き合うことに集中できています。",
            before: ["診療後に院長が経理", "保険・自費管理が煩雑", "機器費用・節税に迷う"],
            after: ["記帳・申告を任せる", "保険・自費を分けて確認", "機器導入や節税を相談"],
          },
          {
            photo: dentalClinicCase2,
            photoAlt: "歯科医院の受付前に立つスクラブ姿の男性院長",
            name: "Yさん",
            quote: "スタッフを増やす前に、医院の数字を一緒に確認できた安心感。",
            before: ["採用後の人件費が不安", "増設・分院判断に迷う", "法人化の相談相手なし"],
            after: ["採用後の収支を相談", "設備・借入れを数字で検討", "法人化・将来も相談"],
          },
        ],
      },
      faqItems: [
        { question: "歯科医院に詳しい税理士を紹介してもらえますか？", answer: "はい。診療内容や医院規模、開業・承継の状況、ご相談内容、エリア、予算を伺い、ご希望に合う税理士・会計事務所をお探しします。" },
        { question: "保険診療と自費診療の会計も相談できますか？", answer: "相談可能です。診療収入や窓口収入、材料費など現在の管理方法を伺い、医院に合う会計管理を相談できる税理士をご紹介します。" },
        { question: "医療機器の設備投資や借入れも相談できますか？", answer: "はい。導入予定の設備や資金計画を踏まえ、設備投資、借入れ、資金繰りを相談できる税理士をお探しします。" },
        { question: "医療法人化や分院展開も相談できますか？", answer: "はい。現在の医院規模や今後の計画を伺い、医療法人化や分院展開のタイミングを相談できる税理士をお探しします。" },
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
