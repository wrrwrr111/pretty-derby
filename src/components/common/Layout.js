import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavLink from "@material-tailwind/react/NavLink";

import useUa from "@/utils/ua.js";
import LanButton from "@/components/lan-button.js";
import { cdnServer } from "@/config";
import dbL from "@/dbL.js";
import { useTranslation } from "react-i18next";

const Layout = ({ children, contentClass, rootClass }) => {
  const { t } = useTranslation();
  const [openNavbar, setOpenNavbar] = useState(false);
  const ua = useUa();
  const location = useLocation();
  const history = useHistory();
  const resetNur = () => {
    dbL
      .set("selected", {
        supports: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
        player: {},
        races: [],
      })
      .write();
  };
  const pcList = [
    { path: "/", title: "角色" },
    { path: "/support", title: "支援" },
    { path: "/skill", title: "技能" },
    { path: "/race", title: "比赛" },
    { path: "/nurturing", title: "育成" },
    { path: "/seed", title: "种马" },
  ];
  const phoneList = [
    { path: "/", title: "角色" },
    { path: "/support", title: "支援" },
    { path: "/skill", title: "技能" },
    { path: "/race", title: "比赛" },
    { path: "/nurturingMo", title: "育成" },
    { path: "/seedMo", title: "种马" },
  ];
  const list = ua.isPhone ? phoneList : pcList;
  return (
    <div className={"flex flex-col w-screen min-h-screen relative"}>
      <Navbar className="sticky top-0 z-50" color="lightBlue" navbar>
        <NavbarContainer>
          <NavbarWrapper>
            <NavbarBrand>赛马娘</NavbarBrand>
            <NavbarToggler
              color="white"
              onClick={() => setOpenNavbar(!openNavbar)}
              ripple="light"
            />
          </NavbarWrapper>

          <NavbarCollapse open={openNavbar}>
            <Nav leftSide>
              {list.map((item) => (
                // <Link to={item.path} onClick={() => setOpenNavbar(!openNavbar)}>
                <NavLink
                  key={item.path}
                  // href={item.path}
                  onClick={() => {
                    setOpenNavbar(!openNavbar);
                    history.push(item.path);
                  }}
                  active={location.pathname === item.path ? "light" : "normal"}
                  ripple="light"
                >
                  {t(item.title)}
                </NavLink>
                // </Link>
              ))}
            </Nav>
          </NavbarCollapse>
        </NavbarContainer>
      </Navbar>
      {children}
      <div className="w-full flex items-center flex-wrap pb-10 md:pb-0">
        <div className="cursor-pointer" data-tip="无法打开育成页面时点一哈" onClick={resetNur}>
          {t("初始化育成")}
        </div>
        <LanButton></LanButton>
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
          <img src=${cdnServer + "img/q.jpg"} width={300} />
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
          className="flex mx-2 items-center"
          data-tip={`<img src=${cdnServer + "img/weapp.jpg"} width={200} />`}
        >
          <img alt="reimu" src={cdnServer + "reimu.gif"} preview={false} width={24} />
          <div>{t("微信小程序")}</div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
