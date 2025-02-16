import { sql } from "drizzle-orm";
import { date, pgTable, smallint, text, uuid } from "drizzle-orm/pg-core";
import { companyTable } from "./company_schema";

export const knownAmbulanceTable = pgTable("known_ambulance", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    plate: text("plate").notNull().unique(),
    brand: text("brand").notNull(),
    model: text("model").notNull(),
    year: smallint("year").notNull(),
    createdAt: date("created_at").defaultNow(),
});

export const knownAmbulanceToCompanyTable = pgTable(
    "known_ambulance_to_company",
    {
        id: uuid("id")
            .primaryKey()
            .default(sql`gen_random_uuid()`),
        ambulanceId: uuid("ambulance_id")
            .references(() => knownAmbulanceTable.id)
            .notNull(),
        companyId: uuid("company_id")
            .references(() => companyTable.id)
            .notNull(),
        createdAt: date("created_at").defaultNow(),
    },
);
