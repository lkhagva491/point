import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en.json';
import koTranslation from './locales/ko.json';
import mnTranslation from './locales/mn.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  ko: {
    translation: koTranslation,
  },
  mn: {
    translation: mnTranslation,
  },
};

// Always initialize i18n with basic configuration
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: false,
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

// Conditionally add LanguageDetector on the client side
if (typeof window !== 'undefined') {
  i18n.use(LanguageDetector).init({
    detection: {
      order: ['cookie', 'localStorage', 'navigator'], // Prioritize cookie for language detection
      caches: ['cookie'],
    },
  });
}

export default i18n;