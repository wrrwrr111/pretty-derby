import { useState, useMemo } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  Archive,
  Menu,
  MultiplePages,
  ProfileCircle,
  SelectFace3d,
  Xmark,
  MediaImage,
} from "iconoir-react";

import useUa from "@cra/utils/ua";
import LanButton from "@cra/components/lan-button";
import { CDN_SERVER } from "@cra/config";
import dbL from "@cra/dbL";
import { useTranslation } from "react-i18next";
import { PC_MENU_LIST, MOBILE_MENU_LIST } from "@cra/config";

const NavMenu = () => {
  const { t } = useTranslation();
  const [openNav, setOpenNav] = useState(false);
  const ua = useUa();

  const resetNur = () => {
    dbL
      .set("selected", {
        supports: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
        player: {},
        races: [],
      })
      .write();
  };

  const navList = useMemo(() => {
    const list = ua.isPhone ? MOBILE_MENU_LIST : PC_MENU_LIST;
    return (
      <ul className="m-2 flex flex-col gap-x-3 gap-y-1 lg:m-0 lg:flex-row lg:items-center">
        {list.map(({ title, path }) => (
          <li key={title}>
            <Typography
              as="a"
              href={path}
              type="small"
              className="p-1 hover:text-primary"
            >
              {title}
            </Typography>
          </li>
        ))}
      </ul>
    );
  }, [ua]);

  return (
    <>
      <Navbar className="mx-auto w-full max-w-screen-xl sticky top-0 z-50">
        <div className="flex items-center">
          <Typography
            as="a"
            href="#"
            type="small"
            className="mx-2 block py-1 font-semibold"
          >
            Material Tailwind
          </Typography>
          <div className="hidden lg:ml-auto lg:mr-2 lg:block">{navList}</div>
          <IconButton
            size="sm"
            variant="ghost"
            color="secondary"
            onClick={() => setOpenNav(!openNav)}
            className="ml-auto grid lg:hidden"
          >
            {openNav ? (
              <Xmark className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>{navList}</Collapse>
      </Navbar>
      <div className="w-full flex items-center flex-wrap fixed bottom-2">
        <div
          className="cursor-pointer"
          data-tip="无法打开育成页面时点一哈"
          onClick={resetNur}
        >
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
          className="flex mx-2 items-center"
          data-tip={`<img src=${CDN_SERVER + "img/weapp.jpg"} width={200} />`}
        >
          <img
            alt="reimu"
            src={CDN_SERVER + "reimu.gif"}
            preview="false"
            width={24}
          />
          <div>{t("微信小程序")}</div>
        </div>
      </div>
    </>
  );
};

export default NavMenu;
