import { z } from "zod";
import type { Lead } from "../types/CRM/Lead";

const statusValues = [
  "Lead",
  "Open",
  "Replied",
  "Opportunity",
  "Quotation",
  "Lost Quotation",
  "Interested",
  "Converted",
  "Do Not Contact"
] as const;

export const leadSchema: z.ZodType<Lead> = z.object({
  name: z.string(),
  email: z.string(),
  creation: z.string(),
  modified: z.string(),
  owner: z.string(),
  modified_by: z.string(),
  docstatus: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  first_name: z.string(),
  last_name: z.string(),
  lead_name: z.string(),
  email_id: z.string(),
  phone: z.string().optional(),
  mobile_no: z.string().optional(),
  gender: z.string().optional(),
  status: z.enum(statusValues),
});
