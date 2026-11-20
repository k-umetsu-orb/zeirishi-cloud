import IndustryIntroduction from "@/page-components/IndustryIntroduction";

export default function IntroductionRetailLpPage() {
  return (
    <IndustryIntroduction
      industry="retail"
      hidePhoneCtas
      noindex
      formStepPath="/introduction-lp01/step"
    />
  );
}
