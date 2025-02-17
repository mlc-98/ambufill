import { z } from 'zod';
import { ambulanceSchema, driverInfoSchema, nurseInfoSchema } from './first_section_schema';
import { patientSchema } from './second_section_schema';

export type FormSchema = z.infer<typeof formSchema>;
