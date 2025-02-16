import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const provinceTable = pgTable("province", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").unique().notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const cityTable = pgTable("city", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").unique().notNull(),
    provinceId: uuid("province_id")
        .references(() => provinceTable.id)
        .notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
