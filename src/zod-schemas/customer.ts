import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { customers } from "@/db/schema";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (z) => z.min(1, "First name is required"),
  lastName: (z) => z.min(1, "Last name is required"),
  address1: (z) => z.min(1, "Address is required"),
  city: (z) => z.min(1, "City is required"),
  state: (z) => z.length(2, "State must be exactly 2 characters"),
  email: (z) => z.email("Invalid email address"),
  zip: (z) =>
    z.regex(/^\d{5}(-\d{4})?$/, "Invalid Zip code. Use 5 or 5+4 digits"),
  phone: (z) =>
    z.regex(/^(?:\+91|91)?[6-9]\d{9}$/, "Invalid phone number format"),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;
export type selectCustomerSchemaType = typeof selectCustomerSchema._type;
