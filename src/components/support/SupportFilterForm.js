import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import CheckBox from "../common/CheckBox";
import Input from "../common/Input";
import dbL from "@/dbL.js";
import db from "@/db.js";
import t from "../t.js";

import SkillFilterForm from "../skill/SkillFilterForm";
const allSupports = db.get("supports").value();
const effects = db.get("effects").value();
const effectOptions = Object.keys(effects).map((key) => {
  return { label: t(effects[key].name), value: key };
});
const typeOptions = ["スピード", "スタミナ", "パワー", "根性", "賢さ", "友人"].map((item) => ({
  label: t(item),
  value: item,
}));
const SupportFilterForm = (props) => {
  const { onUpdate, needId } = props;
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: {},
  } = useForm();

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => getFilterList(value));
    return () => subscription.unsubscribe();
  }, [watch]);

  const getFilterList = (value) => {
    const { type, effect, q, skill } = value;
    let tempList = [...allSupports];

    if (type?.length) {
      tempList = tempList.filter((support) => {
        let flag = 0;
        if (type.indexOf(support?.type) !== -1) {
          return (flag = 1);
        }
        return flag;
      });
    }

    if (effect?.length) {
      tempList = tempList.filter((support) => {
        let flag = 0;
        effect.forEach((value) => {
          support.effects &&
            support.effects.forEach((effect) => {
              if (effect.type == value) {
                flag += 1;
              }
            });
        });
        return flag === effect.length;
      });
    }
    if (skill?.length) {
      tempList = tempList.filter((support) => {
        let flag = 0;
        support.skillList?.forEach((skillId) => {
          if (skill.indexOf(skillId) !== -1) {
            return (flag = 1);
          }
        });
        return flag;
      });
    }
    if (q) {
      const allEventList = db.get("events").value();
      const eventIdList = allEventList
        .filter((event) => {
          let jsonEvent = JSON.stringify(event);
          if (jsonEvent.indexOf(q) !== -1) {
            return true;
          } else {
            return false;
          }
        })
        .reduce((list, event) => {
          list.push(event.id);
          return list;
        }, []);
      tempList = tempList.filter((support) => {
        let flag = 0;
        support.eventList.forEach((eventId) => {
          if (eventIdList.indexOf(eventId) !== -1) {
            return (flag = 1);
          }
        });
        return flag;
      });
    }
    if (needId) {
      tempList = tempList.reduce((list, support) => {
        list.push(support?.id);
        return list;
      }, []);
    }
    onUpdate && onUpdate(tempList);
  };
  const handleSkillFilterFormChange = (list) => {
    setValue("skill", list);
  };
  return (
    <div className="flex flex-wrap">
      <Input register={register} name="q" placeholder={t("事件关键词搜索")} />
      <p className="w-full my-1 text-gray-700">{t("类型")}</p>
      {typeOptions.map(({ label, value }) => (
        <CheckBox register={register} name={"type"} label={label} value={value} />
      ))}
      <p className="w-full my-1 text-gray-700">{t("技能筛选")}</p>
      <SkillFilterForm onUpdate={handleSkillFilterFormChange} checkOnly={true} needId={true} />
      <p className="w-full my-1 text-gray-700">{t("育成效果")}</p>
      {effectOptions.map(({ label, value }) => (
        <CheckBox register={register} name={"effect"} label={label} value={value} />
      ))}
    </div>
  );
};

export default SupportFilterForm;
