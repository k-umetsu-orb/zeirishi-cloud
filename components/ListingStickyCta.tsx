import Link from "next/link";
import { ArrowRight, CircleCheck, LockKeyhole, Phone, ShieldCheck, UserSearch, Users } from "lucide-react";

const PHONE_NUMBER = "03-6403-3202";

export default function ListingStickyCta() {
  return (
    <>
      <div className="h-[90px] md:h-32" aria-hidden="true" />

      <aside
        className="fixed bottom-0 left-0 z-[60] w-full border-t border-blue-300/70 bg-[linear-gradient(118deg,#087bd9_0%,#0567cf_42%,#0046b5_100%)] p-[5px] text-white shadow-[0_-8px_28px_rgba(12,55,126,0.2)] md:p-3 xl:bottom-3 xl:left-1/2 xl:w-[calc(100%_-_56px)] xl:-translate-x-1/2 xl:rounded-[22px] xl:border xl:shadow-[0_18px_42px_rgba(12,55,126,0.28)]"
        aria-label="税理士紹介サービス・電話相談"
      >
        {/* SP・タブレット：税理士紹介ページと同じ80px / 104pxのコンパクトバー */}
        <div className="grid h-20 grid-cols-2 gap-[6px] md:h-[104px] xl:hidden">
          <Link href="/introduction" className="group grid min-w-0 grid-cols-[2rem_minmax(0,1fr)_1.25rem] items-center gap-1 rounded-[18px] bg-[#0877e8] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] md:grid-cols-[3.5rem_minmax(0,1fr)_1.5rem] md:px-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0769d6] md:h-14 md:w-14">
              <Users className="h-4 w-4 md:h-7 md:w-7" strokeWidth={2.4} />
            </span>
            <span className="flex min-w-0 flex-col items-center text-center">
              <span className="mb-1 inline-flex rounded-full bg-[#ffe16b] px-2 py-0.5 text-[0.5rem] font-bold leading-none text-[#0755b6] md:hidden">最短30秒で相談完了</span>
              <span className="text-[0.62rem] font-bold leading-[1.2] md:text-lg">税理士選びで<br />お悩みの方はこちら</span>
            </span>
            <ArrowRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.6} />
          </Link>

          <a href={`tel:${PHONE_NUMBER}`} aria-label={`電話で相談する ${PHONE_NUMBER}`} className="group grid min-w-0 grid-cols-[2rem_minmax(0,1fr)_1.25rem] items-center gap-1 rounded-[18px] bg-white px-3 py-2 text-[#0755b6] md:grid-cols-[3.5rem_minmax(0,1fr)_1.5rem] md:px-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f2ff] text-[#0769d6] md:h-14 md:w-14">
              <Phone className="h-4 w-4 md:h-7 md:w-7" fill="currentColor" strokeWidth={1.5} />
            </span>
            <span className="col-start-2 min-w-0 text-center">
              <span className="block whitespace-nowrap text-[0.58rem] font-bold leading-tight md:text-xs">受付：9時〜22時（平日）</span>
              <span className="mt-1 block text-[0.9rem] font-bold leading-tight md:text-lg">電話で相談</span>
            </span>
            <ArrowRight className="col-start-3 h-5 w-5 md:h-6 md:w-6" strokeWidth={2.6} />
          </a>
        </div>

        {/* PC：添付案の3カラム構成を104px高に圧縮 */}
        <div className="mx-auto hidden h-[104px] max-w-none grid-cols-[minmax(0,0.82fr)_minmax(400px,1.1fr)_minmax(300px,0.72fr)] gap-3 xl:grid">
          <section className="relative flex min-w-0 items-center gap-3 overflow-hidden rounded-xl px-3">
            <span aria-hidden="true" className="absolute -bottom-8 -left-7 h-28 w-56 rotate-[28deg] bg-white/[0.07]" />
            <span aria-hidden="true" className="absolute bottom-2 left-3 h-9 w-36 opacity-30 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:10px_10px]" />
            <span
              className="relative flex h-11 w-11 shrink-0 translate-x-16 items-center justify-center bg-[#ffe16b] text-xs font-black text-[#0755b6] shadow-[0_4px_10px_rgba(0,48,131,0.2)]"
              style={{ clipPath: "polygon(50% 0%, 61% 9%, 75% 5%, 82% 18%, 96% 22%, 92% 36%, 100% 50%, 92% 63%, 96% 78%, 82% 82%, 75% 95%, 61% 91%, 50% 100%, 39% 91%, 25% 95%, 18% 82%, 4% 78%, 8% 63%, 0% 50%, 8% 36%, 4% 22%, 18% 18%, 25% 5%, 39% 9%)" }}
            >
              無料
            </span>
            <div className="relative ml-24 min-w-0">
              <p className="text-[clamp(1rem,1.3vw,1.3rem)] font-bold leading-tight tracking-[-0.02em]">悩んだら、今すぐプロに相談</p>
              <p className="mt-1 text-[clamp(0.7rem,0.85vw,0.82rem)] font-medium leading-tight">あなたに最適な税理士をご紹介します</p>
              <div className="mt-2 flex gap-2 text-[0.52rem] font-medium leading-tight text-blue-50">
                <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 shrink-0" />厳選税理士のみ</span>
                <span className="flex items-center gap-1 border-l border-white/25 pl-2"><CircleCheck className="h-4 w-4 shrink-0" />中立的にご提案</span>
                <span className="flex items-center gap-1 border-l border-white/25 pl-2"><LockKeyhole className="h-4 w-4 shrink-0" />相談内容は非公開</span>
              </div>
            </div>
          </section>

          <Link href="/introduction" className="group relative flex min-w-0 items-center justify-center rounded-[18px] border border-blue-200/80 bg-[linear-gradient(135deg,#1688ee,#0768d5)] px-20 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_8px_18px_rgba(0,40,130,0.24)] transition-transform hover:-translate-y-0.5">
            <span className="absolute left-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#0769d6]">
              <UserSearch className="h-7 w-7" strokeWidth={2.4} />
            </span>
            <span className="flex min-w-0 -translate-y-2 flex-col items-center text-center">
              <span className="mb-1 inline-flex rounded-full bg-[#ffe16b] px-3 py-1 text-[0.62rem] font-bold text-[#0755b6]">最短30秒で相談完了</span>
              <span className="block whitespace-nowrap text-[clamp(0.92rem,1.18vw,1.12rem)] font-bold leading-tight tracking-[-0.03em]">税理士選びでお悩みの方はこちら</span>
            </span>
            <ArrowRight className="absolute right-4 h-6 w-6 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>

          <a href={`tel:${PHONE_NUMBER}`} aria-label={`電話で相談する ${PHONE_NUMBER}`} className="group relative flex min-w-0 items-center justify-center rounded-[18px] bg-white px-16 pb-3 pt-8 text-[#0755b6] shadow-[0_8px_18px_rgba(0,40,130,0.16)] transition-transform hover:-translate-y-0.5">
            <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#2a76ed] px-3 py-1 text-[0.62rem] font-bold">受付時間：9時〜22時（平日）</span>
            <span className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#e8f2ff] text-[#0769d6]">
              <Phone className="h-6 w-6" fill="currentColor" strokeWidth={1.5} />
            </span>
            <span className="w-full -translate-y-[2px] whitespace-nowrap text-center text-[clamp(0.92rem,1.18vw,1.12rem)] font-bold">電話で相談</span>
            <ArrowRight className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </a>
        </div>
      </aside>
    </>
  );
}
