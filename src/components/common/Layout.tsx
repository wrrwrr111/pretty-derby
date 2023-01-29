import React, { useState } from "react";
import { useRouter } from "next/router";

import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";

import { useTranslation } from "react-i18next";

import useUa from "../../hooks/useUa";
import LanButton from "../LanButton";
import { CDN_SERVER, MENU_LIST } from "../../config";
import Link from "next/link";
const Layout = ({ children, contentClass = "", rootClass = "" }) => {
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

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
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
  );
  return (
    <div className={"relative flex min-h-screen w-screen flex-col"}>
      <Navbar className="sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <div className="hidden lg:block">{navList}</div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </IconButton>
        </div>
        <MobileNav open={openNav}>
          <div className="container mx-auto">{navList}</div>
        </MobileNav>
      </Navbar>
      {children}
      <div className="flex w-full flex-wrap items-center pb-10 md:pb-0">
        <div className="cursor-pointer" data-tip="无法打开育成页面时点一哈" onClick={resetNur}>
          {t("初始化育成")}
        </div>
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
          <img
            border="0"
            src="//pub.idqqimg.com/wpa/images/group.png"
            alt="轻 松 赛 马"
            title="轻 松 赛 马"
          />
        </a>
        <div
          className="mx-2 flex items-center"
          data-tip={`<img src=${CDN_SERVER + "img/weapp.jpg"} width={200} />`}
        >
          <img alt="reimu" src={CDN_SERVER + "reimu.gif"} preview="false" width={24} />
          <div>{t("微信小程序")}</div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
