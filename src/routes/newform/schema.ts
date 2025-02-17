import { alphabetical, alphanumeric, alphanumericPunctuation, numeric } from '$lib/regexp/regexp';
import { file, nationalIdNumber, nationalIdType, optionalName, requiredName } from './primitives';
import { z } from 'zod';

export const formSchema = z.object({
    nurseIdType: nationalIdType,
    nurseIdNumber: nationalIdNumber,
    nurseFirstName: requiredName,
    nurseSecondName: optionalName,
    nurseFirstSurname: requiredName,
    nurseSecondSurname: optionalName,

    driverIdType: nationalIdType,
    driverIdNumber: nationalIdNumber,
    driverFirstName: requiredName,
    driverSecondName: optionalName,
    driverFirstSurname: requiredName,
    driverSecondSurname: optionalName,

    ambulancePlate: z.string().length(6).regex(alphanumeric).trim(),

    patientIdType: nationalIdType,
    patientIdNumber: nationalIdNumber,
    patientFirstname: requiredName,
    patientSecondName: optionalName,
    patientFirstSurname: requiredName,
    patientSecondSurname: optionalName,
    patientIdPicture: file,
    patientGender: z.string().min(1).max(50).trim().regex(alphabetical).nonempty(),
    phone: z.string().length(10).trim().regex(numeric).nonempty(),
    patientProvince: z.string().min(1).max(50).trim().regex(alphabetical).nonempty(),
    patientCity: z.string().min(1).max(50).trim().regex(alphabetical).nonempty(),
    patientAddress: z.string().min(1).max(255).trim().regex(alphanumericPunctuation).nonempty(),
    patientBirthDate: z.string().date().nonempty(),
    patientCondition: z.string().min(1).max(50).trim().regex(alphabetical).nonempty(),
    patientEps: z.string().min(1).max(50).trim().regex(alphabetical).nonempty()
});

export type FormSchema = typeof formSchema;
