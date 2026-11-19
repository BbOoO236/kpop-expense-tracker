import 'reflect-metadata';
import { config as loadEnv } from 'dotenv';
import { DataSource } from 'typeorm';

// Load `.env` for the TypeORM CLI (migration:generate/run/revert), which runs
// outside the Nest runtime and therefore outside `ConfigModule`.
loadEnv();

/**
 * TypeORM DataSource for the migration CLI.
 *
 * This DataSource is used only by the `typeorm` CLI scripts declared in
 * `package.json`. At application runtime the Nest app connects through
 * `TypeOrmModule` (wired up in the foundational phase), reading the same
 * `DATABASE_URL`.
 *
 * Entities are discovered by glob, so new `*.entity.ts` files under
 * `src/modules/**` are picked up automatically as modules are added.
 */
export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});
