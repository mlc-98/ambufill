import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import postgres from 'postgres';

if (!process.env.PUBLIC_SUPABASE_URL) {
	throw new Error('DATABASE_URL is not defined');
}
const client = postgres(process.env.PUBLIC_SUPABASE_URL);
export const db = drizzle(client, { schema });
