import { z } from "zod";
import { alphanumericPunctuation } from "$lib/regexp/regexp";


export const companySchema = z.object({
    id: z.string().uuid().nonempty(),
    name: z.string()
        .min(1)
        .max(255)
        .regex(alphanumericPunctuation)
        .trim()
        .nonempty(),
    status: z.boolean()
        .default(true),
});
