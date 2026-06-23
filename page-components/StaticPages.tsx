/**
 * Static pages - Terms, Privacy, Company
 * Design: Warm Authority - clean, readable legal/info pages.
 */
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { usePageTitle } from "@/lib/usePageTitle";

function StaticPageLayout({ title, breadcrumbLabel, children }: { title: string; breadcrumbLabel: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />
      <main className="flex-1">
        <div className="container py-6">
          <Breadcrumb items={[{ label: breadcrumbLabel }]} />
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
            {title}
          </h1>
          <div className="max-w-3xl prose prose-sm text-foreground leading-relaxed">
            {children}
          </div>
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
}

export function Terms() {
  usePageTitle(
    "利用規約 | 税理士クラウド",
    "税理士クラウドの利用規約です。税理士・会計事務所をお探しなら税理士クラウド。",
  );
  return (
    <StaticPageLayout title="利用規約" breadcrumbLabel="利用規約">
      <section className="mb-8">
        <h2 className="font-serif text-lg font-bold text-foreground mb-3">第1条（適用）</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          本規約は、税理士クラウド（以下「当サイト」）が提供するすべてのサービスの利用条件を定めるものです。
          登録ユーザーの皆さまには、本規約に従って当サイトのサービスをご利用いただきます。
        </p>
      </section>
      <section className="mb-8">
        <h2 className="font-serif text-lg font-bold text-foreground mb-3">第2条（利用登録）</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          当サイトの検索・閲覧機能は登録不要でご利用いただけます。
          紹介サービスのご利用にあたっては、所定の方法により利用登録を申請し、当サイトがこれを承認することによって利用登録が完了するものとします。
        </p>
      </section>
      <section className="mb-8">
        <h2 className="font-serif text-lg font-bold text-foreground mb-3">第3条（禁止事項）</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          ユーザーは、当サイトの利用にあたり、以下の行為をしてはなりません。
          法令または公序良俗に違反する行為、犯罪行為に関連する行為、当サイトのサーバーまたはネットワークの機能を破壊したり妨害したりする行為、
          当サイトの運営を妨害するおそれのある行為、他のユーザーに関する個人情報等を収集または蓄積する行為、
          不正アクセスをし、またはこれを試みる行為、他のユーザーに成りすます行為。
        </p>
      </section>
      <section className="mb-8">
        <h2 className="font-serif text-lg font-bold text-foreground mb-3">第4条（免責事項）</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          当サイトに掲載されている情報の正確性、完全性、有用性等について、当サイトは一切の保証をいたしません。
          当サイトの利用により生じた損害について、当サイトは一切の責任を負いません。
        </p>
      </section>
      <section className="mb-8">
        <h2 className="font-serif text-lg font-bold text-foreground mb-3">第5条（サービス内容の変更等）</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          当サイトは、ユーザーに通知することなく、サービスの内容を変更しまたはサービスの提供を中止することができるものとし、
          これによってユーザーに生じた損害について一切の責任を負いません。
        </p>
      </section>
    </StaticPageLayout>
  );
}

export function Company() {
  return (
    <StaticPageLayout title="運営会社" breadcrumbLabel="運営会社">
      <section className="mb-8">
        <div className="bg-card border border-border rounded-lg p-5 md:p-7">
          <dl className="divide-y divide-border">
            {[
              { label: "会社名", value: "orb株式会社" },
              { label: "所在地", value: "東京都港区高輪2丁目14-17グレイス高輪905" },
              { label: "設立", value: "2024年8月" },
              { label: "代表者", value: "檜森 大河" },
            ].map((item, i) => (
              <div key={i} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-foreground mb-1 sm:mb-0">{item.label}</dt>
                <dd className="text-sm text-muted-foreground sm:col-span-2">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </StaticPageLayout>
  );
}
