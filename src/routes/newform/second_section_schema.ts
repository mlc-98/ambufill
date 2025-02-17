import { z } from 'zod';
import { personSchema } from './person_schema';
import { numeric } from '$lib/regexp/regexp';
import { locationSchema } from './location_schema';

export const patientSchema = z.object({
    personalInfo: personSchema,
    nationalIdPicture: z.string().url().nonempty(),
    gender: z.string().min(1).max(50),
    phone: z
        .string()
        .min(1)
        .max(50)
        .regex(numeric, { message: 'Caracteres inválidos. Se permiten únicamente digitos.' }),
    address: locationSchema,
    bithDate: z.string().date().nonempty()
});
