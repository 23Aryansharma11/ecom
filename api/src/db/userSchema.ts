import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default("user"),

  name: varchar({ length: 255 }).notNull(),
  address: text(),
});

export const createUserSchema = createInsertSchema(usersTable).omit({
  role: true,
});

export const loginUserSchema = createInsertSchema(usersTable).pick({
  email: true,
  password: true,
});
