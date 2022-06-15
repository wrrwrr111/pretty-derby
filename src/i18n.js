import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import zhCN from "/src/assert/locales/zh-CN.json";
import en from "/src/assert/locales/en.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      "zh-CN": {
        translation: zhCN,
      },
      en: {
        translation: en,
      },
    },
    react: {
      // 是否需要在最外层加入Suspense标签
      useSuspense: false,
    },
    lng: "zh-CN",
    fallbackLng: "zh-CN",
    load: "currentOnly",
  });

// https://fastly.jsdelivr.net/gh/wrrwrr111/pretty-derby@master/src/assert/locales/zh_CN.json
export default i18n;
