CREATE SCHEMA "auth";
--> statement-breakpoint
CREATE TABLE "city" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"province_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "city_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "company" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"nit" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "company_name_unique" UNIQUE("name"),
	CONSTRAINT "company_nit_unique" UNIQUE("nit")
);
--> statement-breakpoint
CREATE TABLE "condition" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "condition_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "crams_scale_base" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"factor" text NOT NULL,
	"value" smallint NOT NULL,
	"created_at" date DEFAULT now(),
	CONSTRAINT "crams_scale_base_factor_unique" UNIQUE("factor")
);
--> statement-breakpoint
CREATE TABLE "crams_scale" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"circulation_id" uuid NOT NULL,
	"respiration_id" uuid NOT NULL,
	"airway_id" uuid NOT NULL,
	"motor_id" uuid NOT NULL,
	"speech_id" uuid NOT NULL,
	"total" smallint NOT NULL,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "eps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" date DEFAULT now(),
	CONSTRAINT "eps_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "gender" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "gender_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "glasgow_coma_scale_base" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"factor" text NOT NULL,
	"value" smallint NOT NULL,
	"created_at" date DEFAULT now(),
	CONSTRAINT "glasgow_coma_scale_base_factor_unique" UNIQUE("factor")
);
--> statement-breakpoint
CREATE TABLE "glasgow_coma_scale" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"eye_id" uuid NOT NULL,
	"verbal_id" uuid NOT NULL,
	"motor_id" uuid NOT NULL,
	"total" smallint NOT NULL,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "patient_health_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"crams_scale_id" uuid NOT NULL,
	"glasgow_coma_scale_id" uuid NOT NULL,
	"pupil_reactivity_id" uuid NOT NULL,
	"physical_exam" text NOT NULL,
	"heart_rate" smallint NOT NULL,
	"breathing_frequency" smallint NOT NULL,
	"blood_pressure" smallint NOT NULL,
	"patient_living_condition_id" uuid,
	"triage_id" uuid,
	"urgency_status_id" uuid,
	"procedure" text[] NOT NULL,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "health_status_to_patient" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"patient_id" uuid NOT NULL,
	"health_status_id" uuid NOT NULL,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "incident" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"incident_time" time NOT NULL,
	"contact_time" time NOT NULL,
	"departure_time" time NOT NULL,
	"ips_arrival_time" time NOT NULL,
	"city_id" uuid NOT NULL,
	"zone_id" uuid NOT NULL,
	"description" text NOT NULL,
	"involved_vehicle_id" uuid NOT NULL,
	"receptor_ips" text NOT NULL,
	"receiver_first_name" text NOT NULL,
	"receiver_second_name" text,
	"receiver_first_surname" text NOT NULL,
	"receiver_second_surname" text,
	"receiver_national_id_type_id" uuid NOT NULL,
	"receiver_national_id_number" text NOT NULL,
	"receiver_role" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "involved_vehicle" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plate" text NOT NULL,
	"brand" text NOT NULL,
	"type_id" uuid NOT NULL,
	"ownership_picture_url" text NOT NULL,
	"soat_issuing_company_id" uuid,
	"soat_number" text NOT NULL,
	"soat_expiration_date" date NOT NULL,
	"soat_picture_url" text NOT NULL,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "known_ambulance" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plate" text NOT NULL,
	"brand" text NOT NULL,
	"model" text NOT NULL,
	"year" smallint NOT NULL,
	"created_at" date DEFAULT now(),
	CONSTRAINT "known_ambulance_plate_unique" UNIQUE("plate")
);
--> statement-breakpoint
CREATE TABLE "known_ambulance_to_company" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ambulance_id" uuid NOT NULL,
	"company_id" uuid NOT NULL,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "national_id_type" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"abbreviation" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "national_id_type_name_unique" UNIQUE("name"),
	CONSTRAINT "national_id_type_abbreviation_unique" UNIQUE("abbreviation")
);
--> statement-breakpoint
CREATE TABLE "occupation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "occupation_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "patient_living_condition" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"living_condition" text NOT NULL,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "patient" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"second_name" text,
	"first_surname" text NOT NULL,
	"second_surname" text,
	"national_id_type_id" uuid NOT NULL,
	"national_id_number" text NOT NULL,
	"national_id_picture_url" text NOT NULL,
	"gender_id" uuid,
	"phone" text NOT NULL,
	"city_id" uuid NOT NULL,
	"address" text NOT NULL,
	"birth_date" date NOT NULL,
	"condition_id" uuid NOT NULL,
	"eps_id" uuid NOT NULL,
	"physical_exam" text NOT NULL,
	"created_at" date DEFAULT now(),
	CONSTRAINT "patient_national_id_number_unique" UNIQUE("national_id_number")
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"second_name" text,
	"first_surname" text NOT NULL,
	"second_surname" text,
	"role_id" uuid,
	"national_id_type_id" uuid NOT NULL,
	"national_id_number" text NOT NULL,
	"company_id" uuid NOT NULL,
	"occupation_id" uuid NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "profile_national_id_number_unique" UNIQUE("national_id_number")
);
--> statement-breakpoint
ALTER TABLE "profile" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "province" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "province_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "pupil_reactivity_base" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"condition" text NOT NULL,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "role" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "role_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "soat_issuing_company" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" date DEFAULT now(),
	CONSTRAINT "soat_issuing_company_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "triage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"triage" text NOT NULL,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "urgency_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" text NOT NULL,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "auth"."users" (
	"id" uuid PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicle_type" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" date DEFAULT now(),
	CONSTRAINT "vehicle_type_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "zone" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "zone_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "city" ADD CONSTRAINT "city_province_id_province_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."province"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crams_scale" ADD CONSTRAINT "crams_scale_circulation_id_crams_scale_base_id_fk" FOREIGN KEY ("circulation_id") REFERENCES "public"."crams_scale_base"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crams_scale" ADD CONSTRAINT "crams_scale_respiration_id_crams_scale_base_id_fk" FOREIGN KEY ("respiration_id") REFERENCES "public"."crams_scale_base"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crams_scale" ADD CONSTRAINT "crams_scale_airway_id_crams_scale_base_id_fk" FOREIGN KEY ("airway_id") REFERENCES "public"."crams_scale_base"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crams_scale" ADD CONSTRAINT "crams_scale_motor_id_crams_scale_base_id_fk" FOREIGN KEY ("motor_id") REFERENCES "public"."crams_scale_base"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crams_scale" ADD CONSTRAINT "crams_scale_speech_id_crams_scale_base_id_fk" FOREIGN KEY ("speech_id") REFERENCES "public"."crams_scale_base"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "glasgow_coma_scale" ADD CONSTRAINT "glasgow_coma_scale_eye_id_glasgow_coma_scale_base_id_fk" FOREIGN KEY ("eye_id") REFERENCES "public"."glasgow_coma_scale_base"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "glasgow_coma_scale" ADD CONSTRAINT "glasgow_coma_scale_verbal_id_glasgow_coma_scale_base_id_fk" FOREIGN KEY ("verbal_id") REFERENCES "public"."glasgow_coma_scale_base"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "glasgow_coma_scale" ADD CONSTRAINT "glasgow_coma_scale_motor_id_glasgow_coma_scale_base_id_fk" FOREIGN KEY ("motor_id") REFERENCES "public"."glasgow_coma_scale_base"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_health_status" ADD CONSTRAINT "patient_health_status_crams_scale_id_crams_scale_id_fk" FOREIGN KEY ("crams_scale_id") REFERENCES "public"."crams_scale"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_health_status" ADD CONSTRAINT "patient_health_status_glasgow_coma_scale_id_glasgow_coma_scale_id_fk" FOREIGN KEY ("glasgow_coma_scale_id") REFERENCES "public"."glasgow_coma_scale"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_health_status" ADD CONSTRAINT "patient_health_status_pupil_reactivity_id_pupil_reactivity_base_id_fk" FOREIGN KEY ("pupil_reactivity_id") REFERENCES "public"."pupil_reactivity_base"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_health_status" ADD CONSTRAINT "patient_health_status_patient_living_condition_id_patient_living_condition_id_fk" FOREIGN KEY ("patient_living_condition_id") REFERENCES "public"."patient_living_condition"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_health_status" ADD CONSTRAINT "patient_health_status_triage_id_triage_id_fk" FOREIGN KEY ("triage_id") REFERENCES "public"."triage"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_health_status" ADD CONSTRAINT "patient_health_status_urgency_status_id_urgency_status_id_fk" FOREIGN KEY ("urgency_status_id") REFERENCES "public"."urgency_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "health_status_to_patient" ADD CONSTRAINT "health_status_to_patient_patient_id_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "health_status_to_patient" ADD CONSTRAINT "health_status_to_patient_health_status_id_patient_health_status_id_fk" FOREIGN KEY ("health_status_id") REFERENCES "public"."patient_health_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident" ADD CONSTRAINT "incident_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident" ADD CONSTRAINT "incident_zone_id_zone_id_fk" FOREIGN KEY ("zone_id") REFERENCES "public"."zone"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident" ADD CONSTRAINT "incident_involved_vehicle_id_involved_vehicle_id_fk" FOREIGN KEY ("involved_vehicle_id") REFERENCES "public"."involved_vehicle"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "involved_vehicle" ADD CONSTRAINT "involved_vehicle_type_id_vehicle_type_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."vehicle_type"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "involved_vehicle" ADD CONSTRAINT "involved_vehicle_soat_issuing_company_id_soat_issuing_company_id_fk" FOREIGN KEY ("soat_issuing_company_id") REFERENCES "public"."soat_issuing_company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "known_ambulance_to_company" ADD CONSTRAINT "known_ambulance_to_company_ambulance_id_known_ambulance_id_fk" FOREIGN KEY ("ambulance_id") REFERENCES "public"."known_ambulance"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "known_ambulance_to_company" ADD CONSTRAINT "known_ambulance_to_company_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient" ADD CONSTRAINT "patient_national_id_type_id_national_id_type_id_fk" FOREIGN KEY ("national_id_type_id") REFERENCES "public"."national_id_type"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient" ADD CONSTRAINT "patient_gender_id_gender_id_fk" FOREIGN KEY ("gender_id") REFERENCES "public"."gender"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient" ADD CONSTRAINT "patient_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient" ADD CONSTRAINT "patient_condition_id_condition_id_fk" FOREIGN KEY ("condition_id") REFERENCES "public"."condition"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient" ADD CONSTRAINT "patient_eps_id_eps_id_fk" FOREIGN KEY ("eps_id") REFERENCES "public"."eps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_national_id_type_id_national_id_type_id_fk" FOREIGN KEY ("national_id_type_id") REFERENCES "public"."national_id_type"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_occupation_id_occupation_id_fk" FOREIGN KEY ("occupation_id") REFERENCES "public"."occupation"("id") ON DELETE no action ON UPDATE no action;