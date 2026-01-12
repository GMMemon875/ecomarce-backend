import pkg from "pg";
const { Client } = pkg;

const database = new Client({
  user: "postgres",
  host: "localhost",
  database: "Ecommerce_store",
  password: "memon786",
  port: 5432, // default port for PostgreSQL
});

try {
  await database.connect();
  console.log("Database connected successfully");
} catch (error) {
  console.error("Database connection failed:", error);
  process.exit(1);
}

export default database;
