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
      return result.rows;
    } catch (error) {
      throw new Error("Can't return users");
    }
  };

  show = async (id: number): Promise<User> => {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=$1';
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't return user with id ${id}`);
    }
  };

  create = async (user: User): Promise<User> => {
    const { username, password, firstname, lastname } = user;
    try {
      const connection = await Client.connect();
      const sql =
        'INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING *';

      // hashing password before saving in database.
      const hashedPassword = hash(password + process.env.PEPPER, Number(process.env.SALT));

      const result = await connection.query(sql, [username, hashedPassword, firstname, lastname]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't create user with this username ${username}`);
    }
  };

  authenticate = async (username: string, password: string): Promise<User> => {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM users WHERE username=$1';

      const result = await connection.query(sql, [username]);

      // if user doesn't exists.
      if (!result.rows[0]) throw new Error();

      // if passwords doesn't match.
      const valid = compare(password + process.env.PEPPER, result.rows[0].password);
      if (!valid) throw new Error();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Can't authenticate user with this username ${username}`);
    }
  };
}

export default UsersRepository;
