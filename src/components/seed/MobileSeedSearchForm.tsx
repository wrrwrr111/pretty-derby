import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import PlayerInput from "./PlayerInput";
import SupportInput from "./SupportInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  player0: z.object({
    id: z.string(),
    imgUrl: z.string().optional(),
  }).optional(),
  support: z.object({
    id: z.string(),
    imgUrl: z.string().optional(),
  }).optional(),
  supportLevel: z.number().min(0).max(4),
  p1: z.array(
    z.object({
      attr: z.tuple([z.string(), z.number()]),
    })
  ).optional(),
});

const attributeOptions = [
  { value: "speed", label: "速度" },
  { value: "stamina", label: "耐力" },
  { value: "power", label: "力量" },
  { value: "guts", label: "根性" },
  { value: "wisdom", label: "智力" },
  { value: "grass", label: "草地" },
  { value: "dirt", label: "泥地" },
  { value: "shortDistance", label: "短距离" },
  { value: "mile", label: "英里" },
  { value: "mediumDistance", label: "中距离" },
  { value: "longDistance", label: "长距离" },
  { value: "escapeR", label: "逃" },
  { value: "leadingR", label: "先" },
  { value: "insertR", label: "差" },
  { value: "trackingR", label: "追" },
];

const levelOptions = Array.from({ length: 9 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}星`,
}));

const MobileSeedSearchForm = ({ onSearch }) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supportLevel: 0,
      p1: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "p1",
  });

  const onSubmit = async (values) => {
    let formData = { attrs: [], levels: [] };

    if (values.player0?.id) {
      formData.attrs.push("playerId0");
      formData.levels.push(values.player0.id);
    }

    if (values.support?.id) {
      formData.attrs.push("supportId");
      formData.levels.push(values.support.id);
    }

    values.p1?.forEach((item) => {
      formData.attrs.push(item.attr[0]);
      formData.levels.push(item.attr[1]);
    });

    onSearch(formData);
  };

  const onReset = () => form.reset();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ScrollArea className="h-[60vh]">
          <div className="space-y-4 p-2">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2">
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`p1.${index}.attr.0`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("选择属性")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {attributeOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {t(option.label)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`p1.${index}.attr.1`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("选择等级")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {levelOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {t(option.label)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => append({ attr: ["", 1] })}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t("添加过滤条件")}
            </Button>
          </div>
        </ScrollArea>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="player0"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("角色")}</FormLabel>
                <FormControl>
                  <PlayerInput
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="support"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("支援卡")}</FormLabel>
                <FormControl>
                  <SupportInput
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="supportLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("突破等级")}</FormLabel>
              <FormControl>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((num) => (
                    <Button
                      key={num}
                      variant={field.value >= num ? "default" : "outline"}
                      type="button"
                      size="sm"
                      onClick={() => field.onChange(num)}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onReset}>
            {t("重置")}
          </Button>
          <Button type="submit">{t("搜索")}</Button>
        </div>
      </form>
    </Form>
  );
};

export default MobileSeedSearchForm;
