import { boolean, date, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth";

/* 
Table modelling the different national IDs that can be used.
CC - Cedula de ciudadania
CE - Cedula de extranjeria
TI - Tarjeta de identidad
RC - Registro civil
PA - Pasaporte
*/
export const nationalIdTypeTable = pgTable("national_id_type", {
    id: uuid("id").primaryKey(),
    abbreviation: text("abbreviation").notNull(),
    name: text("name").notNull(),
});

/*
Table modeling roles.
dev - users authorized to create, read, update and delete records from all
    the other collections
admin - users authorized to create, read and update records from users that
    aren't devs or admins
operator - users authorized to read their own profile
*/
export const roleTable = pgTable("role", {
    id: uuid("id").primaryKey(),
    name: text("name").unique(),
});

/*
Table modelling companies.
*/
export const companyTable = pgTable("company", {
    id: uuid("id").primaryKey(),
    name: text("name").notNull().unique(),
    status: boolean("status").notNull().default(true),
});

/*
Table modelling profiles for each user. It must reference an user from
the auth table, and a role.
*/
export const profileTable = pgTable("profile", {
    id: uuid("id").primaryKey().references(() => users.id, {onDelete: "cascade"}).notNull(),
    firstName: text("first_name").notNull(),
    secondName: text("second_name"),
    firstSurname: text("first_surname").notNull(),
    secondSurname: text("second_surname"),
    nationalIdType: uuid("id").references(() => roleTable.id).notNull(),
    nationalIdNumber: text("national_id_number").notNull().unique(),
    companyId: uuid("company_id").references(() => companyTable.id).notNull(),
    status: boolean("status").notNull().default(true).notNull(), 
    createdAt: timestamp("created_at").defaultNow(),
});

/*
    FORM SCHEMA
*/

export const provinceTable = pgTable("province", {
    id: uuid("id").primaryKey(),
    name: text("name").notNull().unique(),
});

export const cityTable = pgTable("city", {
    id: uuid("id").primaryKey(),
    name: text("name").notNull(),
    provinceId: uuid("province_id").references(() => provinceTable.id).notNull(),
});

export const epsTable = pgTable("eps", {
    id: uuid("id").primaryKey(),
    name: text("name").notNull().unique(),
});

export const patientTable = pgTable("patient", {
    id: uuid("id").primaryKey(),
    firstName: text("first_name").notNull(),
    secondName: text("second_name"),
    firstSurname: text("first_surname").notNull(),
    secondSurname: text("second_surname"),
    nationalIdType: uuid("id").references(() => roleTable.id).notNull(),
    nationalIdNumber: text("national_id_number").notNull(),
    nationalIdPicture: text("national_id_picture").notNull().unique(), // references the link to media
    gender: text("gender").notNull(), // M, F, NB, T, Otro
    phone: integer("phone").notNull(),
    address: text("address").notNull(),
    cityId: uuid("city_id").references(() => cityTable.id).notNull(), // no need for province id, city table already has it
    birthDate: date("birth_date").notNull(),
    condition: text("condition").notNull(), // Conductor, pasajero, peaton, ciclista
    epsId: uuid("eps_id").references(() => epsTable.id).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const patientHealthTable = pgTable("patient_health", {
    id: uuid("id").primaryKey(),
    physicalEvaluation: text("physical_evaluation").notNull(),
    pupilDilation: text("pupil_dilation").notNull(), // normal, anisocoria, miosis, midriasis
    urgencyReason: text("urgency_reason").notNull(),
    lesionLocation: text("lesion_location").notNull(), // images ??
    lesionType: text("lesion_type").notNull(),
});