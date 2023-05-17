import { NextRequest, NextResponse } from "next/server";
import { i18n, Locale } from "../config";
const PUBLIC_FILE = /\.(.*)$/;

const { locales, defaultLocale } = i18n;
export async function middleware(req: NextRequest) {
  if (PUBLIC_FILE.test(req.nextUrl.pathname)) {
    return;
  }

  const searchLang = req.nextUrl.searchParams.get("lang") as Locale;
  const cookieLang = req.cookies.get("i18nextLng")?.value as Locale;

  let targetLang = "";

  // 如果都没有语言，就使用浏览器accept-language判断
  if (!searchLang && !cookieLang) {
    const acceptLang = req.headers.get("accept-language");
    if (acceptLang) {
      const acceptLangList = acceptLang.split(",");
      for (let i = 0; i < acceptLangList.length; i++) {
        const lang = acceptLangList[i] as Locale;
        const headerLang = locales.includes(lang) ? lang : "";
        if (headerLang) {
          targetLang = headerLang;
          break;
        }
      }
    }
  } else if (searchLang) {
    if (locales.includes(searchLang)) {
      // 合法的语言
      targetLang = searchLang;
    } else {
      // 不合法的语言, 删除query后重定向
      req.nextUrl.searchParams.delete("lang");
      return NextResponse.redirect(req.nextUrl.toString());
    }
  } else if (cookieLang && !locales.includes(cookieLang)) {
    targetLang = defaultLocale;
  }

  if (targetLang) {
    req.cookies.set("i18nextLng", targetLang);
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("lang", targetLang);
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    response.cookies.set({ name: "i18nextLng", value: targetLang });
    return response;
  }

  return;
}

// {
//   source: '/:lang(de|en|es|fr|id|ja|ko|pt_PT|th|tr|vi|zh-CN|zh-TW)/:path*',
//   permanent: false,
//   destination: '/:path*?lang=:lang',
// },

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
