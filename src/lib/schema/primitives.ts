import { alphabeticSpace, numeric } from '$lib/regexp/regexp';
import { z } from 'zod';

export const minLengthMessage = 'La longitud mínima es de 1 caracter';
export const maxLengthMessage = 'La longitud máxima es de 50 caracteres';

// Basic types that will be reused
export const requiredName = z
	.string()
	.min(1, { message: minLengthMessage })
	.max(50, { message: maxLengthMessage })
	.regex(alphabeticSpace, {
		message: 'Caracteres inválidos. Se permiten únicamente letras y espacios'
	})
	.trim();
export const optionalName = z
	.string()
	.max(50, { message: maxLengthMessage })
	.regex(alphabeticSpace, {
		message: 'Caracteres inválidos. Se permiten únicamente letras y espacios'
	})
	.trim()
	.optional();
export const nationalIdType = z.object({
	id: z.string().uuid().nonempty(),
	name: z.string(),
	abbreviation: z.string()
});
export const nationalIdNumber = z
	.string()
	.min(1, { message: minLengthMessage })
	.max(50, { message: maxLengthMessage })
	.trim()
	.regex(numeric, { message: 'Caracteres inválidos. Se permiten únicamente digitos' });

export const UploadFile = z
	.instanceof(File, { message: 'Por favor, añade un archivo' })
	.refine((f) => f.size < 5_000_000, 'Tamaño máximo permitido: 5MB');
