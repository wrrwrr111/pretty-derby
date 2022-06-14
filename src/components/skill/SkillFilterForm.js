import React from "react";

import { useForm } from "react-hook-form";
import CheckBox from "../common/CheckBox";
import Input from "../common/Input";

import { useDB } from "../../hooks/index.js";
import { useTranslation } from "react-i18next";

const cdnServer = "https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/";

const CONDITION_OPTIONS = [
  { label: "短距離", value: "distance_type==1" },
  { label: "マイル", value: "distance_type==2" },
  { label: "中距離", value: "distance_type==3" },
  { label: "長距離", value: "distance_type==4" },
  { label: "逃げ", value: "running_style==1" },
  { label: "先行", value: "running_style==2" },
  { label: "差し", value: "running_style==3" },
  { label: "追込", value: "running_style==4" },
  { label: "通用", value: "running_style==" },
  { label: "序盤", value: "phase==0|phase_random==0" },
  { label: "中盤", value: "phase==1|phase_random==1" },
  { label: "終盤", value: "phase==2|phase_random==2" },
  { label: "冲刺", value: "phase==3|phase_random==3" },
  { label: "コーナー", value: "corner_random==1" },
  { label: "直線", value: "straight_random==1" },
  { label: "最終直線/コーナー", value: "is_finalcorner==1" },
];
const TYPE_OPTIONS = [
  { label: "速度被动", value: "10011" },
  { label: "耐力被动", value: "10021" },
  { label: "力量被动", value: "10031" },
  { label: "毅力被动", value: "10041" },
  { label: "智力被动", value: "10051" },
  { label: "耐力恢复", value: "20021" },
  { label: "速度提高", value: "20011" },
  // {label:'20031',value:'20031'},
  { label: "加速度提高", value: "20041" },
  { label: "切换跑道", value: "20051" },
  { label: "起步时间", value: "20061" },
  // {label:'20071',value:'20071'},
  // {label:'20081',value:'20081'},
  { label: "视野提高", value: "20091" },
  { label: "速度降低", value: "30011" },
  { label: "无法冷静", value: "30041" },
  { label: "耐力降低", value: "30051" },
  { label: "视野降低", value: "30071" },
];

const RARITY_OPTIONS = [
  { label: "ノーマル", value: "ノーマル" },
  { label: "レア", value: "レア" },
  { label: "固有", value: "固有" },
];
const SkillFilterForm = (props) => {
  const { t } = useTranslation();
  const { onUpdate, needId, checkOnly, formName = "skill" } = props;

  const { register, watch } = useForm();

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => getFilterList(value));
    return () => subscription.unsubscribe();
  }, [watch]);
  const getFilterList = (value) => {
    const q = value[`${formName}q`];
    const condition =
      value[`${formName}condition`] &&
      value[`${formName}condition`]?.map((e) => e.replace(formName, ""));
    const rare =
      value[`${formName}rare`] && value[`${formName}rare`]?.map((e) => e.replace(formName, ""));
    const type =
      value[`${formName}type`] && value[`${formName}type`]?.map((e) => e.replace(formName, ""));
    if (checkOnly && !q && !type?.length && !rare?.length && !condition?.length) {
      onUpdate([]);
      return;
    }
    let tempList = db.get("skills").orderBy("db_id").value();
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
  };
  const db = useDB();
  if (!db) return null;

  return (
    <div className="flex flex-wrap">
      <Input register={register} name="q" placeholder={t("输入关键词")} />
      <p className="w-full  my-1 text-gray-700">触发条件</p>
      {CONDITION_OPTIONS.map(({ label, value }) => (
        <CheckBox
          key={formName + "condition" + value}
          register={register}
          name={formName + "condition"}
          label={t(label)}
          value={formName + value}
        />
      ))}
      <p className="w-full my-1 text-gray-700">类型</p>
      {TYPE_OPTIONS.map(({ label, value }) => (
        <CheckBox
          key={formName + "type" + value}
          register={register}
          name={formName + "type"}
          label={t(label)}
          value={formName + value}
          icon={cdnServer + "img/skill_icons/" + value + ".png"}
        />
      ))}
      <p className="w-full  my-1 text-gray-700">稀有度</p>
      {RARITY_OPTIONS.map(({ label, value }) => (
        <CheckBox
          key={formName + "rare" + value}
          register={register}
          name={formName + "rare"}
          label={t(label)}
          value={formName + value}
        />
      ))}
    </div>
  );
};

export default SkillFilterForm;
