export const INTRODUCTION_FORM_FLOW = "introduction-questionnaire";

const SITE_ORIGIN = "https://zeirishi-cloud.jp";
const INTRODUCTION_SOURCE_PATH = /^\/introduction(?:-[a-z0-9]+)*$/;

export function normalizeIntroductionSourcePath(
  value: string | string[] | undefined,
  fallback: string,
) {
  const sourcePath = Array.isArray(value) ? value[0] : value;
  return sourcePath && INTRODUCTION_SOURCE_PATH.test(sourcePath) ? sourcePath : fallback;
}

export function formatContactSourceUrl(sourcePage: string | undefined) {
  if (!sourcePage) return "不明";

  try {
    const url = new URL(sourcePage, SITE_ORIGIN);
    if (url.origin !== SITE_ORIGIN) return "不明";
    return `${SITE_ORIGIN}${url.pathname}`;
  } catch {
    return "不明";
  }
}
