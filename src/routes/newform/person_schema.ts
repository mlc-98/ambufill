import { z } from 'zod';
import { alphabeticSpace, numeric } from '$lib/regexp/regexp';
import { nationalIdNumber, nationalIdType, optionalName, requiredName } from './primitives';

// Personal information about the patient
export const personSchema = z.object({
    firstname: requiredName,
    secondName: optionalName,
    firstSurname: requiredName,
    secondSurname: optionalName,
    nationalIdType: nationalIdType,
    nationalIdNumber: nationalIdNumber
});
