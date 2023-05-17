"server-only";

import type { Locale } from "../../config";
import { i18n } from "../../config";
import enJSON from "../../assert/locales/en.json";
import jaJSON from "../../assert/locales/ja.json";
import zhCNJSON from "../../assert/locales/zh-CN.json";

const dictionaries = {
  en: enJSON,
  ja: jaJSON,
  ["zh-CN"]: zhCNJSON,
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] ? dictionaries[locale] : dictionaries[i18n.defaultLocale];
};
