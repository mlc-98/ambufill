import { sql } from "drizzle-orm";
import { boolean, date, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const companyTable = pgTable("company", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").unique().notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: date("created_at")
        .notNull()
        .default(sql`now()`),
});
