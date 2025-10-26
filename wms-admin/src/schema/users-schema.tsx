import { z } from "zod";
import type { User } from "../types/Core/User";

export const userSchema: z.ZodType<User> = z.object({
  name: z.string(),
  email: z.string(),
  full_name: z.string().optional(),
  enabled: z.union([z.literal(0), z.literal(1)]).optional(),
  user_type: z.string().optional(),
  creation: z.string(),
  modified: z.string(),
  owner: z.string(),
  modified_by: z.string(),
  docstatus: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  first_name: z.string(),
  last_name: z.string(),
  middle_name: z.string().optional(),
  username: z.string().optional(),
  phone: z.string().optional(),
  mobile_no: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  gender: z.string().optional(),
});
