import vi from './locales/vi';
import en from './locales/en';
import zh from './locales/zh';
import ko from './locales/ko';

// "Hợp Lực" is company name - never translate

const translations: Record<string, Record<string, string>> = { vi, en, zh, ko };

export function t(locale: string, key: string): string {
  return translations[locale]?.[key] || translations['vi'][key] || key;
}
