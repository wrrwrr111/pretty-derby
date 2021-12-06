import { Link, useLocation } from "react-router-dom";
import useUa from "../../utils/ua.js";
import LanButton from "../lan-button";
import { cdnServer } from "../../config";
import dbL from "../../dbL.js";
import t from "../t.js";
const Layout = ({ children, contentClass }) => {
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
    <div className="w-screen h-screen flex flex-col relative">
      <div className="h-10 md:h-16 w-full  bg-gray-900 flex items-center fixed bottom-0 left-0 right-0 md:flex-shrink-0 md:sticky md:top-0 z-10">
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
      </div>
      <div className={`${contentClass}`}>{children}</div>
      <div className="h-10 w-full flex items-center">
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
    </div>
  );
};
export default Layout;
