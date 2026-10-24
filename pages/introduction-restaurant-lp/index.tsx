import IndustryIntroduction from "@/page-components/IndustryIntroduction";

export default function IntroductionRestaurantLpPage() {
  return (
    <IndustryIntroduction
      industry="restaurant"
      hidePhoneCtas
      noindex
      formStepPath="/introduction-lp01/step"
    />
  );
}
