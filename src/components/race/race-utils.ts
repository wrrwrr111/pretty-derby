export const getDate = (i: number) => {
  const year = Math.floor(i / 24) + 1;
  const month = Math.floor((i - (year - 1) * 24) / 2) + 1;
  const moment = i % 2 ? "后" : "前";
  return `${year}年${month}月${moment}`;
};

export const raceGolds = [
  { name: "传统三冠", raceNames: ["皐月賞30", "日本ダービー東京優駿33", "菊花賞43"] },
  { name: "春日三冠", raceNames: ["大阪杯53", "天皇賞春55", "宝塚記念59"] },
  { name: "秋日三冠", raceNames: ["天皇賞秋67", "ジャパンカップ69", "有馬記念71"] },
  { name: "天皇春秋", raceNames: ["天皇賞春55", "天皇賞秋67"] },
  { name: "纪念春秋Ⅰ", raceNames: ["宝塚記念35", "有馬記念47"] },
  { name: "纪念春秋Ⅱ", raceNames: ["宝塚記念59", "有馬記念71"] },
  { name: "母马三冠", raceNames: ["桜花賞30", "オークス33", "秋華賞43"] },
  { name: "英里春秋Ⅰ", raceNames: ["安田記念34", "マイルチャンピオンシップ45"] },
  { name: "英里春秋Ⅱ", raceNames: ["安田記念58", "マイルチャンピオンシップ69"] },
  { name: "泥地春秋", raceNames: ["フェブラリーステークス51", "チャンピオンズカップ70"] },
  { name: "短距春秋", raceNames: ["高松宮記念53", "スプリンターズステークス65"] },
];

export const getGolds = (race: any) => {
  return raceGolds
    .reduce((golds, raceGold) => {
      if (raceGold.raceNames.includes(race.uniqueName)) {
        golds.push(
          `${raceGold.name} ${raceGold.raceNames.indexOf(race.uniqueName) + 1}/${
            raceGold.raceNames.length
          }`
        );
      }
      return golds;
    }, [] as string[])
    .join(" , ");
};

export const getColor = (grade: string) => {
  switch (grade) {
    case "G1":
      return "blue";
    case "G2":
      return "pink";
    case "G3":
      return "green";
    case "OP":
      return "orange";
    case "Pre-OP":
      return "orange";
    default:
      return "gray";
  }
};
