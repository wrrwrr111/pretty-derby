"server-only";

import { getDictionary } from "./getDictionaries";
import { getLang } from "./getLang";

export const t = (i18nKey: string | undefined) => {
  if (!i18nKey) {
    return "";
  }
  const lang = getLang();
  const dict = getDictionary(lang);
  // @ts-ignore
  return dict[i18nKey] || i18nKey;
};
