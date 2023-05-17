export const i18n = {
  defaultLocale: "zh-CN",
  locales: ["zh-CN", "en", "ja"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const CDN_SERVER = "https://fastly.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/";
