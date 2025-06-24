import { z } from "zod";

export const seedFormSchema = z.object({
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
  blue0: z.enum(["speed", "stamina", "power", "guts", "wisdom"]),
  blueLevel0: z.number().min(0).max(3),
  red0: z.enum([
    "grass", "dirt",
    "shortDistance", "mile", "mediumDistance", "longDistance",
    "escapeR", "leadingR", "insertR", "trackingR"
  ]),
  redLevel0: z.number().min(0).max(3),
  greenLevel0: z.number().min(0).max(3),
  uraLevel0: z.number().min(0).max(3),
  whiteNum0: z.number().min(0).max(10),
  // 为简洁起见，省略其他字段...
  support: z.object({
    id: z.string(),
    imgUrl: z.string().optional(),
  }),
  supportLevel: z.number().min(0).max(4),
  gameId: z.string().regex(/^[0-9]\d*$/, "输入正确的id"),
  server: z.enum(["zh-CN", "zh-TW", "ja"]),
});

export type SeedFormValues = z.infer<typeof seedFormSchema>;
