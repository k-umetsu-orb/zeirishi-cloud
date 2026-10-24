import IndustryIntroduction from "@/page-components/IndustryIntroduction";

export default function IntroductionItLpPage() {
  return (
    <IndustryIntroduction
      industry="it"
      hidePhoneCtas
      noindex
      formStepPath="/introduction-lp01/step"
    />
  );
}
