import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgricultoresController } from './agricultores.controller';
import { AgricultoresService } from './agricultores.service';
import { AgricultorRepository } from './repositories/agricultor.repository';
import { Agricultor } from './entities/agricultor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agricultor])],
  controllers: [AgricultoresController],
  providers: [AgricultoresService, AgricultorRepository],
  exports: [AgricultoresService],
})
export class AgricultoresModule {}