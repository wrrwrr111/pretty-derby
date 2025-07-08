import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDB } from "@/hooks/useDB";
import SkillFilterForm from "@/components/skill/SkillFilterForm";
import { SUPPORT_TYPE_OPTIONS } from "@/config";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const SupportFilterForm = (props) => {
  const { t } = useTranslation();
  const { onUpdate, needId, formName = "sup" } = props;
  const { register, watch, setValue, control } = useForm();

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => getFilterList(value));
    return () => subscription.unsubscribe();
  }, [watch]);

  const { db } = useDB();
  if (!db) return null;
  const allSupports = db.chain.get("supports").value();
  const effects = db.chain.get("effects").value();
  const effectOptions = Object.keys(effects).map((key) => {
    return { label: effects[key].name, value: key };
  });

  const getFilterList = (value) => {
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
      const allEventList = db.chain.get("events").value();
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
    <div className="flex flex-wrap gap-4">
      <div className="w-full">
        <Input {...register(`${formName}q`)} placeholder={t("事件关键词搜索")} />
      </div>

      <div className="w-full">
        <Label className="text-sm font-medium leading-none">{t("类型")}</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {SUPPORT_TYPE_OPTIONS.map(({ label, value }) => (
            <div key={formName + "type" + value} className="flex items-center space-x-2">
              <Checkbox
                id={formName + "type" + value}
                value={formName + value}
                onCheckedChange={(checked) => {
                  const currentValues = watch(`${formName}type`) || [];
                  if (checked) {
                    setValue(`${formName}type`, [...currentValues, formName + value]);
                  } else {
                    setValue(
                      `${formName}type`,
                      currentValues.filter((v) => v !== formName + value)
                    );
                  }
                }}
              />
              <Label htmlFor={formName + "type" + value} className="text-sm font-normal">
                {t(label)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <Label className="text-sm font-medium leading-none mb-2">{t("技能筛选")}</Label>
        <SkillFilterForm
          formName={formName}
          onUpdate={handleSkillFilterFormChange}
          checkOnly={true}
          needId={true}
        />
      </div>

      <div className="w-full">
        <Label className="text-sm font-medium leading-none">{t("育成效果")}</Label>
        <div className="mt-2 space-y-2">
          {effectOptions.map(({ label, value }) => (
            <div key={formName + "effect" + value} className="flex items-center space-x-2">
              <Checkbox
                id={formName + "effect" + value}
                value={formName + value}
                onCheckedChange={(checked) => {
                  const currentValues = watch(`${formName}effect`) || [];
                  if (checked) {
                    setValue(`${formName}effect`, [...currentValues, formName + value]);
                  } else {
                    setValue(
                      `${formName}effect`,
                      currentValues.filter((v) => v !== formName + value)
                    );
                  }
                }}
              />
              <Label htmlFor={formName + "effect" + value} className="text-sm font-normal">
                {t(label)}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportFilterForm;
