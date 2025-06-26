import React, { ReactElement, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

import useUa from "@/utils/ua";
import LanButton from "@/components/lan-button";
import { CDN_SERVER } from "@/config";
import dbL from "@/dbL";
import { PC_MENU_LIST, MOBILE_MENU_LIST } from "@/config";
import { Toaster } from "sonner";

const Layout = ({ children }: { children: ReactElement }) => {
  const { t } = useTranslation();
  const [openNavbar, setOpenNavbar] = useState(false);
  const ua = useUa();
  const location = useLocation();
  const navigate = useNavigate();

  const resetNur = () => {
    dbL
      .set("selected", {
        supports: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
        player: {},
        races: [],
      })
      .write();
  };

  const list = ua.isPhone ? MOBILE_MENU_LIST : PC_MENU_LIST;

  return (
    <div className="flex flex-col w-screen min-h-screen relative">
      <header className="sticky top-0 z-50 bg-blue-500 text-white">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="text-xl font-bold hover:text-black">赛马娘</div>

          {ua.isPhone ? (
            <Sheet open={openNavbar} onOpenChange={setOpenNavbar}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-2 mt-8">
                  {list.map((item) => (
                    <Button
                      key={item.path}
                      variant={location.pathname === item.path ? "default" : "ghost"}
                      onClick={() => {
                        setOpenNavbar(false);
                        navigate(item.path);
                      }}
                      className="justify-start"
                    >
                      {t(item.title)}
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          ) : (
            <NavigationMenu>
              <NavigationMenuList>
                {list.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <NavigationMenuLink
                      href={item.path}
                      active={location.pathname === item.path}
                      className={navigationMenuTriggerStyle()}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.path);
                      }}
                    >
                      {t(item.title)}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
      </header>
      <div className="flex-auto">{children}</div>
      <Toaster position="top-right" richColors closeButton />
      <footer className="w-full flex items-center flex-wrap pb-10 md:pb-0 px-4 gap-4">
        <Button variant="link" onClick={resetNur} title="无法打开育成页面时点一哈">
          {t("初始化育成")}
        </Button>

        <LanButton />

        <div className="flex-auto"></div>

        <iframe
          title="GitHub"
          src="https://ghbtns.com/github-btn.html?user=wrrwrr111&repo=pretty-derby&type=star&count=true&size=large&v=2"
          frameBorder="0"
          scrolling="0"
          width="160px"
          height="30px"
        ></iframe>

        <a
          target="_blank"
          rel="noreferrer"
          href="https://qm.qq.com/cgi-bin/qm/qr?k=f2Q2MIqkkxiiYq-sfRYmI7E4v17-r3V2&jump_from=webapi"
          data-tip={`
            <img src=${CDN_SERVER + "img/q.jpg"} width={300} />
            <p>${t("闲聊为主")}</p>
          `}
        >
          <img src="//pub.idqqimg.com/wpa/images/group.png" alt="轻 松 赛 马" title="轻 松 赛 马" />
        </a>

        <div
          className="flex mx-2 items-center"
          data-tip={`<img src=${CDN_SERVER + "img/weapp.jpg"} width={200} />`}
        >
          <img alt="reimu" src={CDN_SERVER + "reimu.gif"} width={24} />
          <div>{t("微信小程序")}</div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
