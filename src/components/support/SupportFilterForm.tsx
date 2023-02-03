import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SkillFilterForm from "../skill/SkillFilterForm";
import { SUPPORT_TYPE_OPTIONS } from "src/config";
import { useAtom } from "jotai";
import { supportsAtom, effectsAtom, eventsAtom } from "../../hooks/atoms";

import { Checkbox, Input } from "@material-tailwind/react";

const SupportFilterForm = (props) => {
  const [supports] = useAtom(supportsAtom);
  const [effects] = useAtom(effectsAtom);
  const [events] = useAtom(eventsAtom);
  const { t } = useTranslation();
  const { onUpdate, needId, formName = "sup" } = props;
  const { register, watch, setValue, control } = useForm();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => getFilterList(value));
    return () => subscription.unsubscribe();
  }, [watch]);

  const effectOptions = Object.keys(effects).map((key) => {
    return { label: effects[key].name, value: key };
  });
  const getFilterList = (value) => {
    // const { type, effect, q, skill } = value;
    const q = value[`${formName}q`];
    const skill = value["skill"];
    const effect =
      value[`${formName}effect`] && value[`${formName}effect`]?.map((e) => e.replace(formName, ""));
    const type =
      value[`${formName}type`] && value[`${formName}type`]?.map((e) => e.replace(formName, ""));
    let tempList = [...supports];

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
              if (effect.type === value) {
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
      const eventIdList = events
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
      <Input {...register(formName + "q")} name="q" placeholder={t("事件关键词搜索") || ""} />
      <p className="my-1 w-full text-gray-700">{t("类型")}</p>
      {SUPPORT_TYPE_OPTIONS.map(({ label, value }) => (
        <Checkbox
          key={formName + "type" + value}
          {...register(formName + "type")}
          id={value}
          name={formName + "type"}
          label={t(label) || ""}
          value={formName + value}
        />
      ))}
      <p className="my-1 w-full text-gray-700">{t("技能筛选")}</p>
      <SkillFilterForm
        formName={formName}
        onUpdate={handleSkillFilterFormChange}
        checkOnly={true}
        needId={true}
      />
      <p className="my-1 w-full text-gray-700">{t("育成效果")}</p>
      {effectOptions.map(({ label, value }) => (
        <Checkbox
          key={formName + "effect" + value}
          {...register(formName + "effect")}
          id={value}
          name={formName + "effect"}
          label={t(label) || ""}
          value={formName + value}
        />
      ))}
    </div>
  );
};

export default SupportFilterForm;
