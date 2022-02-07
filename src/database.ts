import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, NODE_ENV, POSTGRES_TEST_DB } =
  process.env;

const Client: Pool = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: NODE_ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB,
});

export default Client;
