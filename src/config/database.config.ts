import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '25955'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}', 'src/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,

  ssl: process.env.DB_PORT === '3306' ? false : { rejectUnauthorized: false },

  extra: {
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    keepAliveInitialDelay: 10000,
    enableKeepAlive: true,
  },
};
