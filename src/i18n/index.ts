import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions, fallbackLng, defaultNS } from "./settings";

// 缓存已初始化的实例，避免重复初始化，提高性能
const i18nInstances = new Map<string, Promise<ReturnType<typeof createInstance>>>();

async function initI18next(lng: string, ns: string | string[] = defaultNS) {
  const cacheKey = `${lng}:${Array.isArray(ns) ? ns.join(",") : ns}`;
  if (!i18nInstances.has(cacheKey)) {
    const i18nInstance = createInstance();
    const instancePromise = i18nInstance
      .use(initReactI18next)
      .use(
        resourcesToBackend(async (language, namespace) => {
          try {
            return await import(`../assert/locales/${language}/${namespace}.json`);
          } catch (error) {
            console.error(`❌ [i18n] Failed to load translation: ${language}/${namespace}`);
            return {}; // 防止崩溃，返回空对象
          }
        })
      )
      .init(getOptions(lng, ns))
      .then(() => i18nInstance);

    i18nInstances.set(cacheKey, instancePromise);
  }

  return i18nInstances.get(cacheKey)!;
}

export async function getTranslation(
  lng: string = fallbackLng,
  ns: string | string[] = defaultNS,
  options: { keyPrefix?: string } = {}
) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}
