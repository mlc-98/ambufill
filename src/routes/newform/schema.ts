/*import { z } from 'zod';

export const formSchema = z.object({
	username: z.string().min(2).max(50)
});

export type FormSchema = typeof formSchema;*/

import {
	alphabetical,
	alphabeticSpace,
	alphanumericPunctuation,
	numeric,
	plate
} from '$lib/regexp/regexp';
import { locationSchema } from '$lib/schema/location';
import { PersonSchema } from '$lib/schema/person';
import { minLengthMessage, UploadFile } from '$lib/schema/primitives';
import { z } from 'zod';

export const AmbulanceSchema = z.object({
	plate: z
		.string()
		.regex(plate, {
			message: 'Caracteres inválidos. Se permiten únicamente caracteres alfanuméricos'
		})
		.trim()
		.length(6, { message: 'La longitud debe ser de 6 caracteres' })
		.nonempty()
});

export const EpsSchema = z.object({
	id: z.string().uuid().nonempty(),
	name: z
		.string()
		.trim()
		.regex(alphanumericPunctuation)
		.min(1, { message: minLengthMessage })
		.max(100, { message: 'La longitud máxima es de 100 caracteres' })
});

// First section
export const emergencyCrewSchema = z.object({
	nursePersonalInfo: PersonSchema,
	driverPersonalInfo: PersonSchema,
	ambulanceInfo: AmbulanceSchema
});

// Second section
export const PatientSchema = z.object({
	personalInfo: PersonSchema,
	nationalIdPicture: UploadFile,
	gender: z
		.string()
		.regex(alphabeticSpace, {
			message: 'Caracteres inválidos. Se permiten únicamente caracteres alfabéticos'
		})
		.trim()
		.nonempty(),
	phone: z
		.string()
		.regex(numeric, { message: 'Caracteres inválidos. Se permiten únicamente digitos' })
		.trim()
		.length(10, { message: 'La longitud debe ser de 10 digitos' })
		.nonempty(),
	address: locationSchema,
	birthDate: z.string().date().nonempty(),
	condition: z
		.string()
		.trim()
		.regex(alphabetical, {
			message: 'Caracteres inválidos. Se permiten únicamente caracteres alfabéticos'
		})
		.nonempty(),
	eps: EpsSchema
});

// Third section
// Fourth section

// Final schema
export const formSchema = z.object({
	emergencyCrew: emergencyCrewSchema,
	patient: PatientSchema
});


export type EmergencyCrewSchema = typeof emergencyCrewSchema;
export type FormSchema = typeof formSchema;
