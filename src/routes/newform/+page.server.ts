import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { loadIdTypes } from '$lib/server/idTypes.js';

const idTypes = loadIdTypes();

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema)),
		idTypes
	};
};
