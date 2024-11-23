const NO_IMAGE = '/common/no-avatar.png';
const PAGE_SIZE_LIST = 50;

const KEYS = {
  COMMON_SETTINGS: 'COMMON_SETTINGS',
  NEXT_LOCALE: 'NEXT_LOCALE',
};

const locales = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'vi',
    label: 'Vietnamese',
  },
] as const;
const allLocales = locales.map((item) => item.value);
const defaultLocale = locales[0].value;

export { KEYS, NO_IMAGE, PAGE_SIZE_LIST, locales, defaultLocale, allLocales };
export type Locale = (typeof allLocales)[number];
