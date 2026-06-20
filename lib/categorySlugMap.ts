/**
 * Mapping between URL slugs and office data field values.
 * Industries: /search/:slug  (type = "industry")
 * Services:   /search/:slug  (type = "service")
 */

export interface CategoryInfo {
  slug: string;
  name: string;
  type: "industry" | "service";
  /** Values that appear in offices.json industries[] or services[] */
  dbValues: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  // ── 業種 ──────────────────────────────────────────────────────
  { slug: "it",                type: "industry", name: "IT・通信",     dbValues: ["IT・通信業", "IT・情報通信", "IT・通信"] },
  { slug: "construction",      type: "industry", name: "建設",         dbValues: ["建設業", "建設"] },
  { slug: "manufacturing",     type: "industry", name: "製造",         dbValues: ["製造業", "製造"] },
  { slug: "retail",            type: "industry", name: "流通・小売", dbValues: ["小売業", "小売", "流通・小売"] },
  { slug: "wholesale",         type: "industry", name: "卸売",         dbValues: ["卸売業", "卸売"] },
  { slug: "restaurant",        type: "industry", name: "飲食",         dbValues: ["飲食業", "飲食・宿泊業", "飲食・宿泊", "飲食"] },
  { slug: "accommodation",     type: "industry", name: "宿泊",         dbValues: ["宿泊業", "宿泊"] },
  { slug: "real-estate",       type: "industry", name: "不動産",       dbValues: ["不動産業", "不動産"] },
  { slug: "finance",           type: "industry", name: "金融",         dbValues: ["金融・保険業", "金融・保険", "金融"] },
  { slug: "beauty",            type: "industry", name: "美容",         dbValues: ["理美容業", "理美容", "美容"] },
  { slug: "education",         type: "industry", name: "教育",         dbValues: ["教育・学習支援業", "教育・学術支援業", "教育・学術支援", "教育"] },
  { slug: "service",           type: "industry", name: "サービス",     dbValues: ["サービス業", "サービス"] },
  { slug: "agriculture",       type: "industry", name: "農林水産",     dbValues: ["農林水産業", "農業・林業・漁業", "農業", "農林水産"] },
  { slug: "medical",           type: "industry", name: "医療・福祉",   dbValues: ["医療・福祉業", "医療・福祉"] },
  { slug: "transport",         type: "industry", name: "運輸業",       dbValues: ["運輸業"] },
  { slug: "special-corp",      type: "industry", name: "各種法人",     dbValues: ["特殊法人", "各種法人"] },
  { slug: "others",            type: "industry", name: "その他",       dbValues: ["その他"] },

  // ── 依頼内容 ──────────────────────────────────────────────────
  { slug: "settlement-of-accounts", type: "service", name: "法人決算・申告",       dbValues: ["法人決算・申告", "法人の決算・申告", "法人決算申告"] },
  { slug: "invoice",                type: "service", name: "インボイス対応",       dbValues: ["インボイス対応"] },
  { slug: "freelance-tax",          type: "service", name: "個人確定申告",         dbValues: ["個人確定申告", "個人事業主の確定申告"] },
  { slug: "tax-investigation",      type: "service", name: "税務調査対応",         dbValues: ["税務調査対応", "税務調査"] },
  { slug: "bookkeeping",            type: "service", name: "記帳代行",             dbValues: ["記帳代行"] },
  { slug: "accounting-agent",       type: "service", name: "経理代行",             dbValues: ["経理代行"] },
  { slug: "payroll",                type: "service", name: "給与計算代行",         dbValues: ["給与計算代行", "給与計算"] },
  { slug: "year-end-adjustment",    type: "service", name: "年末調整対応",         dbValues: ["年末調整対応", "年末調整"] },
  { slug: "labor-insurance",        type: "service", name: "労務・社保対応",       dbValues: ["労務・社保対応", "労務・社会保険関連", "労務、社会保険関連", "人事相談", "社会保険関連", "労務", "労務・社会保険"] },
  { slug: "electronic-bookkeeping", type: "service", name: "電子帳簿保存法対応",   dbValues: ["電子帳簿保存法対応"] },
  { slug: "software-support",       type: "service", name: "会計ソフト導入支援",   dbValues: ["会計ソフト導入支援", "ソフトの導入運用支援", "ソフト導入運用支援", "ソフト導入支援"] },
  { slug: "corporate-tax",          type: "service", name: "法人税",               dbValues: ["法人税"] },
  { slug: "consumption-tax",        type: "service", name: "消費税",               dbValues: ["消費税"] },
  { slug: "income-tax",             type: "service", name: "所得税",               dbValues: ["所得税"] },
  { slug: "inheritance-tax",        type: "service", name: "相続税・資産税対応",   dbValues: ["相続税・資産税対応", "相続税・資産税"] },
  { slug: "tax-saving",             type: "service", name: "節税対策",             dbValues: ["節税対策", "節税"] },
  { slug: "company-establishment",  type: "service", name: "起業・会社設立支援",   dbValues: ["起業・会社設立支援", "起業・会社設立", "起業支援"] },
  { slug: "incorporation",          type: "service", name: "法人化支援",           dbValues: ["法人化支援", "法人成り"] },
  { slug: "financial-plan",         type: "service", name: "資金計画支援",         dbValues: ["資金計画支援", "ファイナンシャルプラン"] },
  { slug: "funding",                type: "service", name: "資金調達・補助金支援", dbValues: ["資金調達・補助金支援", "資金調達・補助金・助成金", "融資サポート"] },
  { slug: "consulting",             type: "service", name: "経営支援",             dbValues: ["経営支援", "経営アドバイス", "経営計画策定支援", "経営計画策定"] },
  { slug: "business-succession",    type: "service", name: "事業承継・M&A支援",    dbValues: ["事業承継・M&A支援", "事業承継・M&A", "事業承継"] },
  { slug: "ipo",                    type: "service", name: "IPO支援",               dbValues: ["IPO支援"] },
];

const slugMap = new Map<string, CategoryInfo>(CATEGORIES.map((c) => [c.slug, c]));

/**
 * Maps option label names (as used in SERVICE_OPTIONS / INDUSTRY_OPTIONS)
 * to their URL slug. Only includes items that have a dedicated category page.
 */
export const OPTION_NAME_TO_SLUG: Record<string, string> = {
  // 業種
  "IT・通信":     "it",
  "建設":         "construction",
  "製造":         "manufacturing",
  "流通・小売": "retail",
  "卸売":         "wholesale",
  "飲食":         "restaurant",
  "宿泊":         "accommodation",
  "不動産":       "real-estate",
  "金融":         "finance",
  "美容":         "beauty",
  "教育":         "education",
  "サービス":     "service",
  "農林水産":     "agriculture",
  "医療・福祉":   "medical",
  "各種法人":     "special-corp",
  "その他":       "others",
  // 依頼内容
  "法人決算・申告":           "settlement-of-accounts",
  "個人確定申告":             "freelance-tax",
  "記帳代行":                 "bookkeeping",
  "年末調整対応":             "year-end-adjustment",
  "経理代行":                 "accounting-agent",
  "インボイス対応":           "invoice",
  "電子帳簿保存法対応":       "electronic-bookkeeping",
  "起業・会社設立支援":       "company-establishment",
  "法人化支援":               "incorporation",
  "事業承継・M&A支援":        "business-succession",
  "法人税":                   "corporate-tax",
  "所得税":                   "income-tax",
  "消費税":                   "consumption-tax",
  "相続税・資産税対応":       "inheritance-tax",
  "節税対策":                 "tax-saving",
  "税務調査対応":             "tax-investigation",
  "資金計画支援":             "financial-plan",
  "資金調達・補助金支援":     "funding",
  "IPO支援":           "ipo",
  "経営支援":                 "consulting",
  "労務・社保対応":           "labor-insurance",
  "給与計算代行":             "payroll",
  "会計ソフト導入支援":       "software-support",
};

/**
 * Maps raw DB values (offices.json industries/services) to display names
 * matching INDUSTRY_OPTIONS / SERVICE_OPTIONS used in the search form.
 */
export const DB_VALUE_TO_DISPLAY: Record<string, string> = {
  // 業種
  "IT・通信業":       "IT・通信",
  "IT・情報通信":     "IT・通信",
  "建設業":           "建設",
  "建設":             "建設",
  "製造業":           "製造",
  "製造":             "製造",
  "小売業":           "流通・小売",
  "小売":             "流通・小売",
  "流通・小売":     "流通・小売",
  "卸売業":           "卸売",
  "卸売":             "卸売",
  "飲食業":           "飲食",
  "飲食・宿泊業":     "飲食",
  "飲食・宿泊":       "飲食",
  "飲食":             "飲食",
  "宿泊業":           "宿泊",
  "宿泊":             "宿泊",
  "不動産業":         "不動産",
  "不動産":           "不動産",
  "金融・保険業":     "金融",
  "金融・保険":       "金融",
  "金融":             "金融",
  "理美容業":         "美容",
  "理美容":           "美容",
  "美容":             "美容",
  "教育・学習支援業": "教育",
  "教育・学術支援業": "教育",
  "教育・学術支援":   "教育",
  "教育":             "教育",
  "サービス業":       "サービス",
  "サービス":         "サービス",
  "農林水産業":       "農林水産",
  "農業・林業・漁業": "農林水産",
  "農業":             "農林水産",
  "農林水産":         "農林水産",
  "医療・福祉業":     "医療・福祉",
  "医療・福祉":       "医療・福祉",
  "運輸業":           "運輸業",
  "特殊法人":         "各種法人",
  "各種法人":         "各種法人",
  // 依頼内容
  "法人決算・申告":         "法人決算・申告",
  "法人の決算・申告":       "法人決算・申告",
  "法人決算申告":           "法人決算・申告",
  "個人確定申告":           "個人確定申告",
  "個人事業主の確定申告":   "個人確定申告",
  "記帳代行":               "記帳代行",
  "年末調整対応":           "年末調整対応",
  "年末調整":               "年末調整対応",
  "経理代行":               "経理代行",
  "インボイス対応":         "インボイス対応",
  "電子帳簿保存法対応":     "電子帳簿保存法対応",
  "起業・会社設立支援":     "起業・会社設立支援",
  "起業・会社設立":         "起業・会社設立支援",
  "起業支援":               "起業・会社設立支援",
  "法人化支援":             "法人化支援",
  "法人成り":               "法人化支援",
  "事業承継・M&A支援":      "事業承継・M&A支援",
  "事業承継・M&A":          "事業承継・M&A支援",
  "事業承継":               "事業承継・M&A支援",
  "法人税":                 "法人税",
  "所得税":                 "所得税",
  "消費税":                 "消費税",
  "相続税・資産税対応":     "相続税・資産税対応",
  "相続税・資産税":         "相続税・資産税対応",
  "節税対策":               "節税対策",
  "節税":                   "節税対策",
  "税務調査対応":           "税務調査対応",
  "税務調査":               "税務調査対応",
  "経営支援":               "経営支援",
  "経営アドバイス":         "経営支援",
  "給与計算代行":           "給与計算代行",
  "給与計算":               "給与計算代行",
  "資金調達・補助金支援":   "資金調達・補助金支援",
  "資金調達・補助金・助成金": "資金調達・補助金支援",
  "融資サポート":           "資金調達・補助金支援",
  "資金計画支援":           "資金計画支援",
  "ファイナンシャルプラン": "資金計画支援",
  "IPO支援":         "IPO支援",
  "公開（IPO）支援":   "IPO支援",
  "経営計画策定支援":       "経営支援",
  "経営計画策定":           "経営支援",
  "労務・社保対応":         "労務・社保対応",
  "労務・社会保険関連":     "労務・社保対応",
  "労務、社会保険関連":     "労務・社保対応",
  "人事相談":               "労務・社保対応",
  "社会保険関連":           "労務・社保対応",
  "労務":                   "労務・社保対応",
  "労務・社会保険":         "労務・社保対応",
  "会計ソフト導入支援":     "会計ソフト導入支援",
  "ソフトの導入運用支援":   "会計ソフト導入支援",
  "ソフト導入運用支援":     "会計ソフト導入支援",
  "ソフト導入支援":         "会計ソフト導入支援",
};

/** Convert a raw DB value to its display name, falling back to the original. */
export function toDisplayName(dbValue: string): string {
  return DB_VALUE_TO_DISPLAY[dbValue] ?? dbValue;
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return slugMap.get(slug);
}

export function getCategoriesByType(type: "industry" | "service"): CategoryInfo[] {
  return CATEGORIES.filter((c) => c.type === type);
}
