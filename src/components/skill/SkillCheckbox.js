import React, { useEffect, useState } from "react";
import Button from "@material-tailwind/react/Button";
import Checkbox from "@material-tailwind/react/Checkbox";
import Input from "@material-tailwind/react/Input";

import db from "../../db.js";
import dbL from "../../dbL.js";
import { Image, Divider, Switch } from "antd";
import { useForm } from "react-hook-form";
import t from "../t.js";

const Search = Input.Search;
const cdnServer = "https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/";

const ua = dbL.get("ua").value();
const allSkillList = db.get("skills").orderBy("db_id").value();

const conditionOptions = [
  { label: t("短距離"), value: "distance_type==1" },
  { label: t("マイル"), value: "distance_type==2" },
  { label: t("中距離"), value: "distance_type==3" },
  { label: t("長距離"), value: "distance_type==4" },
  { label: t("逃げ"), value: "running_style==1" },
  { label: t("先行"), value: "running_style==2" },
  { label: t("差し"), value: "running_style==3" },
  { label: t("追込"), value: "running_style==4" },
  { label: t("通用"), value: "running_style==" },
  { label: t("序盤"), value: "phase==0|phase_random==0" },
  { label: t("中盤"), value: "phase==1|phase_random==1" },
  { label: t("終盤"), value: "phase==2|phase_random==2" },
  { label: t("冲刺"), value: "phase==3|phase_random==3" },
  { label: t("コーナー"), value: "corner_random==1" },
  { label: t("直線"), value: "straight_random==1" },
  { label: t("最終直線/コーナー"), value: "is_finalcorner==1" },
];
const typeOptions = [
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

const rarityOptions = [
  { label: t("ノーマル"), value: "ノーマル" },
  { label: t("レア"), value: "レア" },
  { label: t("固有"), value: "固有" },
];
const SkillCheckbox = (props) => {
  const { onUpdate, needId } = props;

  const {
    register,
    watch,
    handleSubmit,
    formState: {},
  } = useForm();
  // const watchAllFields = watch();

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => getFilterList(value));
    return () => subscription.unsubscribe();
  }, [watch]);

  const [checkboxGroupValues, setCheckedboxGroupValues] = useState({});
  const mySupports = dbL.get("mySupports").value();
  const mySkillList = new Set(
    mySupports.reduce((list, supportId) => {
      let support = db.get("supports").find({ id: supportId }).value();
      return list.concat(support.skillList);
    }, [])
  );

  const getFilterList = (value) => {
    const { condition, q, rare, type } = value;
    let tempList = [...allSkillList];
    if (q) {
      tempList = tempList.filter((item) => item.name.indexOf(q) > -1);
    }
    if (type && type.length) {
      tempList = tempList.filter((skill) => {
        let flag = 0;
        type.forEach((value) => {
          let str = skill.icon_id + "";
          if (str) {
            if (str[0] === value[0] && str[3] === value[3]) {
              flag = 1;
            }
          }
        });
        return flag;
      });
    }
    if (rare && rare.length) {
      tempList = tempList.filter((skill) => {
        let flag = 0;
        rare.forEach((value) => {
          if (skill.rare === value) {
            flag = 1;
          }
        });
        return flag;
      });
    }
    if (condition && condition.length) {
      const str = condition.join("|");
      const reg = RegExp(str);
      tempList = tempList.filter((skill) => skill.condition?.match(reg));
    }
    if (needId) {
      tempList = tempList.reduce((list, skill) => {
        list.push(skill?.id);
        return list;
      }, []);
    }
    onUpdate(tempList);
    return;

    // if (isOwn) {
    //   tempSkillList = tempSkillList.filter((skill) => {
    //     return mySkillList.has(skill?.id);
    //   });
    // }
    // onUpdate(tempSkillList);
  };
  // }, [filteredSkills, skillChecked1, skillChecked2, isOwn]);

  return (
    <div>
      {/* <Button type={"danger"} onClick={resetCheckbox} style={{ width: "100%" }}>
        {t("重置")}
      </Button> */}
      <div className="flex flex-wrap">
        {/* <div>
          <span
            style={{ margin: "0 10px 0 0", lineHeight: "32px" }}
            data-tip={t("可以在支援卡页面配置")}
          >
            {t("显示拥有支援卡")}
          </span>
          <Switch checked={isOwn} onChange={changeMode} />
        </div> */}
        <div className="w-full relative h-11 mt-3">
          <input
            className={`w-full h-full text-gray-800 leading-normal shadow-none outline-none focus:outline-none focus:ring-0 focus:text-gray-800 px-3 pt-2.5 pb-1.5 mt-input-outline-light-blue-500 border-gray-300 mt-input-outline bg-transparent border border-1 border-gray-300 rounded-lg focus:border-2 focus:border-light-blue-500 undefined undefined`}
            placeholder=" "
            {...register("q")}
          />
          <label
            className={`text-gray-400 absolute left-0 -top-1.5 w-full h-full false border-gray-300 pointer-events-none flex false leading-10 transition-all duration-300`}
          >
            {t("输入关键词")}
          </label>
        </div>
        <p className="w-full  my-1 text-gray-700">触发条件</p>
        {conditionOptions.map(({ label, value }) => (
          <div key={value} className="flex items-center mr-1 mb-1">
            <input
              id={value}
              type="checkbox"
              className={`mt-checkbox mt-checkbox-light-blue-500 hidden overflow-hidden`}
              value={value}
              {...register("condition")}
            />
            <label
              htmlFor={value}
              className="flex items-center cursor-pointer text-gray-400 select-none transition-all duration-300"
            >
              <span className="relative w-5 h-5 inline-block mr-2 rounded border border-gray-500 transition-all duration-300"></span>
              {label}
            </label>
          </div>
        ))}
        <p className="w-full my-1 text-gray-700">类型</p>
        {typeOptions.map(({ label, value }) => (
          <div key={value} className="flex items-center mr-1 mb-1">
            <input
              id={value}
              type="checkbox"
              className={`mt-checkbox mt-checkbox-light-blue-500 hidden overflow-hidden`}
              value={value}
              {...register("type")}
            />
            <label
              htmlFor={value}
              className="flex items-center cursor-pointer text-gray-400 select-none transition-all duration-300"
            >
              <span className="relative w-5 h-5 inline-block mr-2 rounded border border-gray-500 transition-all duration-300"></span>
              <img alt="" src={cdnServer + "img/skill_icons/" + value + ".png"} width={20}></img>
              {label}
            </label>
          </div>
        ))}
        <p className="w-full  my-1 text-gray-700">稀有度</p>
        {rarityOptions.map(({ label, value }) => (
          <div key={value} className="flex items-center mr-1 mb-1">
            <input
              id={value}
              type="checkbox"
              className={`mt-checkbox mt-checkbox-light-blue-500 hidden overflow-hidden`}
              value={value}
              {...register("rare")}
            />
            <label
              htmlFor={value}
              className="flex items-center cursor-pointer text-gray-400 select-none transition-all duration-300"
            >
              <span className="relative w-5 h-5 inline-block mr-2 rounded border border-gray-500 transition-all duration-300"></span>
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCheckbox;
