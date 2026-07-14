export interface Language {
  code: string;
  name: string;        // native name
  nameEn: string;     // English name
  flag: string;       // emoji flag
  rtl?: boolean;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "ro", name: "Română", nameEn: "Romanian", flag: "🇷🇴" },
  { code: "en", name: "English", nameEn: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", nameEn: "French", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", nameEn: "German", flag: "🇩🇪" },
  { code: "es", name: "Español", nameEn: "Spanish", flag: "🇪🇸" },
  { code: "it", name: "Italiano", nameEn: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Português", nameEn: "Portuguese", flag: "🇵🇹" },
  { code: "nl", name: "Nederlands", nameEn: "Dutch", flag: "🇳🇱" },
  { code: "pl", name: "Polski", nameEn: "Polish", flag: "🇵🇱" },
  { code: "hu", name: "Magyar", nameEn: "Hungarian", flag: "🇭🇺" },
  { code: "tr", name: "Türkçe", nameEn: "Turkish", flag: "🇹🇷" },
  { code: "ar", name: "العربية", nameEn: "Arabic", flag: "🇸🇦", rtl: true },
  { code: "ru", name: "Русский", nameEn: "Russian", flag: "🇷🇺" },
  { code: "uk", name: "Українська", nameEn: "Ukrainian", flag: "🇺🇦" },
  { code: "zh", name: "中文", nameEn: "Chinese", flag: "🇨🇳" },
  { code: "ja", name: "日本語", nameEn: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "한국어", nameEn: "Korean", flag: "🇰🇷" },
  { code: "sv", name: "Svenska", nameEn: "Swedish", flag: "🇸🇪" },
  { code: "no", name: "Norsk", nameEn: "Norwegian", flag: "🇳🇴" },
  { code: "da", name: "Dansk", nameEn: "Danish", flag: "🇩🇰" },
  { code: "fi", name: "Suomi", nameEn: "Finnish", flag: "🇫🇮" },
  { code: "cs", name: "Čeština", nameEn: "Czech", flag: "🇨🇿" },
  { code: "sk", name: "Slovenčina", nameEn: "Slovak", flag: "🇸🇰" },
  { code: "bg", name: "Български", nameEn: "Bulgarian", flag: "🇧🇬" },
  { code: "hr", name: "Hrvatski", nameEn: "Croatian", flag: "🇭🇷" },
  { code: "sr", name: "Српски", nameEn: "Serbian", flag: "🇷🇸" },
  { code: "el", name: "Ελληνικά", nameEn: "Greek", flag: "🇬🇷" },
  { code: "he", name: "עברית", nameEn: "Hebrew", flag: "🇮🇱", rtl: true },
  { code: "fa", name: "فارسی", nameEn: "Persian", flag: "🇮🇷", rtl: true },
  { code: "hi", name: "हिन्दी", nameEn: "Hindi", flag: "🇮🇳" },
  { code: "th", name: "ภาษาไทย", nameEn: "Thai", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", nameEn: "Vietnamese", flag: "🇻🇳" },
  { code: "id", name: "Bahasa Indonesia", nameEn: "Indonesian", flag: "🇮🇩" },
  { code: "ms", name: "Bahasa Melayu", nameEn: "Malay", flag: "🇲🇾" },
  { code: "ca", name: "Català", nameEn: "Catalan", flag: "🏳️" },
  { code: "et", name: "Eesti", nameEn: "Estonian", flag: "🇪🇪" },
  { code: "lv", name: "Latviešu", nameEn: "Latvian", flag: "🇱🇻" },
  { code: "lt", name: "Lietuvių", nameEn: "Lithuanian", flag: "🇱🇹" },
  { code: "sl", name: "Slovenščina", nameEn: "Slovenian", flag: "🇸🇮" },
  { code: "mk", name: "Македонски", nameEn: "Macedonian", flag: "🇲🇰" },
];

export const LANGUAGE_MAP: Record<string, Language> = Object.fromEntries(
  SUPPORTED_LANGUAGES.map((l) => [l.code, l])
);

/** Returns language name string for AI prompt injection */
export function getLanguageInstruction(
  mode: "auto" | string
): string {
  if (mode === "auto") {
    return "AUTO_DETECT — Detect the review language automatically and reply in the exact same language.";
  }
  const lang = LANGUAGE_MAP[mode];
  if (lang) {
    return `FORCED — Always reply in ${lang.nameEn} (${lang.name}), regardless of the review language.`;
  }
  return "AUTO_DETECT — Detect the review language automatically and reply in the exact same language.";
}
