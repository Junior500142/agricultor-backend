import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { AgricultoresService } from './agricultores.service';
import { CreateAgricultorDto } from './dto/create-agricultor.dto';
import { UpdateAgricultorDto } from './dto/update-agricultor.dto';

@Controller('agricultores')
export class AgricultoresController {
  constructor(private readonly agricultoresService: AgricultoresService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createDto: CreateAgricultorDto,
  ) {
    const result = await this.agricultoresService.create(createDto);
    return {
      id: result.id,
      razaoSocial: result.razaoSocial,
      nomeFantasia: result.nomeFantasia,
      cnpjCpf: result.cnpjCpf,
      celular: result.celular,
      cidade: result.cidade,
      estado: result.estado,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  @Get()
  async findAll() {
    return await this.agricultoresService.findAll();
  }

  @Get('statistics')
  async getStatistics() {
    return await this.agricultoresService.getStatistics();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.agricultoresService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    updateDto: UpdateAgricultorDto,
  ) {
    const result = await this.agricultoresService.update(id, updateDto);
    return {
      id: result.id,
      razaoSocial: result.razaoSocial,
      nomeFantasia: result.nomeFantasia,
      cnpjCpf: result.cnpjCpf,
      celular: result.celular,
      cidade: result.cidade,
      estado: result.estado,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.agricultoresService.remove(id);
  }
}