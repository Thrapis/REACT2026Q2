import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { isValidLocale } from '@/i18n/locales';
import { NEXT_LOCALE_COOKIE_KEY } from '@/constants/Cookies';

export default async function GlobalNotFound() {
  const cookieStore = await cookies();
  const lastUsedLocale = cookieStore.get(NEXT_LOCALE_COOKIE_KEY)?.value;

  const targetLocale =
    lastUsedLocale && isValidLocale(lastUsedLocale) ? lastUsedLocale : 'en';

  redirect(`/${targetLocale}/404`);
}
