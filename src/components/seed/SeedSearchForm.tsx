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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, X } from "lucide-react";
import PlayerInput from "./PlayerInput";
import SupportInput from "./SupportInput";
import { SEED_BLUE_LABELS, SEED_RED_LABELS } from "@/config";

const attributeOptions = [
  { value: "speed", label: "速度" },
  { value: "stamina", label: "耐力" },
  { value: "power", label: "力量" },
  { value: "guts", label: "根性" },
  { value: "wisdom", label: "智力" },
  { value: "grass", label: "草地/芝" },
  { value: "dirt", label: "泥地/ダート" },
  { value: "shortDistance", label: "短距离" },
  { value: "mile", label: "英里" },
  { value: "mediumDistance", label: "中距离" },
  { value: "longDistance", label: "长距离" },
  { value: "escapeR", label: "逃" },
  { value: "leadingR", label: "先" },
  { value: "insertR", label: "差" },
  { value: "trackingR", label: "追" },
  { value: "uraLevel", label: "URA" },
];

const serverOptions = [
  { value: "zh-CN", label: "简中" },
  { value: "zh-TW", label: "繁中" },
  { value: "ja", label: "日服" },
];

const formSchema = z.object({
  server: z.string().min(1, "请选择区服"),
  player0: z.object({
    id: z.string(),
    imgUrl: z.string().optional(),
  }).optional(),
  support: z.object({
    id: z.string(),
    imgUrl: z.string().optional(),
  }).optional(),
  supportLevel: z.number().min(0).max(4),
  p0: z.array(
    z.object({
      attr: z.string(),
      level: z.number().min(1).max(3),
    })
  ).optional(),
  p1: z.array(
    z.object({
      attr: z.string(),
      level: z.number().min(1).max(9),
    })
  ).optional(),
});

const SearchOne = ({ name, max, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded-lg space-y-2">
            <FormField
              control={control}
              name={`${name}.${index}.attr`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-wrap gap-2"
                    >
                      {attributeOptions.map((option) => (
                        <FormItem key={option.value} className="flex items-center space-x-1">
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`${name}.${index}.level`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>等级</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      {[...Array(max)].map((_, i) => (
                        <Button
                          key={i}
                          variant={field.value > i ? "default" : "outline"}
                          size="sm"
                          type="button"
                          onClick={() => field.onChange(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => remove(index)}
              className="mt-2"
            >
              <X className="h-4 w-4 mr-1" /> 移除
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ attr: "", level: 1 })}
      >
        <Plus className="h-4 w-4 mr-1" /> 添加过滤条件
      </Button>
    </div>
  );
};

const SeedSearchForm = ({ onSearch }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      server: "",
      supportLevel: 0,
      p0: [],
      p1: [],
    },
  });

  const onSubmit = (values) => {
    let formData = { attrs: [], levels: [] };

    if (values.player0?.id) {
      formData.attrs.push("playerId0");
      formData.levels.push(values.player0.id);
    }

    if (values.supportLevel) {
      formData.attrs.push("supportLevel");
      formData.levels.push(values.supportLevel);
    }

    if (values.support?.id) {
      formData.attrs.push("supportId");
      formData.levels.push(values.support.id);
    }

    values.p0?.forEach((item) => {
      if (SEED_BLUE_LABELS[item.attr]) {
        formData["blue0"] = item.attr;
        formData.attrs.push("blueLevel0");
        formData.levels.push(item.level);
      } else if (SEED_RED_LABELS[item.attr]) {
        formData["red0"] = item.attr;
        formData.attrs.push("redLevel0");
        formData.levels.push(item.level);
      } else if (item.attr === "uraLevel") {
        formData.attrs.push("uraLevel0");
        formData.levels.push(item.level);
      }
    });

    values.p1?.forEach((item) => {
      formData.attrs.push(item.attr);
      formData.levels.push(item.level);
    });

    if (values.server) {
      formData.attrs.push("server");
      formData.levels.push(values.server);
    }

    onSearch(formData);
  };

  const onReset = () => form.reset();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="server"
          render={({ field }) => (
            <FormItem>
              <FormLabel>区服</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-2"
                >
                  {serverOptions.map((option) => (
                    <FormItem key={option.value} className="flex items-center space-x-1">
                      <FormControl>
                        <RadioGroupItem value={option.value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="player0"
          render={({ field }) => (
            <FormItem>
              <FormLabel>角色</FormLabel>
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

        <div>
          <h4 className="mb-2">蓝色/红色/URA因子</h4>
          <SearchOne name="p0" max={3} control={form.control} />
        </div>

        <div>
          <h4 className="mb-2">总计</h4>
          <SearchOne name="p1" max={9} control={form.control} />
        </div>

        <FormField
          control={form.control}
          name="support"
          render={({ field }) => (
            <FormItem>
              <FormLabel>支援卡</FormLabel>
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

        <FormField
          control={form.control}
          name="supportLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>突破等级</FormLabel>
              <FormControl>
                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <Button
                      key={i}
                      variant={field.value > i ? "default" : "outline"}
                      size="sm"
                      type="button"
                      onClick={() => field.onChange(i + 1)}
                    >
                      {i + 1}
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
            重置
          </Button>
          <Button type="submit">搜索</Button>
        </div>
      </form>
    </Form>
  );
};

export default SeedSearchForm;
