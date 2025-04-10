import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from '@/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|img|assets|favicon.ico|sw.js|site.webmanifest).*)'],
}

export function middleware(req) {
  let lng

  // 1. 从 Cookie 获取语言
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName).value)
  }

  // 2. 从请求头获取语言
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  }

  // 3. 语言回退
  if (!lng) lng = fallbackLng

  const { pathname } = req.nextUrl
  const pathSegments = pathname.split('/').filter(Boolean) // 过滤空路径片段

  let shouldRedirect = false
  let newPathSegments = [...pathSegments] // 复制路径

  // 4. 确保第一个参数是 `lang`
  if (!languages.includes(newPathSegments[0])) {
    newPathSegments.unshift(lng) // 在路径前添加默认语言
    shouldRedirect = true
  } else {
    lng = newPathSegments[0] // 获取 URL 里的语言
  }
console.log(lng)


  // 6. 需要修正路径？进行重定向
  if (shouldRedirect) {
    return NextResponse.redirect(new URL(`/${newPathSegments.join('/')}`, req.url))
  }

  // 7. 处理 Referer 语言同步
  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'))
    const lngInReferer = languages.find(l => refererUrl.pathname.startsWith(`/${l}`))

    if (lngInReferer) {
      const response = NextResponse.next()
      response.cookies.set(cookieName, lngInReferer)
      return response
    }
  }

  return NextResponse.next()
}
