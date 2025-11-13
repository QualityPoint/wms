import { z } from "zod";
import type { Customer } from "../types/Selling/Customer";

export const customersSchema: z.ZodType<Customer> = z.object({
  name: z.string(),
  email_id: z.string(),
  customer_name: z.string(),
  customer_type: z.enum(["Company", "Individual", "Partnership"]),
  creation: z.string(),
  modified: z.string(),
  owner: z.string(),
  modified_by: z.string(),
  docstatus: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  first_name: z.string(),
  last_name: z.string(),
  full_name: z.string().optional(),
  enabled: z.union([z.literal(0), z.literal(1)]),
  user_type: z.enum(["Website User", "System User"]),
  middle_name: z.string().optional(),
  username: z.string().optional(),
  phone: z.string().optional(),
  mobile_no: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  gender: z.string().optional(),
});
