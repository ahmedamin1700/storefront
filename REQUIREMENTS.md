# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `/products` [GET]
- Show `/products/<product_id>` [GET]
- Create [token required] `POST /products` [POST]
- Products by category `/products/category/<category>` [GET]

#### Users

- Index [token required] `/users` [GET]
- Show [token required] `/users/<user_id>` [GET]
- Create N[token required] `POST /users` [POST]

#### Orders

- Current Order by user [token required] `/orders/<user_id>/current` [GET]
- Completed Orders by user [token required] `/orders/<user_id>/complete` [GET]

## Data Shapes

#### Product

- id SERIAL PRIMARY KEY
- name VARCHAR(50) NOT NULL
- price INTEGER NOT NULL
- category VARCHAR(50)

#### User

- id SERIAL PRIMARY KEY
- username VARCHAR(50) UNIQUE NOT NULL
- password VARCHAR
- firstname VARCHAR(25)
- lastname VARCHAR(25)

#### Orders

- id SERIAL PRIMARY KEY
- user_id BIGINT REFERENCES users(id)
- status STATUS

#### Order Products

- id SERIAL PRIMARY KEY
- order_id BIGINT REFERENCES orders(id)
- product_id BIGINT REFERENCES products(id)
- quantity integer default 1
