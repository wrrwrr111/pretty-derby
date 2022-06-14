import React from "react";
import { useForm } from "react-hook-form";

import CheckBox from "../common/CheckBox";
import Input from "../common/Input";
import { useTranslation } from "react-i18next";
import { useDB } from "../../hooks";
import SkillFilterForm from "../skill/SkillFilterForm";

import { SUPPORT_TYPE_OPTIONS } from "@/config";

const SupportFilterForm = (props) => {
  const { t } = useTranslation();
  const { onUpdate, needId, formName = "sup" } = props;
  const { register, watch, setValue } = useForm();

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => getFilterList(value));
    return () => subscription.unsubscribe();
  }, [watch]);

  const db = useDB();
  if (!db) return null;
  const allSupports = db.get("supports").value();
  const effects = db.get("effects").value();
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
      {SUPPORT_TYPE_OPTIONS.map(({ label, value }) => (
        <CheckBox
          key={formName + "type" + value}
          register={register}
          name={formName + "type"}
          label={t(label)}
          value={formName + value}
        />
      ))}
      <p className="w-full my-1 text-gray-700">{t("技能筛选")}</p>
      <SkillFilterForm
        formName={formName}
        onUpdate={handleSkillFilterFormChange}
        checkOnly={true}
        needId={true}
      />
      <p className="w-full my-1 text-gray-700">{t("育成效果")}</p>
      {effectOptions.map(({ label, value }) => (
        <CheckBox
          key={formName + "effect" + value}
          register={register}
          name={formName + "effect"}
          label={t(label)}
          value={formName + value}
        />
      ))}
    </div>
  );
};

export default SupportFilterForm;
