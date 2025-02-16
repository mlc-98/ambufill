import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const nationalIdTypeTable = pgTable("national_id_type", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").unique().notNull(),
    abbreviation: text("abbreviation").unique().notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const occupationTable = pgTable("occupation", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").unique().notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const genderTable = pgTable("gender", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").unique().notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const conditionTable = pgTable("condition", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").unique().notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
