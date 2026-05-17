import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('Falta la variable de entorno DATABASE_URL');
}

export const sql = neon(process.env.DATABASE_URL);