import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { PG_HOST, PG_USER, PG_PASSWORD, PG_DB, NODE_ENV, PG_TEST_DB } = process.env;

const Client: Pool = new Pool({
  host: PG_HOST,
  user: PG_USER,
  password: PG_PASSWORD,
  database: NODE_ENV === 'test' ? PG_TEST_DB : PG_DB,
});

export default Client;
