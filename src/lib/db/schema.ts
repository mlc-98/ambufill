import { sql } from 'drizzle-orm';
import {
	boolean,
	date,
	pgSchema,
	pgTable,
	smallint,
	text,
	time,
	timestamp,
	uuid
} from 'drizzle-orm/pg-core';

export const provinceTable = pgTable('province', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').unique().notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const cityTable = pgTable('city', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').unique().notNull(),
	provinceId: uuid('province_id')
		.references(() => provinceTable.id)
		.notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const zoneTable = pgTable('zone', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').unique().notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const auth = pgSchema('auth');

export const users = auth.table('users', {
	id: uuid('id').primaryKey() // Matches Supabase's auth.users.id
});

export const roleTable = pgTable('role', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').unique().notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const profileTable = pgTable('profile', {
	id: uuid('id')
		.primaryKey()
		.references(() => users.id, { onDelete: 'cascade' }),
	firstName: text('first_name').notNull(),
	secondName: text('second_name'),
	firstSurname: text('first_surname').notNull(),
	secondSurname: text('second_surname'),
	roleId: uuid('role_id').references(() => roleTable.id),
	nationalIdType: uuid('national_id_type_id')
		.references(() => nationalIdTypeTable.id)
		.notNull(),
	nationalIdNumber: text('national_id_number').notNull().unique(),
	companyId: uuid('company_id')
		.references(() => companyTable.id)
		.notNull(),
	occupationId: uuid('occupation_id')
		.references(() => occupationTable.id)
		.notNull(),
	isActive: boolean('is_active').notNull().default(true).notNull(),
	createdAt: timestamp('created_at').defaultNow()
}).enableRLS();

export const companyTable = pgTable('company', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').unique().notNull(),
	nit: text('nit').unique().notNull(),
	isActive: boolean('is_active').notNull().default(true),
	createdAt: date('created_at')
		.notNull()
		.default(sql`now()`)
});

export const glasgowComaScaleBaseTable = pgTable('glasgow_coma_scale_base', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	factor: text('factor').unique().notNull(),
	value: smallint('value').notNull(),
	createdAt: date('created_at').defaultNow()
});

export const glasgowComaScaleTable = pgTable('glasgow_coma_scale', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	eyeId: uuid('eye_id')
		.references(() => glasgowComaScaleBaseTable.id)
		.notNull(),
	verbal_id: uuid('verbal_id')
		.references(() => glasgowComaScaleBaseTable.id)
		.notNull(),
	motor_id: uuid('motor_id')
		.references(() => glasgowComaScaleBaseTable.id)
		.notNull(),
	total: smallint('total').notNull(),
	createdAt: date('created_at').defaultNow()
});

export const cramsScaleBaseTable = pgTable('crams_scale_base', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	factor: text('factor').unique().notNull(),
	value: smallint('value').notNull(),
	createdAt: date('created_at').defaultNow()
});

export const cramsScaleTable = pgTable('crams_scale', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	circulationId: uuid('circulation_id')
		.references(() => cramsScaleBaseTable.id)
		.notNull(),
	respirationId: uuid('respiration_id')
		.references(() => cramsScaleBaseTable.id)
		.notNull(),
	airwayId: uuid('airway_id')
		.references(() => cramsScaleBaseTable.id)
		.notNull(),
	motorId: uuid('motor_id')
		.references(() => cramsScaleBaseTable.id)
		.notNull(),
	speechId: uuid('speech_id')
		.references(() => cramsScaleBaseTable.id)
		.notNull(),
	total: smallint('total').notNull(),
	createdAt: date('created_at').defaultNow()
});

export const pupilReactivityBaseTable = pgTable('pupil_reactivity_base', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	condition: text('condition').notNull(),
	createdAt: date('created_at').defaultNow()
});
// NOTE: pupilReactivityTable is not used in the schema,
// because it only has one factor, unlike the other scales

export const patientLivingConditionTable = pgTable('patient_living_condition', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	livingCondition: text('living_condition').notNull(),
	createdAt: date('created_at').defaultNow()
});

export const triageTable = pgTable('triage', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	triage: text('triage').notNull(),
	createdAt: date('created_at').defaultNow()
});

export const urgencyStatusTable = pgTable('urgency_status', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	status: text('status').notNull(),
	createdAt: date('created_at').defaultNow()
});

// TODO: Create junction table for procedures and patient_health_status

export const healthStatusTable = pgTable('patient_health_status', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	cramsScaleId: uuid('crams_scale_id')
		.references(() => cramsScaleTable.id)
		.notNull(),
	glasgowComaScaleId: uuid('glasgow_coma_scale_id')
		.references(() => glasgowComaScaleTable.id)
		.notNull(),
	pupilReactivityId: uuid('pupil_reactivity_id')
		.references(() => pupilReactivityBaseTable.id)
		.notNull(),
	physicalExam: text('physical_exam').notNull(),
	heartRate: smallint('heart_rate').notNull(),
	breathingFrequency: smallint('breathing_frequency').notNull(),
	bloodPressure: smallint('blood_pressure').notNull(),
	patientLivingConditionId: uuid('patient_living_condition_id').references(
		() => patientLivingConditionTable.id
	),
	triageId: uuid('triage_id').references(() => triageTable.id),
	urgencyStatusId: uuid('urgency_status_id').references(() => urgencyStatusTable.id),
	procedure: text('procedure').array().notNull(),
	createdAt: date('created_at').defaultNow()
});

export const healthStatusToPatientTable = pgTable('health_status_to_patient', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	patientId: uuid('patient_id')
		.references(() => patientTable.id)
		.notNull(),
	healthStatusId: uuid('health_status_id')
		.references(() => healthStatusTable.id)
		.notNull(),
	createdAt: date('created_at').defaultNow()
});

export const incidentTable = pgTable('incident', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	date: date('date').notNull().defaultNow(),
	incidentTime: time('incident_time').notNull(),
	contactTime: time('contact_time').notNull(),
	departureTime: time('departure_time').notNull(),
	ipsArrivalTime: time('ips_arrival_time').notNull(),
	cityId: uuid('city_id')
		.references(() => cityTable.id)
		.notNull(),
	zoneId: uuid('zone_id')
		.references(() => zoneTable.id)
		.notNull(),
	description: text('description').notNull(),
	involvedVehicleId: uuid('involved_vehicle_id')
		.references(() => involvedVehicleTable.id)
		.notNull(),
	receptorIps: text('receptor_ips').notNull(),
	receiverFirstName: text('receiver_first_name').notNull(),
	receiverSecondName: text('receiver_second_name'),
	receiverFirstSurname: text('receiver_first_surname').notNull(),
	receiverSecondSurname: text('receiver_second_surname'),
	receiverNationalIdType: uuid('receiver_national_id_type_id').notNull(),
	receiverNationalIdNumber: text('receiver_national_id_number').notNull(),
	receiverRole: text('receiver_role').notNull()
	// receiverSignature: bytea("receiver_signature").notNull(),
});

export const epsTable = pgTable('eps', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').unique().notNull(),
	createdAt: date('created_at').defaultNow()
});

export const patientTable = pgTable('patient', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	firstName: text('first_name').notNull(),
	secondName: text('second_name'),
	firstSurname: text('first_surname').notNull(),
	secondSurname: text('second_surname'),
	nationalIdTypeId: uuid('national_id_type_id')
		.references(() => nationalIdTypeTable.id)
		.notNull(),
	nationalIdNumber: text('national_id_number').notNull().unique(),
	nationalIdPictureUrl: text('national_id_picture_url').notNull(),
	genderId: uuid('gender_id').references(() => genderTable.id),
	phone: text('phone').notNull(),
	cityId: uuid('city_id')
		.references(() => cityTable.id)
		.notNull(),
	address: text('address').notNull(),
	birthDate: date('birth_date').notNull(),
	conditionId: uuid('condition_id')
		.references(() => conditionTable.id)
		.notNull(),
	epsId: uuid('eps_id')
		.references(() => epsTable.id)
		.notNull(),
	physicalExam: text('physical_exam').notNull(),
	createdAt: date('created_at').defaultNow()
});

export const nationalIdTypeTable = pgTable('national_id_type', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').unique().notNull(),
	abbreviation: text('abbreviation').unique().notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const occupationTable = pgTable('occupation', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').unique().notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const genderTable = pgTable('gender', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').unique().notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const conditionTable = pgTable('condition', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').unique().notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const knownAmbulanceTable = pgTable('known_ambulance', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	plate: text('plate').notNull().unique(),
	brand: text('brand').notNull(),
	model: text('model').notNull(),
	year: smallint('year').notNull(),
	createdAt: date('created_at').defaultNow()
});

export const knownAmbulanceToCompanyTable = pgTable('known_ambulance_to_company', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	ambulanceId: uuid('ambulance_id')
		.references(() => knownAmbulanceTable.id)
		.notNull(),
	companyId: uuid('company_id')
		.references(() => companyTable.id)
		.notNull(),
	createdAt: date('created_at').defaultNow()
});

export const vehicleTypeTable = pgTable('vehicle_type', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').notNull().unique(),
	createdAt: date('created_at').defaultNow()
});

export const soatIssuingCompanyTable = pgTable('soat_issuing_company', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').notNull().unique(),
	createdAt: date('created_at').defaultNow()
});

export const involvedVehicleTable = pgTable('involved_vehicle', {
	id: uuid('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	plate: text('plate').notNull(),
	brand: text('brand').notNull(),
	type: uuid('type_id')
		.references(() => vehicleTypeTable.id)
		.notNull(),
	ownershipPictureUrl: text('ownership_picture_url').notNull(),
	soatIssuingCompanyId: uuid('soat_issuing_company_id').references(
		() => soatIssuingCompanyTable.id
	),
	soatNumber: text('soat_number').notNull(),
	soatExpirationDate: date('soat_expiration_date').notNull(),
	soatPictureUrl: text('soat_picture_url').notNull(),
	createdAt: date('created_at').defaultNow()
});
