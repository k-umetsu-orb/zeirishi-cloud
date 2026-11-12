export const CONTACTABLE_TIME_OPTIONS = [
  "平日9〜12時",
  "平日12〜15時",
  "平日15〜18時",
  "平日18時以降",
  "平日19〜21時",
  "土日祝希望",
] as const;

export const PREFERRED_CONTACT_METHOD_OPTIONS = ["電話", "SMS", "メール"] as const;

export function normalizeContactableTimes(value: unknown) {
  if (!Array.isArray(value)) return [];

  return CONTACTABLE_TIME_OPTIONS.filter((option) => value.includes(option));
}

export function normalizePreferredContactMethod(value: unknown) {
  return PREFERRED_CONTACT_METHOD_OPTIONS.find((option) => option === value) ?? "電話";
}
