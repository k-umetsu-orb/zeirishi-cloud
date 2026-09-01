import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const NOTIFY_TO = ["k.umezu@orb-inc.co.jp", "himori@orb-inc.co.jp", "y.suzuki@orb-inc.co.jp", "s.ohori@orb-inc.co.jp"];
const FROM_EMAIL = process.env.RESEND_FROM || "税理士クラウド <no-reply@orb-inc.co.jp>";

type PartnerContactPayload = {
  officeName?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
}

async function sendEmail(to: string | string[], subject: string, text: string, replyTo?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: Array.isArray(to) ? to : [to],
    replyTo,
    subject,
    html: `<pre style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;white-space:pre-wrap;line-height:1.7;">${escapeHtml(text)}</pre>`,
  });
  if (error) throw error;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { officeName, name, email, phone, message } = req.body as PartnerContactPayload;
  if (!officeName?.trim() || !name?.trim() || !email?.trim() || !phone?.trim()) {
    return res.status(400).json({ ok: false, error: "必須項目が未入力です" });
  }

  try {
    const detail = [
      "【お問い合わせ種別】税理士・会計事務所の掲載希望",
      "【流入元ページ】/partner",
      `【事務所名】${officeName.trim()}`,
      `【ご担当者名】${name.trim()}`,
      `【メールアドレス】${email.trim()}`,
      `【電話番号】${phone.trim()}`,
      `【お問い合わせ内容】${message?.trim() || "未入力"}`,
    ].join("\n");

    await sendEmail(NOTIFY_TO, `【税理士クラウド 掲載希望】${officeName.trim()} / ${name.trim()}`, detail, email.trim());
    await sendEmail(email.trim(), "【自動返信】お問い合わせありがとうございます（税理士クラウド）", [
      `${name.trim()} 様`,
      "",
      "このたびは税理士クラウドへの掲載についてお問い合わせいただき、ありがとうございます。",
      "内容を確認のうえ、担当者よりご連絡いたします。",
      "",
      "以下の内容で受け付けました。",
      "",
      `【事務所名】${officeName.trim()}`,
      `【ご担当者名】${name.trim()}`,
      `【メールアドレス】${email.trim()}`,
      `【電話番号】${phone.trim()}`,
      `【お問い合わせ内容】${message?.trim() || "未入力"}`,
      "",
      "※本メールは自動送信です。",
      "",
      "□■━━━━━━━━━━━━━━━━━━━━━━━",
      "税理士クラウド（運営: orb株式会社）",
      "https://zeirishi-cloud.jp/",
      "□■━━━━━━━━━━━━━━━━━━━━━━━",
    ].join("\n"));

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("partner contact mail error:", error);
    return res.status(500).json({ ok: false, error: "メール送信に失敗しました" });
  }
}
