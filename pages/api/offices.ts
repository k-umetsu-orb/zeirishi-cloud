import type { NextApiRequest, NextApiResponse } from "next";
import { getAllOffices } from "@/lib/offices-server";
import type { Office } from "@/lib/data";

type OfficesResponse = {
  offices: Office[];
  total: number;
  page: number;
  limit: number;
};

type CountResponse = {
  total: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<OfficesResponse | CountResponse>
) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  const { industry, service, prefecture, city, ward, station, sort, page, limit, countOnly } = req.query;

  const industries = Array.isArray(industry) ? industry : industry ? [industry] : [];
  const services = Array.isArray(service) ? service : service ? [service] : [];
  const prefSlug = typeof prefecture === "string" ? prefecture : undefined;
  const citySlug = typeof city === "string" ? city : undefined;
  const wardSlug = typeof ward === "string" ? ward : undefined;
  const stationSlug = typeof station === "string" ? station : undefined;
  const sortKey = typeof sort === "string" ? sort : undefined;
  const pageNum = Math.max(1, parseInt(typeof page === "string" ? page : "1", 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(typeof limit === "string" ? limit : "12", 10) || 12));

  let offices = getAllOffices();

  if (prefSlug) offices = offices.filter((o) => o.prefecture === prefSlug);
  if (citySlug) offices = offices.filter((o) => o.city === citySlug);
  if (wardSlug) offices = offices.filter((o) => o.ward === wardSlug);
  if (stationSlug) offices = offices.filter((o) => o.nearestStations.includes(stationSlug));
  if (industries.length > 0) {
    offices = offices.filter((o) =>
      o.industries.some((i) => industries.includes(i))
    );
  }
  if (services.length > 0) {
    offices = offices.filter((o) =>
      o.services.some((s) => services.includes(s))
    );
  }

  if (sortKey === "staffCount") {
    offices = [...offices].sort((a, b) => b.staffCount - a.staffCount);
  }

  const total = offices.length;

  if (countOnly === "true") {
    res.status(200).json({ total });
    return;
  }

  const paginated = offices.slice((pageNum - 1) * limitNum, pageNum * limitNum);

  res.status(200).json({ offices: paginated, total, page: pageNum, limit: limitNum });
}
