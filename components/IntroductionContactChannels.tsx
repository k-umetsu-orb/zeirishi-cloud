import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { ArrowRight, PhoneCall, X } from "lucide-react";
import lineQrImage from "@/images/line-official-account-qr.png";

const PHONE_NUMBER = "050-1794-7884";
const LINE_CONTACT_URL = "https://lin.ee/SVZWO4v";

export default function IntroductionContactChannels({
  variant = "form",
  onPhoneClick,
  lineContactUrl = LINE_CONTACT_URL,
}: {
  variant?: "form" | "thanks";
  onPhoneClick?: () => void;
  lineContactUrl?: string;
}) {
  const [isLineModalOpen, setIsLineModalOpen] = useState(false);
  const [dynamicQrCode, setDynamicQrCode] = useState<string>();
  const [hasQrCodeError, setHasQrCodeError] = useState(false);
  const lineButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const usesReceptionLink = lineContactUrl !== LINE_CONTACT_URL;

  function closeLineModal() {
    setIsLineModalOpen(false);
    window.requestAnimationFrame(() => lineButtonRef.current?.focus());
  }

  useEffect(() => {
    if (!usesReceptionLink) {
      setDynamicQrCode(undefined);
      setHasQrCodeError(false);
      return;
    }

    let isActive = true;
    setHasQrCodeError(false);
    void import("qrcode")
      .then(({ default: QRCode }) => QRCode.toDataURL(lineContactUrl, {
        width: 528,
        margin: 2,
        errorCorrectionLevel: "M",
        color: { dark: "#06c755", light: "#ffffff" },
      }))
      .then((dataUrl) => {
        if (isActive) setDynamicQrCode(dataUrl);
      })
      .catch(() => {
        if (isActive) setHasQrCodeError(true);
      });

    return () => {
      isActive = false;
    };
  }, [lineContactUrl, usesReceptionLink]);

  useEffect(() => {
    if (!isLineModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLineModal();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLineModalOpen]);

  return (
    <>
      <div className={`intro-contact-channels intro-contact-channels--${variant}`}>
        <div className="intro-contact-channels__buttons">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="intro-contact-channel intro-contact-channel--phone"
            onClick={onPhoneClick}
          >
            <span className="intro-contact-channel__icon"><PhoneCall /></span>
            <span className="intro-contact-channel__copy">
              <strong>電話で相談する</strong>
              <small>{PHONE_NUMBER}</small>
            </span>
          </a>

          <button
            ref={lineButtonRef}
            type="button"
            className="intro-contact-channel intro-contact-channel--line intro-contact-channel--line-pc"
            onClick={() => setIsLineModalOpen(true)}
            aria-haspopup="dialog"
          >
            <span className="intro-contact-channel__line-mark">LINE</span>
            <span className="intro-contact-channel__copy"><strong>LINEで相談する</strong></span>
            <span className="intro-contact-channel__arrow"><ArrowRight /></span>
          </button>

          <a
            href={lineContactUrl}
            className="intro-contact-channel intro-contact-channel--line intro-contact-channel--line-sp"
            aria-label="公式LINEで相談する"
          >
            <span className="intro-contact-channel__line-mark">LINE</span>
            <span className="intro-contact-channel__copy"><strong>LINEで相談する</strong></span>
            <span className="intro-contact-channel__arrow"><ArrowRight /></span>
          </a>
        </div>
      </div>

      {isLineModalOpen && typeof document !== "undefined" && createPortal(
        <div
          className="intro-line-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="intro-line-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLineModal();
          }}
        >
          <div className="intro-line-modal__panel">
            <button
              ref={closeButtonRef}
              type="button"
              className="intro-line-modal__close"
              onClick={closeLineModal}
              aria-label="LINEのQRコードを閉じる"
            >
              <X />
            </button>
            <p className="intro-line-modal__eyebrow">税理士クラウド公式LINE</p>
            <h2 id="intro-line-modal-title">LINEでお問い合わせ</h2>
            <p className="intro-line-modal__description">
              {usesReceptionLink ? (
                <>スマートフォンでQRコードを読み取り、<br />トーク画面に表示された<strong>受付番号を送信してください。</strong></>
              ) : (
                <>スマートフォンでQRコードを読み取り、<br />公式LINEを友だち追加してください。</>
              )}
            </p>
            <div className="intro-line-modal__qr">
              {usesReceptionLink && !dynamicQrCode ? (
                <span className="intro-line-modal__qr-loading">
                  {hasQrCodeError ? "QRコードを生成できませんでした。下のリンクをご利用ください。" : "QRコードを生成しています"}
                </span>
              ) : (
                <Image
                  src={dynamicQrCode || lineQrImage}
                  alt="税理士クラウド公式LINEのQRコード"
                  width={264}
                  height={264}
                  priority
                  unoptimized={Boolean(dynamicQrCode)}
                />
              )}
            </div>
            <a href={lineContactUrl} className="intro-line-modal__link">
              LINEを開く <ArrowRight />
            </a>
            <button type="button" className="intro-line-modal__dismiss" onClick={closeLineModal}>閉じる</button>
          </div>
        </div>,
        document.body,
      )}

      <style jsx global>{`
        .intro-contact-channels {
          margin-top: 16px;
          border-top: 1px solid #dce8f7;
          padding-top: 15px;
        }

        .intro-contact-channels__buttons {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .intro-contact-channels--form .intro-contact-channels__buttons {
          transform: translateY(4px);
        }

        .intro-contact-channel {
          display: flex;
          min-width: 0;
          min-height: 68px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border-radius: 9px;
          padding: 9px 12px;
          text-decoration: none;
          transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
        }

        .intro-contact-channel:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(19, 74, 144, 0.14);
        }

        .intro-contact-channel--phone {
          border: 1.5px solid #2b67aa;
          background: #fff;
          color: #154d8a;
        }

        .intro-contact-channel--line {
          border: 1.5px solid #06c755;
          background: #06c755;
          color: #fff;
        }

        .intro-contact-channel__icon {
          display: grid;
          width: 32px;
          height: 32px;
          flex: 0 0 auto;
          place-items: center;
          border-radius: 999px;
          background: linear-gradient(145deg, #0d7acb 0%, #0750a8 100%);
          color: #fff;
        }

        .intro-contact-channel__icon svg { width: 18px; height: 18px; }

        .intro-contact-channel__line-mark {
          display: grid;
          width: 34px;
          height: 34px;
          flex: 0 0 auto;
          place-items: center;
          border-radius: 999px;
          background: #fff;
          color: #06a847;
          font-size: 0.53rem;
          font-weight: 900;
          letter-spacing: -0.03em;
        }

        .intro-contact-channel__copy {
          display: grid;
          min-width: 0;
          gap: 2px;
          line-height: 1.15;
          text-align: center;
        }

        .intro-contact-channel__copy strong {
          font-size: 0.78rem;
          font-weight: 900;
          white-space: nowrap;
        }

        .intro-contact-channel__copy small {
          font-size: 0.67rem;
          font-weight: 800;
          white-space: nowrap;
        }

        .intro-contact-channel__arrow {
          display: grid;
          width: 26px;
          height: 26px;
          flex: 0 0 auto;
          place-items: center;
          border-radius: 999px;
          background: #fff;
          color: #06a847;
        }

        .intro-contact-channel__arrow svg { width: 15px; height: 15px; }
        .intro-contact-channel--line-pc { display: none; }

        .intro-contact-channels--thanks {
          margin-top: 0;
          border-top: 0;
          padding-top: 0;
        }

        .intro-contact-channels--thanks .intro-contact-channel { min-height: 72px; }

        .intro-line-modal {
          position: fixed;
          inset: 0;
          z-index: 1200;
          display: grid;
          place-items: center;
          background: rgba(6, 19, 43, 0.66);
          padding: 24px;
        }

        .intro-line-modal__panel {
          position: relative;
          width: min(100%, 520px);
          border-radius: 22px;
          background: #fff;
          padding: 34px 36px 28px;
          box-shadow: 0 24px 70px rgba(1, 13, 37, 0.3);
          text-align: center;
        }

        .intro-line-modal__close {
          position: absolute;
          top: 15px;
          right: 15px;
          display: grid;
          width: 38px;
          height: 38px;
          place-items: center;
          border: 0;
          border-radius: 999px;
          background: #edf2f7;
          color: #284158;
        }

        .intro-line-modal__close svg { width: 20px; height: 20px; }

        .intro-line-modal__eyebrow {
          margin: 0 0 6px;
          color: #1559a6;
          font-size: 0.75rem;
          font-weight: 900;
        }

        .intro-line-modal__panel h2 {
          margin: 0;
          color: #0e2d55;
          font-size: 1.55rem;
          font-weight: 900;
        }

        .intro-line-modal__description {
          margin: 12px 0 18px;
          color: #516579;
          font-size: 0.86rem;
          font-weight: 600;
          line-height: 1.7;
        }

        .intro-line-modal__qr {
          display: grid;
          width: fit-content;
          margin: 0 auto;
          place-items: center;
          border-radius: 16px;
          background: #f5f7f8;
          padding: 16px;
        }

        .intro-line-modal__qr img { width: 264px; height: 264px; }

        .intro-line-modal__qr-loading {
          display: grid;
          width: 264px;
          height: 264px;
          place-items: center;
          color: #516579;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .intro-line-modal__link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 18px;
          color: #079943;
          font-size: 0.84rem;
          font-weight: 800;
          text-decoration: none;
        }

        .intro-line-modal__link svg { width: 16px; height: 16px; }

        .intro-line-modal__dismiss {
          display: block;
          min-width: 112px;
          margin: 20px auto 0;
          border: 1px solid #8291a0;
          border-radius: 8px;
          background: #fff;
          padding: 9px 22px;
          color: #263b50;
          font-size: 0.85rem;
          font-weight: 800;
        }

        @media (min-width: 768px) {
          .intro-contact-channel--line-pc { display: flex; }
          .intro-contact-channel--line-sp { display: none; }
        }

        @media (min-width: 768px) {
          .intro-contact-channels--thanks .intro-contact-channel {
            min-height: 88px;
            gap: 12px;
            padding: 14px 18px;
          }

          .intro-contact-channels--thanks :is(.intro-contact-channel__icon, .intro-contact-channel__line-mark) {
            width: 42px;
            height: 42px;
          }

          .intro-contact-channels--thanks .intro-contact-channel__icon svg {
            width: 23px;
            height: 23px;
          }

          .intro-contact-channels--thanks .intro-contact-channel__copy strong { font-size: 0.9rem; }
          .intro-contact-channels--thanks .intro-contact-channel__copy small { font-size: 0.76rem; }
          .intro-contact-channels--thanks .intro-contact-channel__arrow {
            width: 34px;
            height: 34px;
          }
        }

        @media (max-width: 479px) {
          .intro-contact-channel {
            min-height: 64px;
            gap: 4px;
            padding: 7px 5px;
          }

          .intro-contact-channel__icon,
          .intro-contact-channel__line-mark { width: 27px; height: 27px; }
          .intro-contact-channel__copy strong { font-size: 0.62rem; }
          .intro-contact-channel__copy small { font-size: 0.54rem; }
          .intro-contact-channel__arrow { width: 22px; height: 22px; }
        }
      `}</style>
    </>
  );
}
