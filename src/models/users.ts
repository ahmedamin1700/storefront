import { compare, hash } from 'bcrypt';
import Client from '../database';

export interface User {
  id?: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

class UsersRepository {
  index = async (): Promise<User[]> => {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error('can not return users.');
    }
  };

  show = async (id: number): Promise<User> => {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=$1';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`can't return user with id ${id}`);
    }
  };

  create = async (user: User): Promise<User> => {
    const { username, password, firstname, lastname } = user;
    try {
      const connection = await Client.connect();
      let sql = 'SELECT * FROM users WHERE username=$1';
      let result = await connection.query(sql, [username]);

      if (result.rows[0]) throw new Error('username already taken.');

      sql =
        'INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *';

      // hashing password before saving in database.
      const hashedPassword = await hash(password + process.env.PEPPER, Number(process.env.SALT));

      result = await connection.query(sql, [username, hashedPassword, firstname, lastname]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `can't create user with this username ${username} ${(error as Error).message}.`,
      );
    }
  };

  authenticate = async (username: string, password: string): Promise<User> => {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM users WHERE username=$1';

      const result = await connection.query(sql, [username]);
      connection.release();

      // if user doesn't exists.
      if (!result.rows[0]) throw new Error('user does not exsits.');

      // if passwords doesn't match.
      const valid = compare(password + process.env.PEPPER, result.rows[0].password);
      if (!valid) throw new Error('wrong password.');

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `can't authenticate user with this username ${username} ${(error as Error).message}.`,
      );
    }
  };
}

export default UsersRepository;
