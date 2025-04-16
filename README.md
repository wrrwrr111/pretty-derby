# urarawin
![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)
![forthebadge](https://forthebadge.com/images/badges/for-you.svg)
![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)
![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)
![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)

[https://urarawin.com](https://urarawin.com)

## 更新版本时
提交更新 /src/assert/master.mdb

## 开发
yarn start

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## 翻译文件
翻译文件位置在 /src/assert/zh.json

## 数据来源
https://gamewith.jp/uma-musume/


```
pretty-derby
├─ .astro
│  └─ collections
├─ .editorconfig
├─ .prettierignore
├─ .prettierrc
├─ LICENSE
├─ README.md
├─ components.json
├─ craco.config.js
├─ next.config.ts
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.mjs
├─ purge.sh
├─ sitemap.js
├─ src
│  ├─ _pages
│  │  ├─ 404
│  │  │  └─ index.js
│  │  ├─ nurturing
│  │  │  └─ index.js
│  │  ├─ nurturingMo
│  │  │  └─ index.js
│  │  ├─ player
│  │  │  └─ detail.js
│  │  ├─ race
│  │  │  └─ index.js
│  │  ├─ seed
│  │  │  └─ index.js
│  │  ├─ seedMo
│  │  │  └─ index.js
│  │  ├─ skill
│  │  │  └─ detail.js
│  │  ├─ skill-detail
│  │  ├─ support
│  │  │  └─ detail.js
│  │  └─ support-detail
│  ├─ app
│  │  ├─ (home)
│  │  │  ├─ layout.jsx
│  │  │  ├─ nurturing
│  │  │  │  ├─ client.jsx
│  │  │  │  └─ page.jsx
│  │  │  ├─ nurturingMo
│  │  │  │  ├─ client.jsx
│  │  │  │  └─ page.jsx
│  │  │  ├─ player
│  │  │  │  ├─ client.jsx
│  │  │  │  └─ page.jsx
│  │  │  ├─ player-detail
│  │  │  ├─ race
│  │  │  │  ├─ client.jsx
│  │  │  │  └─ page.jsx
│  │  │  ├─ seed
│  │  │  │  ├─ client.jsx
│  │  │  │  └─ page.jsx
│  │  │  ├─ seedMo
│  │  │  │  ├─ client.jsx
│  │  │  │  └─ page.jsx
│  │  │  ├─ skill
│  │  │  │  ├─ client.jsx
│  │  │  │  └─ page.jsx
│  │  │  ├─ skill-detail
│  │  │  ├─ support
│  │  │  │  ├─ client.jsx
│  │  │  │  └─ page.jsx
│  │  │  └─ support-detail
│  │  ├─ [[...slug]]
│  │  │  ├─ client.jsx
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ icon.png
│  │  ├─ layout.jsx
│  │  └─ robots.txt
│  ├─ app.js
│  ├─ assert
│  │  ├─ db.json
│  │  ├─ dbd.json
│  │  ├─ locales
│  │  │  ├─ en.json
│  │  │  ├─ ja.json
│  │  │  └─ zh_CN.json
│  │  ├─ master.mdb
│  │  └─ uma.json
│  ├─ components
│  │  ├─ animate-ui
│  │  │  ├─ motion-highlight.tsx
│  │  │  ├─ radix-collapsible.tsx
│  │  │  ├─ radix-dropdown-menu.tsx
│  │  │  ├─ radix-sheet.tsx
│  │  │  ├─ radix-sidebar.tsx
│  │  │  └─ radix-tooltip.tsx
│  │  ├─ buff.js
│  │  ├─ common
│  │  │  ├─ CheckBox.js
│  │  │  ├─ Input.js
│  │  │  ├─ Layout.js
│  │  │  └─ List.js
│  │  ├─ deck.js
│  │  ├─ effect
│  │  │  └─ index.js
│  │  ├─ event
│  │  │  ├─ EventCard.js
│  │  │  ├─ EventDetail.js
│  │  │  └─ EventList.js
│  │  ├─ intro.js
│  │  ├─ lan-button.js
│  │  ├─ player
│  │  │  ├─ PlayerCard.js
│  │  │  ├─ PlayerDetail.js
│  │  │  ├─ PlayerList.js
│  │  │  └─ PlayerTable.js
│  │  ├─ race
│  │  │  └─ index.js
│  │  ├─ skill
│  │  │  ├─ SkillCard.js
│  │  │  ├─ SkillDetail.js
│  │  │  ├─ SkillFilterForm.js
│  │  │  ├─ SkillList.js
│  │  │  └─ SkillListWithFilter.js
│  │  ├─ support
│  │  │  ├─ SupportCard.js
│  │  │  ├─ SupportDetail.js
│  │  │  ├─ SupportFilterForm.js
│  │  │  ├─ SupportList.js
│  │  │  └─ SupportListWithFilter.js
│  │  └─ ui
│  │     ├─ avatar.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ separator.tsx
│  │     └─ skeleton.tsx
│  ├─ config
│  │  └─ index.js
│  ├─ dbL.js
│  ├─ hooks
│  │  ├─ index.js
│  │  └─ use-mobile.ts
│  ├─ i18n.js
│  ├─ index.css
│  ├─ lib
│  │  └─ utils.ts
│  ├─ styles
│  │  └─ global.css
│  └─ utils
│     ├─ ua.js
│     └─ useViewport.js
├─ tsconfig.json
└─ yarn.lock

```