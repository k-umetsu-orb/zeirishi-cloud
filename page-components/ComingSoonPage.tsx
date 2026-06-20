/**
 * Coming Soon page - placeholder for sections not yet officially released
 * (interview / guide / column / recommendation index pages).
 * Design matches the existing list pages' hero section (GuideTop, ColumnList, etc.).
 */
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb from "@/components/Breadcrumb";
import ComingSoonNotice from "@/components/ComingSoonNotice";
import { usePageTitle } from "@/lib/usePageTitle";

interface ComingSoonPageProps {
  breadcrumbLabel: string;
  heading: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
}

export default function ComingSoonPage({
  breadcrumbLabel,
  heading,
  lead,
  metaTitle,
  metaDescription,
}: ComingSoonPageProps) {
  usePageTitle(metaTitle, metaDescription);

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-primary/5">
          <div className="container pt-6 pb-10 md:pb-14">
            <Breadcrumb items={[{ label: breadcrumbLabel }]} className="pt-3 pb-7 md:pb-11" />
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
              {heading}
            </h1>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl leading-relaxed">
              {lead}
            </p>
          </div>
        </section>

        <div className="container py-16 md:py-24">
          <ComingSoonNotice label={breadcrumbLabel} />
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
