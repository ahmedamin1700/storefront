CREATE TABLE users ( 
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR,
  firstname VARCHAR(25),
  lastname VARCHAR(25)
)