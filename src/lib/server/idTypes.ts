import { supabase } from '$lib/db/supabaseClient';

export async function loadIdTypes(): Promise<any> {
	const { data } = await supabase.from('national_id_type').select();
	return data;
}
