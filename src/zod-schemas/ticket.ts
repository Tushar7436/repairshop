import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "@/db/schema";
import { z } from "zod"

export const insertTicketSchema = createInsertSchema(tickets, {
    id: z.union([z.number(), z.literal("(New)")]),
    title: (z) => z.min(1, "Title is required"),
    description: (z) => z.min(1, "Description is required"),
    tech: (z) => z.email("Invalid email address"),
})

export const selectTicketSchema = createSelectSchema(tickets)

export type insertTicketSchemaType = typeof insertTicketSchema._type

export type selectTicketSchemaType = typeof selectTicketSchema._type
