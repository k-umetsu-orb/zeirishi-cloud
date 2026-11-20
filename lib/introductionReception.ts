export const INTRODUCTION_RECEPTION_STORAGE_KEY = "zeirishi-cloud-reception-code";

const LINE_OFFICIAL_ACCOUNT_ID = "@700ltdiz";
const RECEPTION_CODE_PATTERN = /^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{8}$/;

export function isValidIntroductionReceptionCode(value: string | null | undefined) {
  return Boolean(value && RECEPTION_CODE_PATTERN.test(value));
}

export function buildIntroductionReceptionLineUrl(receptionCode: string) {
  const encodedLineId = encodeURIComponent(LINE_OFFICIAL_ACCOUNT_ID);
  const encodedMessage = encodeURIComponent(
    `※最初に以下の受付番号を送信してください。\n※内容は編集せずこのまま送信ボタンを押してください。\n受付番号：${receptionCode}`,
  );
  return `https://line.me/R/oaMessage/${encodedLineId}/?${encodedMessage}`;
}
