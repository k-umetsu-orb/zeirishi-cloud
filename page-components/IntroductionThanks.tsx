/**
 * Introduction Thanks page - /introduction/thanks
 */
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CheckCircle, ArrowRight } from "lucide-react";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";

export default function IntroductionThanks() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/introduction/thanks") return;
    window.gtag?.("event", "conversion", {
      send_to: "AW-18309633981/Wyg-CMCst80cEL2v25pE",
    });
  }, [router.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />

      <main className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="container max-w-lg py-20 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-primary" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-snug">
            お申し込みいただき<br />ありがとうございます！
          </h1>

          <div className="mt-8 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <p>ご入力いただいた内容を確認のうえ、</p>
            <p>1〜3営業日以内に担当者よりご連絡いたします。</p>
            <p>自動返信メールをお送りしておりますのでご確認ください。</p>
          </div>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(90deg,#1a50a8,#2563eb)" }}
            >
              トップページへ戻る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}
