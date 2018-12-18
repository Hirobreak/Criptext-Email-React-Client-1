import LocalizedStrings from 'react-localization';
import { mySettings, updateAppSettings } from '../utils/electronInterface';
import en from './en.json';
import es from './es.json';

const string = new LocalizedStrings({
  en,
  es
});

export const currentLanguage = mySettings.language;
string.setLanguage(currentLanguage || 'en');

export const languages = [
  { text: 'English', value: 'en' },
  { text: 'Español', value: 'es' }
];

export const setLang = async lang => {
  string.setLanguage(lang);
  await updateAppSettings({ language: lang });
};

export default string;
