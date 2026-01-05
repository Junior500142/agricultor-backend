import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgricultoresModule } from './agricultores/agricultores.module';
import { Agricultor } from './agricultores/entities/agricultor.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '25955', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      
      entities: [Agricultor], 
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
    }),
    
    AgricultoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
