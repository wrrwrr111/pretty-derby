export const fallbackLng = 'zh-CN'
export const languages = [fallbackLng, 'en','ja']

export const defaultNS = 'common'
export const cookieName = 'i18next'

export function getOptions (lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}
