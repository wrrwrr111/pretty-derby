import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import PlayerInput from "./PlayerInput";
import SupportInput from "./SupportInput";
import { SEED_BLUE_LABELS, SEED_RED_LABELS } from "@/config";
import dbL from "@/dbL";
import axios from "axios";

const formSchema = z.object({
  player0: z.object({
    id: z.string(),
    imgUrl: z.string().optional(),
  }),
  player1: z.object({
    id: z.string(),
    imgUrl: z.string().optional(),
  }),
  player2: z.object({
    id: z.string(),
    imgUrl: z.string().optional(),
  }),
  support: z.object({
    id: z.string(),
    imgUrl: z.string().optional(),
  }),
  supportLevel: z.number().min(0).max(4),
  gameId: z.string().regex(/^[0-9]\d*$/, "输入正确的id"),
  server: z.enum(["zh-CN", "zh-TW", "ja"]),
  blue0: z.string(),
  blueLevel0: z.number().min(1).max(3),
  red0: z.string(),
  redLevel0: z.number().min(1).max(3),
  greenLevel0: z.number().min(0).max(3),
  uraLevel0: z.number().min(0).max(3),
  whiteNum0: z.number().min(0).max(10),
  blue1: z.string(),
  blueLevel1: z.number().min(1).max(3),
  red1: z.string(),
  redLevel1: z.number().min(1).max(3),
  greenLevel1: z.number().min(0).max(3),
  uraLevel1: z.number().min(0).max(3),
  whiteNum1: z.number().min(0).max(10),
  blue2: z.string(),
  blueLevel2: z.number().min(1).max(3),
  red2: z.string(),
  redLevel2: z.number().min(1).max(3),
  greenLevel2: z.number().min(0).max(3),
  uraLevel2: z.number().min(0).max(3),
  whiteNum2: z.number().min(0).max(10),
});

const SeedInputForm = ({ onFinish: onFinishProp }) => {
  const [seed, setSeed] = useState({});
  const userId = dbL.get("userId").value();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supportLevel: 0,
      greenLevel0: 0,
      uraLevel0: 0,
      whiteNum0: 0,
      greenLevel1: 0,
      uraLevel1: 0,
      whiteNum1: 0,
      greenLevel2: 0,
      uraLevel2: 0,
      whiteNum2: 0,
    },
  });

  const onSubmit = async (values) => {
    let tmpSeed = Object.assign({}, seed, values);
    setSeed(tmpSeed);

    const formData = { ...tmpSeed };
    formData.userId = userId;
    formData.updateTime = new Date().getTime();
    formData.playerId0 = values.player0?.id;
    formData.playerId1 = values.player1?.id;
    formData.playerId2 = values.player2?.id;
    formData.supportId = values.support?.id;

    delete formData.support;
    delete formData.player0;
    delete formData.player1;
    delete formData.player2;

    ["0", "1", "2"].forEach((i) => {
      // Process blue factors
      if (formData[formData[`blue${i}`]] !== undefined) {
        formData[formData[`blue${i}`]] += formData[`blueLevel${i}`];
      } else {
        formData[formData[`blue${i}`]] = formData[`blueLevel${i}`];
      }

      // Process red factors
      if (formData[formData[`red${i}`]] !== undefined) {
        formData[formData[`red${i}`]] += formData[`redLevel${i}`];
      } else {
        formData[formData[`red${i}`]] = formData[`redLevel${i}`];
      }

      // Process white factors
      if (formData.white !== undefined) {
        formData.white += formData[`whiteNum${i}`];
      } else {
        formData.white = formData[`whiteNum${i}`];
      }

      // Process URA
      if (formData.uraLevel !== undefined) {
        formData.uraLevel += formData[`uraLevel${i}`];
      } else {
        formData.uraLevel = formData[`uraLevel${i}`];
      }
    });

    try {
      const res = await axios.post(
        "https://urarawin-worker.urarawin.workers.dev/api/sqlite/add",
        formData
      );
      if (res.data?.success) {
        toast.success("成功添加");
        onFinishProp();
      } else {
        toast.error("有地方出错了");
      }
    } catch (error) {
      toast.error("提交失败");
    }
  };

  const renderPlayerFields = () => {
    const labels = ["主要", "父辈1", "父辈2"];
    return labels.map((label, i) => (
      <div key={i} className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-medium">{label}</h3>

        <FormField
          control={form.control}
          name={`player${i}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>角色</FormLabel>
              <FormControl>
                <PlayerInput value={field.value} onChange={(value) => field.onChange(value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`blue${i}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>蓝色因子</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-wrap gap-2"
                >
                  {Object.entries(SEED_BLUE_LABELS).map(([value, label]) => (
                    <FormItem key={value} className="flex items-center space-x-1">
                      <FormControl>
                        <RadioGroupItem value={value} />
                      </FormControl>
                      <FormLabel className="font-normal">{label}</FormLabel>
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
          name={`blueLevel${i}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>蓝色因子星数</FormLabel>
              <FormControl>
                <div className="flex gap-1">
                  {[1, 2, 3].map((num) => (
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

        {/* Similar fields for red factors, green factors, URA, etc */}
        {/* ... */}

        <FormField
          control={form.control}
          name={`whiteNum${i}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>白色因子个数: {field.value}</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertTitle>
          目前每人只能配置一个种子 自觉维护自己的信息；第一次添加前先刷新 否则可能失败
        </AlertTitle>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{renderPlayerFields()}</div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="support"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>辅助卡</FormLabel>
                  <FormControl>
                    <SupportInput value={field.value} onChange={(value) => field.onChange(value)} />
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
                  <FormLabel>辅助卡突破</FormLabel>
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

            <FormField
              control={form.control}
              name="gameId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>玩家id</FormLabel>
                  <FormControl>
                    <Input placeholder="id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="server"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>区服</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex gap-2"
                    >
                      <FormItem className="flex items-center space-x-1">
                        <FormControl>
                          <RadioGroupItem value="zh-CN" />
                        </FormControl>
                        <FormLabel className="font-normal">简中</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1">
                        <FormControl>
                          <RadioGroupItem value="zh-TW" />
                        </FormControl>
                        <FormLabel className="font-normal">繁中</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1">
                        <FormControl>
                          <RadioGroupItem value="ja" />
                        </FormControl>
                        <FormLabel className="font-normal">日服</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">提交</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SeedInputForm;
