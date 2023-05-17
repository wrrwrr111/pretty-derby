"server-only";

import { headers, cookies } from "next/headers";
import { Locale, i18n } from "../../config";

export function getLang() {
  const headersList = headers();
  const cookieStore = cookies();
  const lang = (headersList.get("lang") ||
    cookieStore.get("i18nextLng")?.value ||
    i18n.defaultLocale) as Locale;
  return lang;
}
