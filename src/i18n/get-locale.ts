'use server';

import { cookies } from 'next/headers';
import { defaultLocale, Locale, KEYS } from '@/common/constants';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = KEYS.NEXT_LOCALE;

export async function getAgentLocale() {
  return cookies().get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setAgentLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}
