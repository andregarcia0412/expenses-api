import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().max(255),
  password: z.string().max(72),
});
