import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import "./styles.css";
import { getTranslation } from "@/i18n";
import { ScrollArea, Scrollbar } from "@radix-ui/react-scroll-area";

export default async function LocaleLayout({
  children,
  modal,
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);
  return (
    <html lang={lang}>
      <body>
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset className="h-screen">
            {/* 顶部导航栏 */}
            <header className="flex h-12 shrink-0 items-center gap-2 px-4 border-b transition-[width,height] ease-linear">
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

            {/* 主体内容区域，确保滚动区域可用 */}
            <ScrollArea className="flex-auto overflow-auto p-4">
              {children}
              <Scrollbar />
            </ScrollArea>
            {modal}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
