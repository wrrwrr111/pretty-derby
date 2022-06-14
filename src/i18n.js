import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    react: {
      // 是否需要在最外层加入Suspense标签
      useSuspense: false,
    },
    lng: "zh_CN",
    fallbackLng: "zh_CN",
    load: "currentOnly",
    backend: {
      loadPath: `https://fastly.jsdelivr.net/gh/wrrwrr111/pretty-derby@master/src/assert/locales/{{lng}}.json`,
      crossDomain: true,
    },
  });

// https://fastly.jsdelivr.net/gh/wrrwrr111/pretty-derby@master/src/assert/locales/zh_CN.json
export default i18n;
