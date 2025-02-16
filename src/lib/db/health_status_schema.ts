import { sql } from "drizzle-orm";
import { date, pgTable, smallint, text, uuid } from "drizzle-orm/pg-core";
import { patientTable } from "./patient_schema";

export const glasgowComaScaleBaseTable = pgTable("glasgow_coma_scale_base", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    factor: text("factor").unique().notNull(),
    value: smallint("value").notNull(),
    createdAt: date("created_at").defaultNow(),
});

export const glasgowComaScaleTable = pgTable("glasgow_coma_scale", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    eyeId: uuid("eye_id")
        .references(() => glasgowComaScaleBaseTable.id)
        .notNull(),
    verbal_id: uuid("verbal_id")
        .references(() => glasgowComaScaleBaseTable.id)
        .notNull(),
    motor_id: uuid("motor_id")
        .references(() => glasgowComaScaleBaseTable.id)
        .notNull(),
    total: smallint("total").notNull(),
    createdAt: date("created_at").defaultNow(),
});

export const cramsScaleBaseTable = pgTable("crams_scale_base", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    factor: text("factor").unique().notNull(),
    value: smallint("value").notNull(),
    createdAt: date("created_at").defaultNow(),
});

export const cramsScaleTable = pgTable("crams_scale", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    circulationId: uuid("circulation_id")
        .references(() => cramsScaleBaseTable.id)
        .notNull(),
    respirationId: uuid("respiration_id")
        .references(() => cramsScaleBaseTable.id)
        .notNull(),
    airwayId: uuid("airway_id")
        .references(() => cramsScaleBaseTable.id)
        .notNull(),
    motorId: uuid("motor_id")
        .references(() => cramsScaleBaseTable.id)
        .notNull(),
    speechId: uuid("speech_id")
        .references(() => cramsScaleBaseTable.id)
        .notNull(),
    total: smallint("total").notNull(),
    createdAt: date("created_at").defaultNow(),
});

export const pupilReactivityBaseTable = pgTable("pupil_reactivity_base", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    condition: text("condition").notNull(),
    createdAt: date("created_at").defaultNow(),
});
// NOTE: pupilReactivityTable is not used in the schema,
// because it only has one factor, unlike the other scales

export const patientLivingConditionTable = pgTable("patient_living_condition", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    livingCondition: text("living_condition").notNull(),
    createdAt: date("created_at").defaultNow(),
});

export const triageTable = pgTable("triage", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    triage: text("triage").notNull(),
    createdAt: date("created_at").defaultNow(),
});

export const urgencyStatusTable = pgTable("urgency_status", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    status: text("status").notNull(),
    createdAt: date("created_at").defaultNow(),
});

// TODO: Create junction table for procedures and patient_health_status

export const patientHealthStatusTable = pgTable("patient_health_status", {
    id: uuid("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    patientId: uuid("patient_id")
        .references(() => patientTable.id)
        .notNull(),
    cramsScaleId: uuid("crams_scale_id")
        .references(() => cramsScaleTable.id)
        .notNull(),
    glasgowComaScaleId: uuid("glasgow_coma_scale_id")
        .references(() => glasgowComaScaleTable.id)
        .notNull(),
    pupilReactivityId: uuid("pupil_reactivity_id")
        .references(() => pupilReactivityBaseTable.id)
        .notNull(),
    physicalExam: text("physical_exam").notNull(),
    heartRate: smallint("heart_rate").notNull(),
    breathingFrequency: smallint("breathing_frequency").notNull(),
    bloodPressure: smallint("blood_pressure").notNull(),
    patientLivingConditionId: uuid("patient_living_condition_id").references(
        () => patientLivingConditionTable.id,
    ),
    triageId: uuid("triage_id").references(() => triageTable.id),
    urgencyStatusId: uuid("urgency_status_id").references(
        () => urgencyStatusTable.id,
    ),
    procedure: text("procedure").array().notNull(),
    createdAt: date("created_at").defaultNow(),
});
