import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";

import ReactTooltip from "react-tooltip";

import dbL from "./dbL.js";
import t from "./components/t.js";

import Race from "./pages/race.js";
import Player from "./pages/player.js";
import Support from "./pages/support.js";
import Nurturing2 from "./pages/nurturing2.js";
import Skill from "./pages/skill.js";
import Seed from "./pages/seed.js";

import NurturingMO from "./pages-mo/nurturing.js";
import SeedMo from "./pages-mo/seed.js";

import SupportDetail from "./components/support/SupportDetail";
import PlayerDetail from "./components/player/PlayerDetail";
import SkillDetail from "./components/skill/SkillDetail";
import { BuffList } from "./components/buff.js";
import LanButton from "./components/lan-button";
import useUa from "./utils/ua.js";
const cdnServer = "https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby@master/public/";
const AppPc = () => {
  const ua = useUa();
  const location = useLocation();
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
    { path: "/nur", title: "育成" },
    { path: "/seed", title: "种马" },
  ];
  const phoneList = [
    { path: "/", title: "角色" },
    { path: "/support", title: "支援" },
    { path: "/skill", title: "技能" },
    { path: "/race", title: "比赛" },
    { path: "/mo/nur", title: "育成" },
    { path: "/seed", title: "种马" },
  ];
  const list = ua.isPhone ? phoneList : pcList;
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="h-10 md:h-16 w-full  bg-gray-900 flex items-center flex-shrink-0 ">
        <div className="w-full max-w-sm flex justify-around">
          {list.map((item) => (
            <Link
              to={item.path}
              className={`text-gray-300 ${
                location.pathname === item.path ? "text-blue-500" : "text-gray-300"
              }`}
            >
              {t(item.title)}
            </Link>
          ))}
        </div>
        {/* <LanButton style={{ float: "right" }}></LanButton> */}
      </div>
      <CacheSwitch>
        <CacheRoute
          className="flex-auto w-full max-w-6xl mx-auto flex overflow-auto"
          exact
          path="/"
          component={Player}
        />
        <CacheRoute
          className="flex-auto w-full max-w-6xl mx-auto flex overflow-hidden"
          path="/support"
          component={Support}
        />
        <CacheRoute
          className="flex-auto w-full max-w-6xl mx-auto flex overflow-hidden"
          path="/skill"
          component={Skill}
        />
        <CacheRoute path={["/nur","/Nurturing2"]} component={Nurturing2} />
        <CacheRoute path={["/mo/nur","/NurturingMO"]} component={NurturingMO} />
        <CacheRoute className="flex-auto w-full" path="/seed" component={Seed} />
        <CacheRoute className="flex-auto w-full" path="/SeedMo" component={SeedMo} />
        <CacheRoute className="flex-auto w-full" path="/race" component={Race} />
        <CacheRoute
          className="w-full max-w-lg mx-auto flex flex-col px-3"
          path={["/support-detail/:id", "/support-detail/:id/:nur"]}
          component={SupportDetail}
        />
        <CacheRoute
          className="w-full max-w-lg mx-auto flex flex-col px-3"
          path={["/player-detail/:id", "/player-detail/:id/:nur"]}
          component={PlayerDetail}
        />
        <CacheRoute
          className="w-full max-w-lg mx-auto flex flex-col px-3"
          path="/skill-detail/:id"
          component={SkillDetail}
        />
        <CacheRoute className=" flex overflow-hidden" path="/buff" component={BuffList} />
      </CacheSwitch>
      <div className="h-10 w-full flex items-center">
        <div className="reset-nur" data-for="无法打开育成页面时点一哈" onClick={resetNur}>
          {t("初始化育成")}
        </div>
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
              <img src=${cdnServer + "img/q.jpg"} width={300}></img>
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
          data-tip={`<img src=${cdnServer + "img/weapp.jpg"} width={200}></img>`}
        >
          <img src={cdnServer + "reimu.gif"} preview={false} width={24}></img>
          <div>{t("微信小程序")}</div>
        </div>
      </div>
      <ReactTooltip className="z-max" html={true} />
    </div>
  );
};

export default AppPc;
