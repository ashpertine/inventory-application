import { Client } from "pg";
import { config } from "./pool.js";

const initSQL = `
  CREATE TABLE trainers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    character_type VARCHAR(255),
    no_gym_badges INT
  );

  CREATE TABLE type (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255)
  );

  CREATE TABLE pokemon (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    attack INTEGER,
    defense INTEGER,
    trainer_id INTEGER,
    type_id INTEGER,
    CONSTRAINT fk_trainer_id 
      FOREIGN KEY (trainer_id)
      REFERENCES trainers(id)
      ON DELETE SET NULL
      ON UPDATE CASCADE,
    CONSTRAINT fk_type_id
      FOREIGN KEY (type_id)
      REFERENCES type(id)
      ON UPDATE CASCADE
  ); 
`;

async function main() {
  const client = new Client(config);
  console.log("seeding...");
  try {
    await client.connect();
    console.log("Connected to DB!");
    await client.query(initSQL);
    await client.end();
    console.log("done");
  } catch (error) {
    throw error;
  }
}

main();
