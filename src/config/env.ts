import "dotenv/config";
import { z } from "zod/v4";

const envSchema = z.object({
  TZ: z.string(),
  PORT: z.coerce.number(),
  HOST: z.string(),
  APP_KEY: z.string().min(1),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

export const env = envSchema.parse(process.env);
