import "./styles.css";
import { t } from "../utils/i18n/t";

const PC_MENU_LIST = [
  ["/", "角色"],
  ["/support", "支援"],
  ["/skill", "技能"],
  ["/race", "比赛"],
  ["/nurturing", "育成"],
  ["/seed", "种马"],
];
const MOBILE_MENU_LIST = [
  ["/", "角色"],
  ["/support", "支援"],
  ["/skill", "技能"],
  ["/race", "比赛"],
  ["/nurturingMo", "育成"],
  ["/seedMo", "种马"],
];

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const lang = "zh-CN";
  return (
    <html lang={lang}>
      <body>
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            <div className="navbar w-full bg-base-300">
              <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer" className="btn-ghost btn-square btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="mx-2 flex-1 px-2">乌拉拉大胜利</div>
              <div className="hidden flex-none lg:block">
                <ul className="menu menu-horizontal">
                  {PC_MENU_LIST.map(([path, title]) => (
                    <li key={path}>
                      <a href={path}>{t(title)}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {props.children}
            {props.modal}
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu w-80 bg-base-100 p-4">
              {MOBILE_MENU_LIST.map(([path, title]) => (
                <li key={path}>
                  <a href={path}>{t(title)}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
}
