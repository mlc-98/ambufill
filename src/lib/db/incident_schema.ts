import { desc, sql } from "drizzle-orm";
import { date, pgTable, text, time, uuid } from "drizzle-orm/pg-core";
import { cityTable, zoneTable } from "./address_schema";

export const incidentTable = pgTable("incident", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    date: date("date").notNull().defaultNow(),
    incidentTime: time("incident_time").notNull(),
    contactTime: time("contact_time").notNull(),
    departureTime: time("departure_time").notNull(),
    ipsArrivalTime: time("ips_arrival_time").notNull(),
    cityId: uuid("city_id")
        .references(() => cityTable.id)
        .notNull(),
    zoneId: uuid("zone_id")
        .references(() => zoneTable.id)
        .notNull(),
    description: text("description").notNull(),
    receptorIps: text("receptor_ips").notNull(),
    receiverFirstName: text("receiver_first_name").notNull(),
    receiverSecondName: text("receiver_second_name"),
    receiverFirstSurname: text("receiver_first_surname").notNull(),
    receiverSecondSurname: text("receiver_second_surname"),
    receiverNationalIdType: uuid("receiver_national_id_type_id").notNull(),
    receiverNationalIdNumber: text("receiver_national_id_number").notNull(),
    receiverRole: text("receiver_role").notNull(),
    // receiverSignature: bytea("receiver_signature").notNull(),
});
