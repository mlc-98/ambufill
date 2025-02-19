import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { loadIdTypes } from '$lib/server/idTypes.js';

// TODO: query this from the database
const idTypes = loadIdTypes();

console.log('from +page.server.ts', idTypes);

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema)),
		idTypes
	};
};
