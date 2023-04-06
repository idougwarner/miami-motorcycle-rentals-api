import 'dotenv/config';

module.exports = [
  {
    name: 'migration',
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['modules/entity/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
    cli: {
      migrationsDir: 'src/migrations',
      entitiesDir: 'modules',
    },
  },
  {
    name: 'seed',
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['src/modules/entity/*.entity.ts'],
    migrations: ['src/seeds/*.ts'],
    cli: {
      migrationsDir: 'src/seeds',
      entitiesDir: 'src/modules',
    },
  },
];
