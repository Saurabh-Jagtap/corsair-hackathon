import { drizzle } from "drizzle-orm/node-postgres";
import { pool } from "./client";

export const db = drizzle(pool);

export { pool }

export * as schema from "./schema";