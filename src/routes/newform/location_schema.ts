import { alphabeticSpace } from "$lib/regexp/regexp";
import { z } from "zod";

export const provinceSchema = z.object({
    provinceId: z.string().uuid().nonempty(),
    provinceName: z.string().min(1).max(50).regex(alphabeticSpace),
});

export const citySchema = z.object({
    cityId: z.string().uuid().nonempty(),
    cityName: z.string().min(1).max(50).regex(alphabeticSpace),
});

export const locationSchema = z.object({
    province: provinceSchema,
    city: citySchema,
    address: z.string().min(1).max(255),
    zone: z.string().min(5).max(6),
});
