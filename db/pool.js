import { Pool } from "pg";

const config = {
  user: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: "inventory",
};

const inventoryPool = new Pool(config);

export { config, inventoryPool };
