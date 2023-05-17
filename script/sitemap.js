const fs = require("fs");
const jsonDB = JSON.parse(fs.readFileSync("./src/assert/db.json", "utf-8"));

const linkPrefix = "https://urarawin.com";

const sitemaps = [
  "/",
  "/support",
  "/skill",
  "/nurturing",
  "/nurturingMo",
  "/seed",
  "/SeedMo",
  "/race",
  // "/player-detail/:id",
  // "/support-detail/:id",
  // "/skill-detail/:id",
  "/buff",
];
for (let player of jsonDB.players) {
  sitemaps.push(`/player-detail/${player.id}`);
}
for (let support of jsonDB.supports) {
  sitemaps.push(`/support-detail/${support.id}`);
}
for (let skill of jsonDB.skills) {
  sitemaps.push(`/skill-detail/${skill.id}`);
}

const initSiteMap = async () => {
  const sitemap = sitemaps.map((e) => linkPrefix + e).join("\n");
  console.log(`Sitemap: ${linkPrefix}/sitemap.txt`);
  fs.writeFileSync(`./public/sitemap.txt`, sitemap);
  // 判断robots里是否有对应的sitemap
  const robots = fs.readFileSync("./public/robots.txt", "utf8");
  if (!robots.includes(`${linkPrefix}/sitemap.txt`)) {
    fs.appendFileSync("./public/robots.txt", `Sitemap: ${linkPrefix}/sitemap.txt\n`);
  }
};
initSiteMap();
