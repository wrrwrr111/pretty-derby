import React, { ElementType, Fragment, ReactNode, useState } from "react";
import { useRouter } from "next/router";

import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";

import { useTranslation } from "react-i18next";

import useUa from "../../hooks/useUa";
import LanButton from "../LanButton";
import { CDN_SERVER, MENU_LIST } from "../../config";
import Link from "next/link";
import { TooltipWrapper } from "react-tooltip";

const Layout: React.FC<{
  children: ReactNode;
  contentClass?: string | undefined;
  rootClass?: string | undefined;
}> = ({ children, contentClass = "", rootClass = "" }) => {
  const { t } = useTranslation();
  const [openNav, setOpenNav] = useState(false);
  const ua = useUa();
  const router = useRouter();
  const resetNur = () => {
    // dbL
    //   .set("selected", {
    //     supports: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
    //     player: {},
    //     races: [],
    //   })
    //   .write();
  };

  return (
    <Fragment>
      <div className="relative flex min-h-screen w-screen flex-col">
        <Navbar className="sticky top-0 z-50">
          <ul className="flex  gap-2  overflow-x-auto text-blue-gray-900 lg:items-center lg:gap-6">
            {MENU_LIST.map((item) => (
              <Link
                href={item.path}
                key={item.path}
                // href={item.path}
                onClick={() => setOpenNav(false)}
                className={`${item.mobile && "lg:hidden"} ${item.pc && "hidden lg:block"}`}
                // active={router.pathname === item.path ? "light" : "normal"}
              >
                <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
                  {t(item.title)}
                </Typography>
              </Link>
            ))}
          </ul>
        </Navbar>
        {children}
      </div>

      <footer className="mt- flex border-t border-solid border-gray-500 bg-white px-6 pt-9 pb-12">
        <TooltipWrapper content="无法打开育成页面时点一哈">
          <div className="cursor-pointer" onClick={resetNur}>
            {t("初始化育成")}
          </div>
        </TooltipWrapper>
        <LanButton />
        <div className="flex-auto"></div>
        <iframe
          title="GitHub"
          src="https://ghbtns.com/github-btn.html?user=wrrwrr111&repo=pretty-derby&type=star&count=true&size=large&v=2"
          width="160px"
          height="30px"
        ></iframe>
        <TooltipWrapper
          html={`<div>
          <img src=${CDN_SERVER + "img/q.jpg"} width={300} />
          <p>${t("闲聊为主")}</p>
          </div>
          `}
        >
          <a
            target="_blank"
            rel="noreferrer"
            href="https://qm.qq.com/cgi-bin/qm/qr?k=f2Q2MIqkkxiiYq-sfRYmI7E4v17-r3V2&jump_from=webapi"
          >
            <img
              border="0"
              src="//pub.idqqimg.com/wpa/images/group.png"
              alt="轻 松 赛 马"
              title="轻 松 赛 马"
            />
          </a>
        </TooltipWrapper>
        <TooltipWrapper
          html={`
          <div>
          <img src=${CDN_SERVER + "img/weapp.jpg"} width={200} />
          </div>
        `}
        >
          <div className="mx-2 flex items-center">
            <img alt="reimu" src={CDN_SERVER + "reimu.gif"} preview="false" width={24} />
            <div>{t("微信小程序")}</div>
          </div>
        </TooltipWrapper>
      </footer>
    </Fragment>
  );
};
export default Layout;
