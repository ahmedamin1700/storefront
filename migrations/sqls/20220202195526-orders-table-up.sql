CREATE TYPE STATUS AS ENUM ('complete', 'active');

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  status STATUS
)