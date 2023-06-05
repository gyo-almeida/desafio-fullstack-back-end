import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

function dataSourceConfig(): DataSourceOptions {
  const entitiesPath = path.join(__dirname, "./entities/**.{ts,js}");
  const migrationsPath = path.join(__dirname, "./migrations/**.{ts,js}");

  const dbUrl: string | undefined = process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error("Env var DATABASE_URL does not exists");
  }

  const nodeEnv: string = process.env.NODE_ENV;

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [entitiesPath],
      migrations: [migrationsPath],
    };
  }

  return {
    type: "postgres",
    url: dbUrl,
    synchronize: false,
    logging: true,
    migrations: [migrationsPath],
    entities: [entitiesPath],
  };
}

export const AppDataSource = new DataSource(dataSourceConfig());
