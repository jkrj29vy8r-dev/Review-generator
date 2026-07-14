export const locales = [
  "ro", "en", "fr", "de", "es", "it", "pt", "nl",
  "pl", "hu", "tr", "ru", "uk", "cs", "sk", "bg",
  "hr", "el", "sv", "no", "da", "fi", "ar", "he",
  "zh", "ja", "ko", "hi", "th", "vi", "id",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ro";

export const localeNames: Record<Locale, { native: string; en: string; flag: string }> = {
  ro: { native: "Română", en: "Romanian", flag: "🇷🇴" },
  en: { native: "English", en: "English", flag: "🇬🇧" },
  fr: { native: "Français", en: "French", flag: "🇫🇷" },
  de: { native: "Deutsch", en: "German", flag: "🇩🇪" },
  es: { native: "Español", en: "Spanish", flag: "🇪🇸" },
  it: { native: "Italiano", en: "Italian", flag: "🇮🇹" },
  pt: { native: "Português", en: "Portuguese", flag: "🇵🇹" },
  nl: { native: "Nederlands", en: "Dutch", flag: "🇳🇱" },
  pl: { native: "Polski", en: "Polish", flag: "🇵🇱" },
  hu: { native: "Magyar", en: "Hungarian", flag: "🇭🇺" },
  tr: { native: "Türkçe", en: "Turkish", flag: "🇹🇷" },
  ru: { native: "Русский", en: "Russian", flag: "🇷🇺" },
  uk: { native: "Українська", en: "Ukrainian", flag: "🇺🇦" },
  cs: { native: "Čeština", en: "Czech", flag: "🇨🇿" },
  sk: { native: "Slovenčina", en: "Slovak", flag: "🇸🇰" },
  bg: { native: "Български", en: "Bulgarian", flag: "🇧🇬" },
  hr: { native: "Hrvatski", en: "Croatian", flag: "🇭🇷" },
  el: { native: "Ελληνικά", en: "Greek", flag: "🇬🇷" },
  sv: { native: "Svenska", en: "Swedish", flag: "🇸🇪" },
  no: { native: "Norsk", en: "Norwegian", flag: "🇳🇴" },
  da: { native: "Dansk", en: "Danish", flag: "🇩🇰" },
  fi: { native: "Suomi", en: "Finnish", flag: "🇫🇮" },
  ar: { native: "العربية", en: "Arabic", flag: "🇸🇦" },
  he: { native: "עברית", en: "Hebrew", flag: "🇮🇱" },
  zh: { native: "中文", en: "Chinese", flag: "🇨🇳" },
  ja: { native: "日本語", en: "Japanese", flag: "🇯🇵" },
  ko: { native: "한국어", en: "Korean", flag: "🇰🇷" },
  hi: { native: "हिन्दी", en: "Hindi", flag: "🇮🇳" },
  th: { native: "ภาษาไทย", en: "Thai", flag: "🇹🇭" },
  vi: { native: "Tiếng Việt", en: "Vietnamese", flag: "🇻🇳" },
  id: { native: "Bahasa Indonesia", en: "Indonesian", flag: "🇮🇩" },
};
