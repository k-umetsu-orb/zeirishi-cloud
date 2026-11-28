import IndustryIntroduction from "@/page-components/IndustryIntroduction";
import itFormCaseT from "@/images/industry-cases/it-form-t.png";
import itFormCaseY from "@/images/industry-cases/it-form-y.png";

export default function IntroductionItFormPage() {
  return (
    <div className="introduction-it-form-page">
      <IndustryIntroduction
        industry="it"
        noindex
        industrySectionOverride={{
          voicesHeading: "IT業の事例",
          voices: [
            {
              photo: itFormCaseT,
              photoAlt: "フリーランスエンジニアから法人成りしたTさん",
              name: "Tさん（フリーランスエンジニア → 法人成り）",
              quote: "法人化のタイミングから相談でき、自分の手元に残せるお金が増えました。",
              before: [
                "売上が増え、税金と保険料の負担が重い",
                "法人化すべきか、時期がわからない",
                "確定申告を自分でやり、相談相手がいない",
              ],
              after: [
                "役員報酬の金額を具体的に試算してもらえた",
                "自分に合った節税の提案をたくさんもらえた",
                "経理を任せて、事業に集中できるように",
              ],
            },
            {
              photo: itFormCaseY,
              photoAlt: "創業3年目のIT企業代表Yさん",
              name: "Yさん（創業3年目・IT企業代表）",
              quote: "税理士を変えて、顧問料が下がり相談もしやすくなりました。",
              before: [
                "顧問料が高く、見合っているか疑問",
                "連絡はメールのみで、返信が遅い",
                "資金調達や採用の相談がしづらい",
              ],
              after: [
                "条件に合う事務所を比べて選べた",
                "チャットで気軽に聞けて、返信も早い",
                "融資や今後の経営も相談できるように",
              ],
            },
          ],
        }}
      />

      <style jsx global>{`
        .introduction-it-form-page .intro-industry-voice__person {
          padding-right: 4rem;
          line-height: 1.45;
        }

        .introduction-it-form-page .intro-industry-voice__person strong {
          display: block;
        }

        @media (max-width: 767px) {
          .introduction-it-form-page .intro-industry-voice__person {
            padding-right: 2.75rem;
          }
        }
      `}</style>
    </div>
  );
}
