import LanButton from "@cra/components/lan-button";
import { CDN_SERVER } from "@cra/config";
import dbL from "@cra/dbL";
import { useTranslation } from "react-i18next";

export const SiteFooter = () => {
  const { t } = useTranslation();

  const resetNur = () => {
    dbL
      .set("selected", {
        supports: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
        player: {},
        races: [],
      })
      .write();
  };

  return (
    <footer className="border-grid border-t py-6 md:py-0">
      <div className="container-wrapper">
        <div className="container mx-auto py-4 flex items-center">
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
          <img
            alt="reimu"
            src={CDN_SERVER + "reimu.gif"}
            preview="false"
            width={24}
          />
        </div>
      </div>
    </footer>
  );
};
