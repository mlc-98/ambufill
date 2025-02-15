CREATE TABLE "city" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"province_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"status" boolean DEFAULT true NOT NULL,
	CONSTRAINT "company_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "eps" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "eps_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "national_id_type" (
	"id" uuid PRIMARY KEY NOT NULL,
	"abbreviation" text NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "patient_health" (
	"id" uuid PRIMARY KEY NOT NULL,
	"physical_evaluation" text NOT NULL,
	"pupil_dilation" text NOT NULL,
	"urgency_reason" text NOT NULL,
	"lesion_location" text NOT NULL,
	"lesion_type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "patient" (
	"id" uuid NOT NULL,
	"first_name" text NOT NULL,
	"second_name" text,
	"first_surname" text NOT NULL,
	"second_surname" text,
	"national_id_number" text NOT NULL,
	"national_id_picture" text NOT NULL,
	"gender" text NOT NULL,
	"phone" integer NOT NULL,
	"address" text NOT NULL,
	"city_id" uuid NOT NULL,
	"birth_date" date NOT NULL,
	"condition" text NOT NULL,
	"eps_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "patient_national_id_picture_unique" UNIQUE("national_id_picture")
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" uuid NOT NULL,
	"first_name" text NOT NULL,
	"second_name" text,
	"first_surname" text NOT NULL,
	"second_surname" text,
	"national_id_number" text NOT NULL,
	"company_id" uuid NOT NULL,
	"status" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "profile_national_id_number_unique" UNIQUE("national_id_number")
);
--> statement-breakpoint
CREATE TABLE "province" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "province_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "role" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	CONSTRAINT "role_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "city" ADD CONSTRAINT "city_province_id_province_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."province"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient" ADD CONSTRAINT "patient_id_role_id_fk" FOREIGN KEY ("id") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient" ADD CONSTRAINT "patient_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient" ADD CONSTRAINT "patient_eps_id_eps_id_fk" FOREIGN KEY ("eps_id") REFERENCES "public"."eps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_id_role_id_fk" FOREIGN KEY ("id") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE no action ON UPDATE no action;