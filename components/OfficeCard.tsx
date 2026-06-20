import Link from "next/link";
import { MapPin, Train, Briefcase, Building2, ChevronRight } from "lucide-react";
import type { Office } from "@/lib/data";
import { buildOfficeUrl } from "@/lib/data";
import { toDisplayName } from "@/lib/categorySlugMap";

interface OfficeCardProps {
  office: Office;
}

export default function OfficeCard({ office }: OfficeCardProps) {
  const url = buildOfficeUrl(office);
  const mapUrl = `${url}#map`;

  return (
    <Link href={url} className="block group h-full">
      <article className="h-full flex flex-col bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-sm transition-all duration-150">

        {/* Office name */}
        <h3 className="font-bold text-lg leading-snug mb-4 transition-colors" style={{ color: "#0067C0" }}>
          {office.name}
        </h3>

        {/* Divider */}
        <div className="border-t border-border mb-4" />

        {/* Info rows */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground/50" />
            <div className="flex flex-col gap-1">
              <span>{office.address}</span>
              <a
                href={mapUrl}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-0.5 text-xs text-primary border border-primary/40 rounded px-2 py-0.5 w-fit hover:bg-primary/5 transition-colors"
              >
                マップ
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Train className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground/50" />
            <span>{office.nearestStationNames.length > 0 ? office.nearestStationNames.join("・") : "-"}</span>
          </div>
        </div>

        {/* Industries chips */}
        <div className="flex items-start gap-2 mt-4">
          <Building2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground/50" />
          <div className="flex flex-wrap gap-1.5">
            {office.industries.length > 0 ? (
              <>
                {office.industries.slice(0, 3).map((ind) => (
                  <span
                    key={ind}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs border border-primary/40 text-primary"
                  >
                    {toDisplayName(ind)}
                  </span>
                ))}
                {office.industries.length > 3 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs border border-border text-muted-foreground/60">
                    +{office.industries.length - 3}
                  </span>
                )}
              </>
            ) : (
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs border border-border text-muted-foreground/40 min-w-[2rem]">
                -
              </span>
            )}
          </div>
        </div>

        {/* Services chips */}
        <div className="flex items-start gap-2 mt-2">
          <Briefcase className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground/50" />
          <div className="flex flex-wrap gap-1.5">
            {office.services.length > 0 ? (
              <>
                {office.services.slice(0, 3).map((svc) => (
                  <span
                    key={svc}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs border border-primary/40 text-primary"
                  >
                    {toDisplayName(svc)}
                  </span>
                ))}
                {office.services.length > 3 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs border border-border text-muted-foreground/60">
                    +{office.services.length - 3}
                  </span>
                )}
              </>
            ) : (
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs border border-border text-muted-foreground/40 min-w-[2rem]">
                -
              </span>
            )}
          </div>
        </div>

        {/* 詳細を見るボタン */}
        <div className="mt-5 pt-4 border-t border-border flex justify-center">
          <span className="flex items-center justify-center w-full py-3 rounded-xl border border-border bg-white shadow-sm text-sm font-bold text-foreground transition-colors">
            {office.name}の詳細情報を見る
          </span>
        </div>
      </article>
    </Link>
  );
}
