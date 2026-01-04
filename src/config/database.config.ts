import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  url: process.env.DATABASE_URL, 
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, 
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: true,
  logging: process.env.NODE_ENV === 'development',
  ssl: {
    rejectUnauthorized: true
  }
};
