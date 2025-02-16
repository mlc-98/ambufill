import { sql } from "drizzle-orm";
import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import {
    conditionTable,
    genderTable,
    nationalIdTypeTable,
} from "./person_schema";
import { cityTable } from "./address_schema";

export const epsTable = pgTable("eps", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").unique().notNull(),
    createdAt: date("created_at").defaultNow(),
});

export const patientTable = pgTable("patient", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    firstName: text("first_name").notNull(),
    secondName: text("second_name"),
    firstSurname: text("first_surname").notNull(),
    secondSurname: text("second_surname"),
    nationalIdTypeId: uuid("national_id_type_id")
        .references(() => nationalIdTypeTable.id)
        .notNull(),
    nationalIdNumber: text("national_id_number").notNull().unique(),
    nationalIdPictureUrl: text("national_id_picture_url").notNull(),
    genderId: uuid("gender_id").references(() => genderTable.id),
    phone: text("phone").notNull(),
    cityId: uuid("city_id")
        .references(() => cityTable.id)
        .notNull(),
    address: text("address").notNull(),
    birthDate: date("birth_date").notNull(),
    conditionId: uuid("condition_id")
        .references(() => conditionTable.id)
        .notNull(),
    epsId: uuid("eps_id")
        .references(() => epsTable.id)
        .notNull(),
    physicalExam: text("physical_exam").notNull(),
    createdAt: date("created_at").defaultNow(),
});
