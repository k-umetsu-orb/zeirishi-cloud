import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, Building2, ChevronRight, MapPin, Train } from "lucide-react";
import logoIcon from "@/images/税アイコン.png";
import type { Office } from "@/lib/data";
import { buildOfficeUrl } from "@/lib/data";
import { toDisplayName } from "@/lib/categorySlugMap";

interface OfficeCardProps {
  office: Office;
}

function CategoryTags({ values, emptyLabel = "-" }: { values: string[]; emptyLabel?: string }) {
  if (values.length === 0) {
    return <span className="text-sm text-muted-foreground">{emptyLabel}</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {values.slice(0, 4).map((value) => (
        <span key={value} className="rounded-md border border-[#b5cff0] bg-white px-2.5 py-1 text-xs font-bold leading-none text-[#075bc7]">
          {toDisplayName(value)}
        </span>
      ))}
      {values.length > 4 && <span className="rounded-md border border-border px-2.5 py-1 text-xs font-bold leading-none text-muted-foreground">+{values.length - 4}</span>}
    </div>
  );
}

export default function OfficeCard({ office }: OfficeCardProps) {
  const url = buildOfficeUrl(office);
  const area = [office.cityName, office.wardName].filter(Boolean).join("、") || "-";
  const stations = office.nearestStationNames.length > 0 ? office.nearestStationNames.join("・") : null;

  return (
    <article className="rounded-xl border border-[#dce8f5] bg-white p-4 shadow-[0_5px_18px_rgba(24,73,131,0.07)] transition-shadow duration-150 hover:shadow-[0_10px_25px_rgba(24,73,131,0.12)] md:p-6">
      <div className="grid grid-cols-[74px_minmax(0,1fr)] items-start gap-4 md:grid-cols-[140px_minmax(0,1fr)_230px] md:gap-6">
        <div className="flex aspect-square w-[74px] items-center justify-center rounded-lg border border-[#dce8f5] bg-[#f6faff] p-3 md:w-[140px] md:p-6">
          <Image src={logoIcon} alt="税理士クラウド" width={86} height={86} className="h-full w-full object-contain" />
        </div>

        <div className="min-w-0">
          <Link href={url} className="block w-fit text-lg font-extrabold leading-snug text-[#10233f] transition-colors hover:text-[#075bc7] md:text-2xl">
            {office.name}
          </Link>
          <p className="mt-2 flex items-start gap-1.5 text-sm font-medium leading-relaxed text-[#253b59] md:text-[15px]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#075bc7]" strokeWidth={2.4} />
            <span>{office.address}</span>
          </p>
          {stations && (
            <p className="mt-1 flex items-start gap-1.5 text-xs font-medium leading-relaxed text-muted-foreground md:text-sm">
              <Train className="mt-0.5 h-4 w-4 shrink-0 text-[#075bc7]" strokeWidth={2.1} />
              <span>{stations}</span>
            </p>
          )}
          <div className="mt-3">
            <CategoryTags values={office.industries} />
          </div>
        </div>

        <div className="col-span-2 grid gap-2 md:col-auto md:w-[230px] md:self-start">
          <Link href={url} className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-[linear-gradient(110deg,#075fce,#074cae)] px-4 text-center text-sm font-extrabold leading-snug text-white shadow-[0_5px_12px_rgba(2,83,181,0.16)] transition-opacity hover:opacity-90 md:min-h-[58px] md:text-[15px]">
            {office.name}の詳細を見る
            <ChevronRight className="h-5 w-5 shrink-0" strokeWidth={2.6} />
          </Link>
          <Link href="/introduction" className="flex min-h-11 items-center justify-center rounded-md border border-[#75a8ee] bg-white px-4 text-center text-sm font-extrabold text-[#075bc7] transition-colors hover:bg-[#f4f9ff] md:min-h-[48px] md:text-[15px]">
            税理士に関して相談する
          </Link>
        </div>
      </div>

      <div className="my-4 border-t border-[#d7e1ec] md:my-5" />

      <div className="grid gap-4 md:grid-cols-2 md:gap-0">
        <section className="md:border-r md:border-[#d7e1ec] md:pr-6">
          <h4 className="mb-2 border-l-[3px] border-[#075bc7] pl-2 text-sm font-extrabold text-[#173465]">対応エリア</h4>
          <p className="text-sm font-medium leading-relaxed text-[#253b59]">
            <span className="mr-2 inline-block rounded-md bg-[#edf5ff] px-2.5 py-1 text-xs font-extrabold text-[#075bc7]">{office.prefectureName}</span>
            {area}
          </p>
        </section>
        <section className="md:pl-6">
          <h4 className="mb-2 border-l-[3px] border-[#075bc7] pl-2 text-sm font-extrabold text-[#173465]">得意分野</h4>
          <CategoryTags values={office.industries} />
        </section>
      </div>

      <div className="my-4 border-t border-[#d7e1ec] md:my-5" />

      <section>
        <h4 className="mb-2 flex items-center gap-2 border-l-[3px] border-[#075bc7] pl-2 text-sm font-extrabold text-[#173465]">
          <BriefcaseBusiness className="h-4 w-4 text-[#075bc7]" strokeWidth={2.2} />
          対応業務
        </h4>
        <div className="flex flex-wrap gap-2">
          {office.services.length > 0 ? (
            <>
              {office.services.slice(0, 5).map((service) => (
                <span key={service} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#253b59]">
                  <Building2 className="h-4 w-4 text-[#075bc7]" strokeWidth={2.1} />
                  {toDisplayName(service)}
                </span>
              ))}
              {office.services.length > 5 && <span className="text-sm font-bold text-muted-foreground">+{office.services.length - 5}</span>}
            </>
          ) : (
            <span className="text-sm text-muted-foreground">-</span>
          )}
        </div>
      </section>
    </article>
  );
}
