/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import viLocaleData from 'react-intl/locale-data/vi';
import koLocaleData from 'react-intl/locale-data/ko';

import enTranslationMessages from './translations/en.json';
import viTranslationMessages from './translations/vi.json';
import koTranslationMessages from './translations/ko.json';

addLocaleData(enLocaleData);
addLocaleData(viLocaleData);
addLocaleData(koLocaleData);

export const DEFAULT_LOCALE = 'vi';

// prettier-ignore
export const appLocales = [
  'en',
  'vi',
  'ko',
];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  vi: formatTranslationMessages('vi', viTranslationMessages),
  ko: formatTranslationMessages('ko', koTranslationMessages),
};

