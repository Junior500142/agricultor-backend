import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgricultoresModule } from './agricultores/agricultores.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    TypeOrmModule.forRoot(databaseConfig),
    
    AgricultoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
