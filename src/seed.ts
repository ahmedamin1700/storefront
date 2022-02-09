import loading from 'loading-cli';
import minifaker from 'minifaker';
import 'minifaker/locales/en';

import client from './database';
import ProductsRepository from './models/products';
import UsersRepository from './models/users';

minifaker.setDefaultLocale('en');

const seed_users = async (usersNumber: number) => {
  const repo = new UsersRepository();
  const spinner = loading({ text: 'seeding users to database' }).start();
  for (let index = 0; index < usersNumber; index++) {
    const firstname = minifaker.firstName();
    const lastname = minifaker.lastName();
    const username = `${firstname}.${lastname}`.toLowerCase();
    const password = minifaker.password({});

    await repo.create({ username, firstname, lastname, password });
  }
  spinner.succeed('done seeding users to database.');
};

const seed_products = async (usersNumber: number, productsNumber: number) => {
  const repo = new ProductsRepository();
  const spinner = loading({ text: 'seeding products to database' }).start();

  const categories = [];
  for (let index = 0; index < usersNumber; index++) {
    const element = minifaker.cityName();
    categories.push(element);
  }

  for (let index = 0; index < productsNumber; index++) {
    const name = minifaker.name();

    const price = parseInt(minifaker.number({ float: true, min: 3, max: 100 }).toFixed(2));
    const category = categories[Math.floor(Math.random() * 10)];

    await repo.create({ name, price, category });
  }
  spinner.succeed('done seeding products to database.');
};

const seed_orders = async (usersNumber: number, productsNumber: number) => {
  const spinner = loading({ text: 'seeding products to database' }).start();

  const connection = await client.connect();
  // possible order status could be.
  const status = ['complete', 'active'];
  let sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
  const orders = []; // array to collect all inserted orders.

  // loop throw users.
  for (let index = 0; index < usersNumber; index++) {
    // set possible order per user to be 1 : 3.
    const possibleOrdersNumber = Math.floor(Math.random() * 3) + 1;
    // save user id.
    const user_id = index + 1;
    // loop through possible orders.
    for (let index = 0; index < possibleOrdersNumber; index++) {
      const result = await connection.query(sql, [
        user_id,
        status[Math.round((Math.random() / 3) * 2)],
      ]);
      orders.push(result?.rows[0]);
    }
  }

  sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3)';
  // loop through orders and attach products to each one.
  for (let index = 0; index < orders.length; index++) {
    const order_id = index + 1;
    const possibleProductsPerOrderNumber = Math.floor(Math.random() * 3) + 1;

    const tempProductsIds: number[] = []; // prevent duplicate products.

    for (let index = 0; index < possibleProductsPerOrderNumber; index++) {
      const product_id = Math.floor(Math.random() * productsNumber) + 1;
      if (tempProductsIds.includes(product_id)) {
        continue;
      }
      tempProductsIds.push(product_id);
      const quantity = Math.floor(Math.random() * 2) + 1;
      await connection.query(sql, [order_id, product_id, quantity]);
    }
  }

  connection.release();
  spinner.succeed('done seeding orders to database.');
};

async function main() {
  await seed_users(10);
  await seed_products(10, 50);
  await seed_orders(10, 50);
}

main();
