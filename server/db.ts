import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

const databaseUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL or SUPABASE_DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Configure for Supabase compatibility
export const pool = new Pool({ 
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false }
});

export const db = drizzle({ client: pool, schema });
