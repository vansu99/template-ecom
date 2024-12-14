import { getRequestConfig } from 'next-intl/server';
import { getAgentLocale } from './get-locale';

export default getRequestConfig(async () => {
  const locale = await getAgentLocale();
  return {
    locale,
    // eslint-disable-next-line unicorn/no-await-expression-member
    messages: (await import(`../common/locales/${locale}.json`)).default,
  };
});
