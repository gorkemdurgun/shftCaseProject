import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import tr from './tr.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: en,
    },
    tr: {
      translation: tr,
    },
  },
  fallbackLng: 'en',
  lng: 'tr',
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
