import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '4000'), 
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'test',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, 
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: true,
  logging: process.env.NODE_ENV === 'development',
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true 
  },
  extra: {
    ssl: {
      rejectUnauthorized: true
    }
  }
};
