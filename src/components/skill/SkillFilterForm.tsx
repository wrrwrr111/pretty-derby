import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { Checkbox, Input } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

import {
  CDN_SERVER,
  SKILL_CONDITION_OPTIONS,
  SKILL_TYPE_OPTIONS,
  SKILL_RARITY_OPTIONS,
} from "src/config";

import { useAtom } from "jotai";
import { skillsAtom, supportsAtom, playersAtom } from "../../hooks/atoms";

const SkillFilterForm = (props) => {
  const { t } = useTranslation();
  const [skills] = useAtom(skillsAtom);
  const { onUpdate, needId, checkOnly, formName = "skill" } = props;

  const { register, watch } = useForm();

  useEffect(() => {
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
    let tempList = [...skills];
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

  return (
    <div className="flex flex-wrap">
      <Input register={register} name="q" placeholder={t("输入关键词")} />
      <p className="my-1  w-full text-gray-700">触发条件</p>
      {SKILL_CONDITION_OPTIONS.map(({ label, value }) => (
        <Checkbox
          key={formName + "condition" + value}
          {...register(formName + "condition")}
          id={value}
          name={formName + "condition"}
          label={t(label) || ""}
          value={formName + value}
        />
      ))}
      <p className="my-1 w-full text-gray-700">类型</p>
      {SKILL_TYPE_OPTIONS.map(({ label, value }) => (
        <Checkbox
          key={formName + "type" + value}
          {...register(formName + "type")}
          id={value}
          name={formName + "type"}
          label={t(label) || ""}
          value={formName + value}
          icon={<img alt="" src={CDN_SERVER + "img/skill_icons/" + value + ".png"} width={20} />}
        />
      ))}
      <p className="my-1  w-full text-gray-700">稀有度</p>
      {SKILL_RARITY_OPTIONS.map(({ label, value }) => (
        <Checkbox
          key={formName + "rare" + value}
          {...register(formName + "rare")}
          id={value}
          name={formName + "rare"}
          label={t(label) || ""}
          value={formName + value}
        />
      ))}
    </div>
  );
};

export default SkillFilterForm;
