import { z } from 'zod';
import { alphanumeric, alphanumericPunctuation } from '$lib/regexp/regexp';
import { personSchema } from './person_schema';

export const companySchema = z.object({
    id: z.string().uuid().nonempty(),
    name: z.string().min(1).max(255).regex(alphanumericPunctuation).trim(),
    isActive: z.boolean().default(true)
});

export const nurseInfoSchema = z.object({
    personalInformation: personSchema,
    companyId: z.string().uuid().nonempty()
});

export const driverInfoSchema = z.object({
    personalInfo: personSchema,
    companyId: z.string().uuid().nonempty()
});

export const ambulanceSchema = z.object({
    id: z.string().uuid().nonempty(),
    companyId: z.string().uuid().nonempty(),
    plate: z.string().length(6).regex(alphanumeric).trim()
});
