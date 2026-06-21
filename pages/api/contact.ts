import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const NOTIFY_TO = "k.umezu@orb-inc.co.jp";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM || "税理士クラウド <no-reply@orb-inc.co.jp>";

type ContactPayload = {
  sourcePage?: string;
  clientType?: string;
  consultType?: string;
  prefectureName?: string;
  cityName?: string;
  name?: string;
  email?: string;
  phone?: string;
};

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendEmail({
  to,
  subject,
  text,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: Array.isArray(to) ? to : [to],
    replyTo,
    subject,
    html: `<pre style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; white-space: pre-wrap; line-height: 1.7;">${escapeHtml(
      text,
    )}</pre>`,
  });

  if (error) {
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const {
    sourcePage,
    clientType,
    consultType,
    prefectureName,
    cityName,
    name,
    email,
    phone,
  } = req.body as ContactPayload;

  if (!consultType || !prefectureName || !name?.trim() || !email?.trim()) {
    res.status(400).json({ ok: false, error: "必須項目が未入力です" });
    return;
  }

  const area = cityName ? `${prefectureName} ${cityName}` : prefectureName;

  try {
    // 1通目: 社内通知
    await sendEmail({
      to: NOTIFY_TO,
      replyTo: email,
      subject: `【税理士クラウド お問い合わせ】${consultType} - ${name}`,
      text: [
        `【流入元ページ】${sourcePage || "不明"}`,
        `【ご相談者の区分】${clientType || "未入力"}`,
        `【ご相談の内容】${consultType}`,
        `【お探しのエリア】${area}`,
        `【お名前】${name}`,
        `【メールアドレス】${email}`,
        `【電話番号】${phone || "未入力"}`,
      ].join("\n"),
    });

    // 2通目: お客様への自動返信
    await sendEmail({
      to: email,
      subject: "【自動返信】お問い合わせありがとうございます（税理士クラウド）",
      text: [
        `${name} 様`,
        "",
        "このたびは税理士クラウドにお問い合わせいただきありがとうございます。",
        "以下の内容で受け付けいたしました。",
        "",
        `【ご相談者の区分】${clientType || "未入力"}`,
        `【ご相談の内容】${consultType}`,
        `【お探しのエリア】${area}`,
        `【お名前】${name}`,
        `【メールアドレス】${email}`,
        `【電話番号】${phone || "未入力"}`,
        "",
        "内容を確認のうえ、担当のコーディネーターより1〜3営業日以内にご連絡いたします。",
        "今しばらくお待ちください。",
        "",
        "※本メールは自動送信です。",
        "",
        "□■━━━━━━━━━━━━━━━━━━━━━━━",
        "税理士クラウド（運営: 株式会社orb）",
        "https://zeirishi-cloud.jp/",
        "□■━━━━━━━━━━━━━━━━━━━━━━━",
      ].join("\n"),
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact mail error:", err);
    res.status(500).json({ ok: false, error: "メール送信に失敗しました" });
  }
}
