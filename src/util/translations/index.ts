import { createIntl, createIntlCache } from 'react-intl';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import enUS from './locales/en';

const cache = createIntlCache();

const translations: any = {
  'en-US': enUS,
};

const locale: string =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  'en-US';

const flattenMessages = (nestedMessages: any, prefix = '') => {
  return Object.keys(nestedMessages).reduce((messages: any, key: any) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      // eslint-disable-next-line no-param-reassign
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
};

const messages = flattenMessages(translations[locale] || translations['en-US']);

const intl = createIntl(
  {
    locale,
    messages,
  },
  cache,
);

intl.formatNumber(20);

const t = (id: string) => {
  return intl.formatMessage({ id });
};

export default t;
