import React, { useEffect, useState } from "react";
import db from "../../db.js";
import dbL from "../../dbL.js";
import { Button, Image, Checkbox, Divider, Input, Switch } from "antd";
import t from "../t.js";

const Search = Input.Search;
const cdnServer = "https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/";

const ua = dbL.get("ua").value();
const allSkillList = db.get("skills").orderBy("db_id").value();

const options = {
  distance_type: [
    { label: t("短距離"), value: "1" },
    { label: t("マイル"), value: "2" },
    { label: t("中距離"), value: "3" },
    { label: t("長距離"), value: "4" },
  ],
  running_style: [
    { label: t("逃げ"), value: "1" },
    { label: t("先行"), value: "2" },
    { label: t("差し"), value: "3" },
    { label: t("追込"), value: "4" },
    { label: t("通用"), value: "-1" },
  ],
  phase: [
    { label: t("序盤"), value: "0" },
    { label: t("中盤"), value: "1" },
    { label: t("終盤"), value: "2" },
    { label: t("冲刺"), value: "3" },
  ],
  corner_random: [{ label: t("コーナー"), value: "1" }],
  straight_random: [{ label: t("直線"), value: "1" }],
  is_finalcorner: [{ label: t("最終直線/コーナー"), value: "1" }],
  // is_finalcorner==1&corner==0
};

const SkillCheckboxGroup = React.memo((props) => {
  const { options, name, value } = props;
  const onChange = (checkedValues) => {
    props.onChange(name, checkedValues);
  };

  return <Checkbox.Group options={options} value={value} onChange={onChange} />;
});

const SkillCheckbox = React.memo((props) => {
  const [skillChecked1, setSkillChecked1] = useState([]);
  const [skillChecked2, setSkillChecked2] = useState([]);
  const [checkboxGroupValues, setCheckedboxGroupValues] = useState({});
  // init isOwn
  localStorage.getItem("isOwn") === null && localStorage.setItem("isOwn", 0);
  const [isOwn, setIsOwn] = useState(parseInt(localStorage.getItem("isOwn")));
  const mySupports = dbL.get("mySupports").value();
  const mySkillList = new Set(
    mySupports.reduce((list, supportId) => {
      let support = db.get("supports").find({ id: supportId }).value();
      return list.concat(support.skillList);
    }, [])
  );
  const checkOptions1 = [
    { label: "速度被动(绿)", value: "10011" },
    { label: "耐力被动(绿)", value: "10021" },
    { label: "力量被动(绿)", value: "10031" },
    { label: "毅力被动(绿)", value: "10041" },
    { label: "智力被动(绿)", value: "10051" },
    { label: "耐力恢复(蓝)", value: "20021" },
    { label: "速度提高(黄)", value: "20011" },
    // {label:'20031',value:'20031'},
    { label: "加速度提高(黄)", value: "20041" },
    { label: "切换跑道(黄)", value: "20051" },
    { label: "起步时间(黄)", value: "20061" },
    // {label:'20071',value:'20071'},
    // {label:'20081',value:'20081'},
    { label: "视野提高(黄)", value: "20091" },
    { label: "速度降低(红)", value: "30011" },
    { label: "无法冷静(红)", value: "30041" },
    { label: "耐力降低(红)", value: "30051" },
    { label: "视野降低(红)", value: "30071" },
  ];
  const checkOptions2 = [
    { label: t("ノーマル"), value: "ノーマル" },
    { label: t("レア"), value: "レア" },
    { label: t("固有"), value: "固有" },
  ];
  const onChange1 = (checkedValues) => {
    setSkillChecked1(checkedValues);
    updateSkillList(filteredSkills, checkedValues, skillChecked2, isOwn);
  };
  const onChange2 = (checkedValues) => {
    setSkillChecked2(checkedValues);
    updateSkillList(filteredSkills, skillChecked1, checkedValues, isOwn);
  };
  const filteredSkills = React.useMemo(
    () =>
      Object.entries(checkboxGroupValues).reduce(
        (l, [key, values]) =>
          values.length > 0
            ? l.filter((skill) => {
                if (!skill?.condition) {
                  return false;
                }
                switch (key) {
                  case "phase":
                    return ["phase", "phase_random"]
                      .map((_key) => values.map((value) => `${_key}==${value}`))
                      .flat()
                      .some((phrase) => skill?.condition.includes(phrase));
                  case "running_style":
                    return (
                      values
                        .map((value) => `${key}==${value}`)
                        .some((phrase) => skill?.condition.includes(phrase)) ||
                      (values.includes("-1") && !skill?.condition.includes(`${key}==`))
                    );
                  default:
                    return values
                      .map((value) => `${key}==${value}`)
                      .some((phrase) => skill?.condition.includes(phrase));
                }
              })
            : l,
        allSkillList
      ),
    [checkboxGroupValues]
  );

  useEffect(() => {
    updateSkillList(filteredSkills, skillChecked1, skillChecked2, isOwn);
  }, [filteredSkills]);

  const onCheckboxGroupsChange = React.useCallback(
    (groupName, checkedValues) => {
      setCheckedboxGroupValues({ ...checkboxGroupValues, ...{ [groupName]: checkedValues } });
    },
    [checkboxGroupValues]
  );

  const updateSkillList = (tempSkillList, check2, check3, isOwn) => {
    const check1 = Object.values(checkboxGroupValues).flat();
    if (check2.length) {
      tempSkillList = tempSkillList.filter((skill) => {
        let flag = 0;
        check2.forEach((value) => {
          let str = skill?.icon_id + "";
          if (str) {
            if (str[0] === value[0] && str[3] === value[3]) {
              flag = 1;
            }
          }
        });
        return flag;
      });
    }
    if (check3.length) {
      tempSkillList = tempSkillList.filter((skill) => {
        let flag = 0;
        check3.forEach((value) => {
          if (skill?.rare === value) {
            flag = 1;
          }
        });
        return flag;
      });
    }
    if (isOwn) {
      tempSkillList = tempSkillList.filter((skill) => {
        return mySkillList.has(skill?.id);
      });
    }
    // if (check1.length || check2.length || check3.length || isOwn) {
    //   tempSkillList.push({
    //     id: 'default'
    //   })
    // }
    if (props.needId) {
      tempSkillList = tempSkillList.reduce((list, skill) => {
        list.push(skill?.id);
        return list;
      }, []);
    }
    props.onUpdate(tempSkillList);
  };
  const resetCheckbox = () => {
    setCheckedboxGroupValues({});
    setSkillChecked1([]);
    setSkillChecked2([]);
    props.onUpdate(allSkillList);
  };
  const changeMode = () => {
    let curValue = 1 - isOwn;
    localStorage.setItem("isOwn", curValue);
    setIsOwn(curValue);
    // console.log(curValue)
    updateSkillList(filteredSkills, skillChecked1, skillChecked2, curValue);
  };
  const onSearch = (searchText) => {
    const fullSkillList = allSkillList;
    const tempSkillList = fullSkillList.filter((item) => item.name.indexOf(searchText) > -1);
    setCheckedboxGroupValues({});
    setSkillChecked1([]);
    setSkillChecked2([]);
    props.onUpdate(tempSkillList);
  };
  return (
    <>
      {props.checkOnly ? (
        <>
          {Object.entries(options).map(([gourpName, value]) => (
            <SkillCheckboxGroup
              name={gourpName}
              value={checkboxGroupValues[gourpName]}
              options={value}
              onChange={onCheckboxGroupsChange}
            />
          ))}
          <Divider />
          {/* <Checkbox.Group options={checkOptions1} value={skillChecked1} onChange={onChange1} /> */}
          <Checkbox.Group value={skillChecked1} onChange={onChange1}>
            <div className="w-full flex flex-wrap">
              {checkOptions1.map((checkItem) => (
                <div className="w-full lg:w-1/2">
                  {/* https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/img/skill_icons/10011.png */}
                  <Checkbox
                    value={checkItem.value}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div className="w-full flex">
                      <Image
                        src={cdnServer + "img/skill_icons/" + checkItem.value + ".png"}
                        preview={false}
                        width={26}
                      ></Image>
                      <div className="flex-auto truncate">{checkItem.label}</div>
                    </div>
                  </Checkbox>
                </div>
              ))}
            </div>
          </Checkbox.Group>
          <Divider />
          <Checkbox.Group options={checkOptions2} value={skillChecked2} onChange={onChange2} />
        </>
      ) : (
        <div>
          <div style={{ height: 16 }} />
          <Button type={"danger"} onClick={resetCheckbox} style={{ width: "100%" }}>
            {t("重置")}
          </Button>
          <Divider />
          <div>
            <span
              style={{ margin: "0 10px 0 0", lineHeight: "32px" }}
              data-tip={t("可以在支援卡页面配置")}
            >
              {t("显示拥有支援卡")}
            </span>
            <Switch checked={isOwn} onChange={changeMode} />
          </div>
          <span style={{ margin: "0 10px 0 0", lineHeight: "32px" }}>{t("技能搜索")}</span>
          <Search
            placeholder={t("输入关键词")}
            enterButton={t("搜索")}
            size="middle"
            style={{ width: "100%" }}
            onSearch={onSearch}
          />
          <Divider />
          {Object.entries(options).map(([gourpName, value]) => (
            <SkillCheckboxGroup
              name={gourpName}
              value={checkboxGroupValues[gourpName]}
              options={value}
              onChange={onCheckboxGroupsChange}
            />
          ))}
          <Divider />
          <Checkbox.Group value={skillChecked1} onChange={onChange1}>
            <div className="flex w-full flex-wrap">
              {checkOptions1.map((checkItem) => (
                <div className="w-full lg:w-1/2">
                  <Checkbox
                    value={checkItem.value}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div className="w-full flex">
                      <Image
                        src={cdnServer + "img/skill_icons/" + checkItem.value + ".png"}
                        preview={false}
                        width={26}
                      ></Image>
                      <div className="flex-auto truncate">{checkItem.label}</div>
                    </div>
                  </Checkbox>
                </div>
              ))}
            </div>
          </Checkbox.Group>
          <Divider />
          <Checkbox.Group options={checkOptions2} value={skillChecked2} onChange={onChange2} />
        </div>
      )}
    </>
  );
});

export default SkillCheckbox;
