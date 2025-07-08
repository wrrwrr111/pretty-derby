import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDB } from "@/hooks/useDB";
import {
  SKILL_CONDITION_OPTIONS,
  SKILL_TYPE_OPTIONS,
  SKILL_RARITY_OPTIONS,
} from "@/config";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Image } from "@/components/ui/image";

const SkillFilterForm = (props) => {
  const { t } = useTranslation();
  const { onUpdate, needId, checkOnly, formName = "skill" } = props;
  const { register, watch, setValue } = useForm();

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => getFilterList(value));
    return () => subscription.unsubscribe();
  }, [watch]);

  const { db } = useDB();
  if (!db) return null;

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

    let tempList = db.chain.get("skills").orderBy("db_id").value();

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
    <div className="flex flex-wrap gap-4">
      <div className="w-full">
        <Input {...register(`${formName}q`)} placeholder={t("输入关键词")} />
      </div>

      <div className="w-full">
        <Label className="text-sm font-medium leading-none">{t("触发条件")}</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {SKILL_CONDITION_OPTIONS.map(({ label, value }) => (
            <div key={formName + "condition" + value} className="flex items-center space-x-2">
              <Checkbox
                id={formName + "condition" + value}
                value={formName + value}
                onCheckedChange={(checked) => {
                  const currentValues = watch(`${formName}condition`) || [];
                  if (checked) {
                    setValue(`${formName}condition`, [...currentValues, formName + value]);
                  } else {
                    setValue(
                      `${formName}condition`,
                      currentValues.filter((v) => v !== formName + value)
                    );
                  }
                }}
              />
              <Label htmlFor={formName + "condition" + value} className="text-sm font-normal">
                {t(label)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <Label className="text-sm font-medium leading-none">{t("类型")}</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {SKILL_TYPE_OPTIONS.map(({ label, value, icon }) => (
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
              <div className="flex items-center space-x-2">
                {icon && (
                  <Image
                    src={"img/skill_icons/" + value + ".png"}
                    alt={label}
                    width={20}
                    height={20}
                  />
                )}
                <Label htmlFor={formName + "type" + value} className="text-sm font-normal">
                  {t(label)}
                </Label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <Label className="text-sm font-medium leading-none">{t("稀有度")}</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {SKILL_RARITY_OPTIONS.map(({ label, value }) => (
            <div key={formName + "rare" + value} className="flex items-center space-x-2">
              <Checkbox
                id={formName + "rare" + value}
                value={formName + value}
                onCheckedChange={(checked) => {
                  const currentValues = watch(`${formName}rare`) || [];
                  if (checked) {
                    setValue(`${formName}rare`, [...currentValues, formName + value]);
                  } else {
                    setValue(
                      `${formName}rare`,
                      currentValues.filter((v) => v !== formName + value)
                    );
                  }
                }}
              />
              <Label htmlFor={formName + "rare" + value} className="text-sm font-normal">
                {t(label)}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillFilterForm;
