import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import "./styles.css"
import { getTranslation } from "@/i18n"


export default async function LocaleLayout({children, modal,params}: { children: React.ReactNode; modal: React.ReactNode,params: { lang: string}, }) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);
  return (
    <html lang={lang}>
      <body>
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset>
            {/* 顶部导航栏 */}
            <header className="flex h-16 shrink-0 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">{t("首页")}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{t("当前页面")}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>

            {/* 主体内容区域 */}
            <div className="flex flex-1 flex-col gap-4 p-4">
              {children}
              {modal}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
