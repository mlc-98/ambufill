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

export const vehicleTypeTable = pgTable("vehicle_type", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").notNull().unique(),
    createdAt: date("created_at").defaultNow(),
});

export const soatIssuingCompanyTable = pgTable("soat_issuing_company", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").notNull().unique(),
    createdAt: date("created_at").defaultNow(),
});

export const involvedVehicleTable = pgTable("involved_vehicle", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    plate: text("plate").notNull(),
    brand: text("brand").notNull(),
    type: uuid("type_id")
        .references(() => vehicleTypeTable.id)
        .notNull(),
    ownershipPictureUrl: text("ownership_picture_url").notNull(),
    soatIssuingCompanyId: uuid("soat_issuing_company_id").references(
        () => soatIssuingCompanyTable.id,
    ),
    soatNumber: text("soat_number").notNull(),
    soatExpirationDate: date("soat_expiration_date").notNull(),
    soatPictureUrl: text("soat_picture_url").notNull(),
    createdAt: date("created_at").defaultNow(),
});
