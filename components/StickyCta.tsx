/**
 * Shared "税理士を比較してみる" / "電話で相談する" CTA pair.
 * Styles mirror /introduction (page-components/Introduction.tsx) so the
 * sticky bottom bar and inline CTA look identical across pages.
 */
import Link from "next/link";
import { ArrowRight, CircleCheck, Mail, MousePointerClick, Phone } from "lucide-react";

const PHONE_NUMBER = "03-6403-3202";

function HeroPhoneCta() {
  return (
    <a href={`tel:${PHONE_NUMBER}`} aria-label={`電話で相談する ${PHONE_NUMBER}`} className="testlp-phone-cta">
      <div className="testlp-phone-cta__main">
        <div
          className="testlp-phone-cta__icon"
          style={{ background: "linear-gradient(135deg,#0b68b7 0%,#004b9f 100%)" }}
        >
          <Phone className="testlp-phone-cta__icon-svg" />
        </div>
        <div className="testlp-phone-cta__body">
          <p className="testlp-phone-cta__label">
            <span>お電話でのご相談はこちら </span>
            <span>（通話無料）</span>
          </p>
          <p className="testlp-phone-cta__number">{PHONE_NUMBER}</p>
        </div>
        <div className="testlp-phone-cta__tap" aria-hidden="true">
          <MousePointerClick className="testlp-phone-cta__tap-icon" />
          <span>タップで発信</span>
        </div>
      </div>
      <div className="testlp-phone-cta__hours">
        <p>
          <CircleCheck className="testlp-phone-cta__check" />
          <span>受付時間：9時〜22時（平日）</span>
        </p>
      </div>
    </a>
  );
}

function HeroFormCta() {
  return (
    <Link
      href="/introduction"
      className="testlp-form-cta group"
      style={{ background: "linear-gradient(135deg,#ff9f1c 0%,#f97316 48%,#fb4b1f 100%)" }}
    >
      <div className="testlp-form-cta__main">
        <div className="testlp-form-cta__free"><Mail /></div>
        <div className="testlp-form-cta__body">
          <p className="testlp-form-cta__label">あなたに合う</p>
          <p className="testlp-form-cta__title">税理士を比較してみる</p>
          <p className="testlp-form-cta__note">【最短1週間で完了！】</p>
        </div>
        <div className="testlp-form-cta__arrow">
          <ArrowRight className="testlp-form-cta__arrow-svg" />
        </div>
      </div>
    </Link>
  );
}

/** Inline CTA pair (used e.g. within a section, not fixed to the viewport). */
export function ConcernsCta() {
  return (
    <div className="intro-concerns__cta">
      <HeroFormCta />
      <HeroPhoneCta />
    </div>
  );
}

/** Sticky bottom CTA bar, fixed to the viewport. */
export function StickyCta() {
  return (
    <aside className="intro-sticky-cta" aria-label="無料相談・電話相談">
      <div className="intro-sticky-cta__inner intro-concerns__cta">
        <HeroFormCta />
        <HeroPhoneCta />
      </div>
      <style jsx global>{`
.testlp-phone-cta,
.testlp-form-cta {display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          min-height: min(27.5vw, 108px);
          max-width: none;
          box-sizing: border-box;
          border-radius: 2.1vw;
          text-decoration: none; }
.testlp-phone-cta {border: 2px solid #1a50a8;
          background: rgba(255, 255, 255, 0.97);
          padding: 2.5vw 3vw;
          box-shadow: 0 12px 28px rgba(26, 80, 168, 0.12); }
.testlp-phone-cta__main {display: grid;
          grid-template-columns: 9.9vw minmax(0, 1fr) auto;
          align-items: center;
          justify-content: center;
          gap: 2.4vw; }
.testlp-phone-cta__icon {display: flex;
          width: 9.9vw;
          height: 9.9vw;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          color: #fff;
          box-shadow: 0 8px 18px rgba(26, 80, 168, 0.20); }
.testlp-phone-cta__icon-svg {width: 5.3vw;
          height: 5.3vw; }
.testlp-phone-cta__body {min-width: 0;
          text-align: center; }
.testlp-phone-cta__tap {display: flex;
          min-width: 12.5vw;
          align-items: center;
          justify-content: center;
          align-self: stretch;
          flex-direction: column;
          gap: 0.7vw;
          padding-left: 1.4vw;
          color: #0b4b91;
          font-size: clamp(0.46rem, 2vw, 0.6rem);
          font-weight: 900;
          line-height: 1.3;
          white-space: nowrap; }
@media (max-width: 767px) {
  .testlp-phone-cta__tap {transform: translateX(-5.5vw); }
}
.testlp-phone-cta__tap-icon {width: 5.8vw;
          height: 5.8vw;
          color: #1556b7; }
.testlp-phone-cta__label {margin: 0 0 1.1vw;
          color: #0b4b91;
          font-size: clamp(0.64rem, 2.6vw, 0.78rem);
          font-weight: 900;
          line-height: 1.2;
          white-space: nowrap; }
.testlp-phone-cta__number {margin: 0;
          color: #0b4b91;
          font-size: clamp(1.15rem, 5.8vw, 1.45rem);
          font-weight: 900;
          line-height: 1;
          white-space: nowrap; }
.testlp-phone-cta__hours {margin-top: 2vw;
          border-top: 1px dashed #b7d1ec;
          padding-top: 2vw; }
.testlp-phone-cta__hours p {display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.6vw;
          margin: 0;
          color: #1f3f68;
          font-size: clamp(0.62rem, 2.9vw, 0.78rem);
          font-weight: 800;
          line-height: 1.4; }
.testlp-phone-cta__check {width: 4vw;
          height: 4vw;
          flex: 0 0 auto;
          color: #1a50a8; }
.testlp-form-cta {padding: 2.5vw 3vw;
          color: #fff;
          box-shadow: 0 12px 28px rgba(249, 115, 22, 0.20);
          transition: transform 0.18s ease; }
.testlp-form-cta:hover {transform: translateY(-2px); }
.testlp-form-cta__main {display: grid;
          grid-template-columns: 9.3vw minmax(0, 1fr) 7.5vw;
          align-items: center;
          gap: 1vw; }
.testlp-form-cta__free {display: flex;
          width: 9.3vw;
          height: 9.3vw;
          align-items: center;
          justify-content: center;
          border: 3px solid rgba(255, 255, 255, 0.62);
          border-radius: 9999px;
          background: #fff;
          color: #f97316;
          font-size: clamp(0.64rem, 2.85vw, 0.82rem);
          font-weight: 900;
          line-height: 1; }
.testlp-form-cta__body {min-width: 0;
          text-align: center; }
.testlp-form-cta__label {margin: 0 0 0.8vw;
          font-size: clamp(0.66rem, 3.05vw, 0.82rem);
          font-weight: 800;
          line-height: 1.25; }
.testlp-form-cta__title {margin: 0;
          font-size: clamp(1.08rem, 5.35vw, 1.3rem);
          font-weight: 900;
          line-height: 1.18;
          white-space: nowrap; }
.testlp-form-cta__note {margin: 0.5vw 0 0;
          font-size: clamp(0.5rem, 2.1vw, 0.66rem);
          font-weight: 800;
          line-height: 1.2;
          white-space: nowrap; }
.testlp-form-cta__arrow {display: flex;
          width: 7.5vw;
          height: 7.5vw;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: #fff;
          color: #f97316;
          transition: transform 0.18s ease; }
.testlp-form-cta:hover .testlp-form-cta__arrow {transform: translateX(4px); }
.testlp-form-cta__arrow-svg {width: 4vw;
          height: 4vw; }
.testlp-form-cta__sub {display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5vw;
          margin-top: 1.7vw;
          border-radius: 1.4vw;
          background: rgba(255, 255, 255, 0.94);
          padding: 1.45vw 1.6vw;
          color: #f97316;
          font-size: clamp(0.5rem, 2.15vw, 0.62rem);
          font-weight: 800;
          line-height: 1.4;
          white-space: nowrap; }
.testlp-form-cta__monitor {width: 3.5vw;
          height: 3.5vw;
          flex: 0 0 auto; }
@media (min-width: 768px) {
  .testlp-phone-cta__main {display: flex; }
  .testlp-phone-cta__tap {display: none; }
}
.intro-concerns__cta {display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0;
          max-width: 1080px;
          margin: 28px auto 0;
          overflow: hidden;
          border: 1px solid #d3e1f4;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 8px 20px rgba(33, 78, 148, 0.1); }
.intro-concerns__cta .testlp-phone-cta,
.intro-concerns__cta .testlp-form-cta {min-height: 110px;
          border: 0;
          border-radius: 0;
          box-shadow: none; }
.intro-concerns__cta .testlp-form-cta {border-right: 1px solid #dbe7f5; }
.intro-concerns__cta .testlp-phone-cta__main {display: flex; gap: 14px; }
.intro-concerns__cta .testlp-phone-cta__icon {width: 54px; height: 54px; }
.intro-concerns__cta .testlp-phone-cta__icon-svg {width: 28px; height: 28px; }
.intro-concerns__cta .testlp-phone-cta__label {margin-bottom: 4px; font-size: 0.78rem; }
.intro-concerns__cta .testlp-phone-cta__number {font-size: clamp(1.35rem, 3vw, 2.25rem); }
.intro-concerns__cta .testlp-phone-cta__hours {display: none; }
.intro-concerns__cta .testlp-form-cta {padding: 15px 20px; }
.intro-concerns__cta .testlp-form-cta__main {display: flex; align-items: center; justify-content: center; gap: 12px; }
.intro-concerns__cta .testlp-form-cta__free {width: 58px; height: 58px; flex: 0 0 auto; border-width: 0; font-size: 0; }
.intro-concerns__cta .testlp-form-cta__free svg {width: 31px; height: 31px; }
.intro-concerns__cta .testlp-form-cta__label {display: none; }
.intro-concerns__cta .testlp-form-cta__body {flex: 0 1 auto; min-width: 0; }
.intro-concerns__cta .testlp-form-cta__title {font-size: clamp(1.25rem, 2.25vw, 1.85rem); }
.intro-concerns__cta .testlp-form-cta__arrow {position: static; width: 34px; height: 34px; flex: 0 0 auto; }
.intro-concerns__cta .testlp-form-cta__arrow-svg {width: 20px; height: 20px; }
.intro-concerns__cta .testlp-form-cta__sub {margin-top: 5px; background: transparent; padding: 0; color: #fff; font-size: 0.72rem; }
.intro-concerns__cta .testlp-form-cta__monitor {display: none; }
@media (max-width: 767px) {
  .intro-concerns__cta {grid-template-columns: 1fr; }
  .intro-concerns__cta .testlp-form-cta {border-right: 0; border-bottom: 1px solid #dbe7f5; }
}
@media (min-width: 768px) {
  .intro-concerns__cta {max-width: 840px; margin-top: 18px; }
  .intro-concerns__cta .testlp-phone-cta,
.intro-concerns__cta .testlp-form-cta {min-height: 82px; padding: 10px 14px; }
  .intro-concerns__cta .testlp-phone-cta__icon {width: 42px; height: 42px; }
  .intro-concerns__cta .testlp-phone-cta__icon-svg {width: 23px; height: 23px; }
  .intro-concerns__cta .testlp-phone-cta__label {font-size: 0.61rem; }
  .intro-concerns__cta .testlp-phone-cta__number {font-size: 1.55rem; }
  .intro-concerns__cta .testlp-form-cta__main {display: flex; align-items: center; justify-content: center; gap: 10px; }
  .intro-concerns__cta .testlp-form-cta__free {width: 42px; height: 42px; }
  .intro-concerns__cta .testlp-form-cta__free svg {width: 24px; height: 24px; }
  .intro-concerns__cta .testlp-form-cta__body {flex: 0 1 auto; min-width: 0; }
  .intro-concerns__cta .testlp-form-cta__title {font-size: 1.3rem; }
  .intro-concerns__cta .testlp-form-cta__arrow {position: static; flex: 0 0 auto; }
}
@media (max-width: 1023px) {
  .testlp-phone-cta,
.testlp-form-cta {height: auto;
            min-height: 112px;
            border-radius: 16px; }
  .testlp-phone-cta {padding: 16px 18px; }
  .testlp-phone-cta__main {display: grid !important;
            grid-template-columns: 60px minmax(0, 1fr);
            gap: 14px; }
  .testlp-phone-cta__tap {display: none !important; }
  .testlp-phone-cta__icon {width: 60px; height: 60px; }
  .testlp-phone-cta__icon-svg {width: 32px; height: 32px; }
  .testlp-phone-cta__label {margin-bottom: 4px; font-size: 0.82rem; }
  .testlp-phone-cta__number {font-size: clamp(1.55rem, 6.5vw, 2rem); }
  .testlp-phone-cta__hours {margin-top: 10px; padding-top: 9px; }
  .testlp-phone-cta__hours p {font-size: 0.78rem; }
  .testlp-form-cta {padding: 16px 18px; }
  .testlp-form-cta__main {grid-template-columns: 60px minmax(0, 1fr) 40px;
            gap: 10px; }
  .testlp-form-cta__free {width: 60px; height: 60px; }
  .testlp-form-cta__free svg {width: 32px; height: 32px; }
  .testlp-form-cta__title {font-size: clamp(1.4rem, 5.8vw, 1.8rem); }
  .testlp-form-cta__arrow {width: 40px; height: 40px; }
  .testlp-form-cta__arrow-svg {width: 22px; height: 22px; }
  .testlp-form-cta__sub {margin-top: 8px; font-size: 0.72rem; }
  .intro-concerns__cta {grid-template-columns: 1fr;
            max-width: none;
            margin-top: 20px; }
  .intro-concerns__cta .testlp-phone-cta,
.intro-concerns__cta .testlp-form-cta {min-height: 112px; }
  .intro-concerns__cta .testlp-form-cta {border-right: 0;
            border-bottom: 1px solid #dbe7f5; }
  .intro-concerns__cta .testlp-form-cta {padding: 15px 18px; }
  .intro-concerns__cta .testlp-form-cta__main {display: flex; align-items: center; justify-content: center; gap: 12px; }
  .intro-concerns__cta .testlp-form-cta__body {min-width: 0; flex: 0 1 auto; text-align: center; }
  .intro-concerns__cta .testlp-form-cta__title {font-size: clamp(1.05rem, 4.5vw, 1.3rem); }
  .intro-concerns__cta .testlp-form-cta__arrow {position: static; flex: 0 0 auto; }
  .intro-concerns__cta .testlp-form-cta__sub {margin-top: 7px; }
}
@media (max-width: 767px) {
  .intro-concerns__cta {width: calc(100% - 32px);
            max-width: 540px;
            margin-top: 22px; }
  .intro-concerns__cta .testlp-form-cta,
.intro-concerns__cta .testlp-phone-cta {min-height: 132px;
            padding: 16px 12px; }
  .intro-concerns__cta .testlp-form-cta__main {display: grid !important;
            grid-template-columns: 50px minmax(0, 1fr) 36px;
            gap: 6px; }
  .intro-concerns__cta .testlp-form-cta__free {width: 50px;
            height: 50px; }
  .intro-concerns__cta .testlp-form-cta__free svg {width: 27px; height: 27px; }
  .intro-concerns__cta .testlp-form-cta__body {width: 100%; }
  .intro-concerns__cta .testlp-form-cta__title {font-size: clamp(0.82rem, 3.65vw, 1.1rem);
            letter-spacing: -0.035em;
            white-space: nowrap; }
  .intro-concerns__cta .testlp-form-cta__arrow {width: 36px;
            height: 36px; }
  .intro-concerns__cta .testlp-form-cta__arrow-svg {width: 20px; height: 20px; }
  .intro-concerns__cta .testlp-form-cta__sub {margin-top: 10px; font-size: 0.72rem; }
  .intro-concerns__cta .testlp-phone-cta__main {display: grid !important;
            grid-template-columns: 54px minmax(0, 1fr);
            gap: 14px; }
  .intro-concerns__cta .testlp-phone-cta__icon {width: 54px; height: 54px; }
  .intro-concerns__cta .testlp-phone-cta__icon-svg {width: 29px; height: 29px; }
  .intro-concerns__cta .testlp-phone-cta__label {font-size: clamp(0.68rem, 3vw, 0.85rem); }
  .intro-concerns__cta .testlp-phone-cta__number {font-size: clamp(1.38rem, 6.4vw, 2rem); }
}
.intro-sticky-cta {position: fixed;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 60;
          border-top: 1px solid #d8e5f5;
          background: rgba(255, 255, 255, 0.96);
          padding: 12px 0 calc(12px + env(safe-area-inset-bottom));
          box-shadow: 0 -8px 28px rgba(15, 59, 124, 0.12);
          backdrop-filter: blur(12px); }
.intro-sticky-cta__inner {width: min(calc(100% - 64px), 1280px);
          max-width: none;
          margin: 0 auto; }
.intro-sticky-cta__inner .testlp-phone-cta,
.intro-sticky-cta__inner .testlp-form-cta {min-height: 104px; }
.intro-concerns__cta .testlp-form-cta__body {text-align: center; }
.intro-concerns__cta .testlp-form-cta__label {display: block;
          margin: 0 0 3px;
          font-size: clamp(0.72rem, 1vw, 0.9rem);
          letter-spacing: 0.04em; }
.intro-concerns__cta .testlp-form-cta__title {font-size: clamp(1.1rem, 2vw, 1.72rem);
          letter-spacing: -0.025em; }
.intro-concerns__cta .testlp-form-cta__note {margin-top: 4px;
          font-size: clamp(0.66rem, 0.92vw, 0.84rem); }
.intro-concerns__cta:not(.intro-sticky-cta__inner) .testlp-form-cta__title {font-size: clamp(1rem, 1.72vw, 1.5rem); }
@media (min-width: 768px) {
  .intro-sticky-cta__inner {grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .intro-sticky-cta__inner .testlp-phone-cta__icon {width: 64px; height: 64px; }
  .intro-sticky-cta__inner .testlp-phone-cta__icon-svg {width: 33px; height: 33px; }
  .intro-sticky-cta__inner .testlp-phone-cta__label {font-size: clamp(0.82rem, 1.1vw, 1rem); }
  .intro-sticky-cta__inner .testlp-phone-cta__number {font-size: clamp(1.7rem, 3.1vw, 2.65rem); }
  .intro-sticky-cta__inner .testlp-form-cta__label {font-size: clamp(0.72rem, 1vw, 0.9rem); }
  .intro-sticky-cta__inner .testlp-form-cta__title {font-size: clamp(1rem, 1.72vw, 1.5rem); }
  .intro-sticky-cta__inner .testlp-form-cta__note {font-size: clamp(0.66rem, 0.92vw, 0.84rem); }
}
@media (max-width: 767px) {
  .intro-sticky-cta {padding: 5px 0 calc(5px + env(safe-area-inset-bottom)); }
  .intro-sticky-cta__inner {display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            width: calc(100% - 24px);
            margin-top: 0; }
  .intro-sticky-cta__inner .testlp-form-cta,
.intro-sticky-cta__inner .testlp-phone-cta {min-height: 80px;
            padding: 7px 8px; }
  .intro-sticky-cta__inner .testlp-form-cta {border-right: 1px solid #dbe7f5;
            border-bottom: 0; }
  .intro-sticky-cta__inner .testlp-form-cta__main {display: grid;
            grid-template-columns: 28px minmax(0, 1fr) 22px;
            gap: 4px; }
  .intro-sticky-cta__inner .testlp-form-cta__free {width: 28px; height: 28px; }
  .intro-sticky-cta__inner .testlp-form-cta__free svg {width: 16px; height: 16px; }
  .intro-sticky-cta__inner .testlp-form-cta__label {display: block;
            margin-bottom: 1px;
            font-size: clamp(0.42rem, 2.1vw, 0.5rem);
            line-height: 1; }
  .intro-sticky-cta__inner .testlp-form-cta__title {font-size: clamp(0.48rem, 2.8vw, 0.66rem);
            letter-spacing: -0.075em;
            line-height: 1;
            white-space: nowrap; }
  .intro-sticky-cta__inner .testlp-form-cta__note {display: block;
            margin-top: 1px;
            font-size: clamp(0.38rem, 1.9vw, 0.46rem);
            letter-spacing: -0.06em;
            line-height: 1;
            white-space: nowrap; }
  .intro-sticky-cta__inner .testlp-form-cta__arrow {width: 22px; height: 22px; }
  .intro-sticky-cta__inner .testlp-form-cta__arrow-svg {width: 13px; height: 13px; }
  .intro-sticky-cta__inner .testlp-phone-cta__hours {display: none; }
  .intro-sticky-cta__inner .testlp-phone-cta__main {grid-template-columns: 28px minmax(0, 1fr);
            align-items: center;
            gap: 5px; }
  .intro-sticky-cta__inner .testlp-phone-cta__icon {width: 28px; height: 28px; }
  .intro-sticky-cta__inner .testlp-phone-cta__icon-svg {width: 16px; height: 16px; }
  .intro-sticky-cta__inner .testlp-phone-cta__tap {display: none; }
  .intro-sticky-cta__inner .testlp-phone-cta__label {display: block;
            margin-bottom: 2px;
            font-size: clamp(0.48rem, 2.3vw, 0.56rem);
            letter-spacing: -0.06em;
            line-height: 1.12;
            white-space: normal; }
  .intro-sticky-cta__inner .testlp-phone-cta__label span {display: block; }
  .intro-sticky-cta__inner .testlp-phone-cta__body {text-align: center; }
  .intro-sticky-cta__inner .testlp-phone-cta__number {font-size: clamp(0.68rem, 3.3vw, 0.8rem);
            letter-spacing: -0.055em;
            line-height: 1; }
  .intro-concerns__cta .testlp-form-cta__label {display: block; margin-bottom: 2px; font-size: 0.66rem; }
  .intro-concerns__cta:not(.intro-sticky-cta__inner) .testlp-form-cta__label {font-size: 0.76rem; }
  .intro-concerns__cta:not(.intro-sticky-cta__inner) .testlp-form-cta__title {font-size: clamp(1.08rem, 4.7vw, 1.3rem); }
  .intro-concerns__cta:not(.intro-sticky-cta__inner) .testlp-form-cta__note {margin-top: 4px; font-size: 0.68rem; }
}
      `}</style>
    </aside>
  );
}
