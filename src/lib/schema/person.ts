import { nationalIdNumber, nationalIdType, optionalName, requiredName } from './primitives';
import { z } from 'zod';

export const PersonSchema = z.object({
	idType: nationalIdType,
	idNumber: nationalIdNumber,
	firstName: requiredName,
	secondName: optionalName,
	firstSurname: requiredName,
	secondSurname: optionalName
});
