import { pgSchema, pgTable, uuid } from "drizzle-orm/pg-core";

export const auth = pgSchema("auth");

export const users = auth.table("users", {
    id: uuid("id").primaryKey(), // Matches Supabase's auth.users.id
});