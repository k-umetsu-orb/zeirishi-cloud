import IndustryIntroduction from "@/page-components/IndustryIntroduction";

export default function IntroductionConstructionLpPage() {
  return (
    <IndustryIntroduction
      industry="construction"
      hidePhoneCtas
      noindex
      formStepPath="/introduction-lp01/step"
    />
  );
}
