import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  metadata: jsonb("metadata"),
});

export const toolUsage = pgTable("tool_usage", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  toolId: integer("tool_id").notNull(),
  sessionId: text("session_id"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  processingTime: integer("processing_time"),
  success: boolean("success").default(true).notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export const insertToolSchema = createInsertSchema(tools).omit({
  id: true,
});

export const insertToolUsageSchema = createInsertSchema(toolUsage).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Tool = typeof tools.$inferSelect;
export type ToolUsage = typeof toolUsage.$inferSelect;
export type InsertTool = z.infer<typeof insertToolSchema>;
export type InsertToolUsage = z.infer<typeof insertToolUsageSchema>;
