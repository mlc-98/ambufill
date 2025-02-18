import { alphabeticSpace } from '$lib/regexp/regexp';
import { maxLengthMessage, minLengthMessage } from '$lib/schema/primitives';
import { z } from 'zod';

export const provinceSchema = z.object({
    provinceId: z.string().uuid().nonempty(),
    provinceName: z
        .string()
        .min(1, { message: minLengthMessage })
        .max(50, { message: maxLengthMessage })
        .regex(alphabeticSpace)
});

export const citySchema = z.object({
    cityId: z.string().uuid().nonempty(),
    cityName: z
        .string()
        .min(1, { message: minLengthMessage })
        .max(50, { message: maxLengthMessage })
        .regex(alphabeticSpace)
});

export const locationSchema = z.object({
    province: provinceSchema,
    city: citySchema,
    address: z
        .string()
        .min(1, { message: minLengthMessage })
        .max(100, { message: 'La longitud máxima es de 100 caracteres' }),
    zone: z.string().nonempty()
});
