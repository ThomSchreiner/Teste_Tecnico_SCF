import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  job: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  job: z.string(),
  email: z.string().email(),
  readed: z.number(),
});

export const userListSchema = z.array(userSchema);
