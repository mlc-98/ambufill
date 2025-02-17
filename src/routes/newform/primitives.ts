import { alphabeticSpace, numeric } from '$lib/regexp/regexp';
import { z } from 'zod';

// Basic types that will be reused
export const requiredName = z
    .string()
    .min(1)
    .max(50)
    .regex(alphabeticSpace, {
        message: 'Caracteres inválidos. Se permiten únicamente letras y espacios.'
    })
    .trim();
export const optionalName = z
    .string()
    .max(50)
    .regex(alphabeticSpace, {
        message: 'Caracteres inválidos. Se permiten únicamente letras y espacios.'
    })
    .trim()
    .optional();
export const nationalIdType = z.string().uuid().nonempty().trim();
export const nationalIdNumber = z.string().min(1).max(50).trim().regex(numeric).nonempty();

export const file = z
    .instanceof(File, { message: 'Por favor, añade un archivo' })
    .refine((f) => f.size < 5_000_000, 'Tamaño máximo permitido: 5MB');
