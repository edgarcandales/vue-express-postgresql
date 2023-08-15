import pgPromise from 'pg-promise';

const pgp = pgPromise();

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'tasksdb',
  user: 'edgarcandales',
  password: 'test1',
};

const db = pgp(connection);

export default db;
