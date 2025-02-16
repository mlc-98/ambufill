import { sql } from "drizzle-orm";
import {
    boolean,
    pgSchema,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";
import { companyTable } from "./company_schema";
import { nationalIdTypeTable, occupationTable } from "./person_schema";

export const auth = pgSchema("auth");

export const users = auth.table("users", {
    id: uuid("id").primaryKey(), // Matches Supabase's auth.users.id
});

export const roleTable = pgTable("role", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").unique().notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const profileTable = pgTable("profile", {
    id: uuid("id")
        .primaryKey()
        .references(() => users.id, { onDelete: "cascade" }),
    firstName: text("first_name").notNull(),
    secondName: text("second_name"),
    firstSurname: text("first_surname").notNull(),
    secondSurname: text("second_surname"),
    roleId: uuid("role_id").references(() => roleTable.id),
    nationalIdType: uuid("national_id_type_id")
        .references(() => nationalIdTypeTable.id)
        .notNull(),
    nationalIdNumber: text("national_id_number").notNull().unique(),
    companyId: uuid("company_id")
        .references(() => companyTable.id)
        .notNull(),
    occupationId: uuid("occupation_id")
        .references(() => occupationTable.id)
        .notNull(),
    isActive: boolean("is_active").notNull().default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
