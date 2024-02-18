import { Pool } from "pg";
import env from "dotenv";
//@ts-ignore
env.config("dotenv");

const host = process.env.PGHOST
const database = process.env.PGDATABASE
const port = process.env.PG_PORT

const pool = new Pool({
    user: process.env.PGUSER,
    host,
    database,
    password: process.env.PGPASSWORD,
    port: 5432,
});

const createTable = async (tableName: string, columns: string): Promise<void> => {
    await pool.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`);
};

createTable(
    "users",
    "user_id SERIAL PRIMARY KEY, username TEXT NOT NULL, email TEXT NOT NULL, phoneNumber TEXT NOT NULL, password TEXT NOT NULL"
);

createTable(
    "posts",
    "id SERIAL PRIMARY KEY, name TEXT NOT NULL, description TEXT, user_id INTEGER REFERENCES users(user_id)  NULL, image TEXT, username TEXT, email TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
);


export default pool