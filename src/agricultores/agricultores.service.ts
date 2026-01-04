import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { AgricultorRepository } from './repositories/agricultor.repository';
import { CreateAgricultorDto } from './dto/create-agricultor.dto';
import { UpdateAgricultorDto } from './dto/update-agricultor.dto';
import { Agricultor } from './entities/agricultor.entity';
import { validateCpfCnpj } from '../common/validators/cpf-cnpj.validator';

@Injectable()
export class AgricultoresService {
  constructor(private readonly agricultorRepository: AgricultorRepository) {}

  async create(createDto: CreateAgricultorDto): Promise<Agricultor> {
    // Validar CPF/CNPJ
    const cnpjCpfLimpo = createDto.cnpjCpf.replace(/\D/g, '');
    
    if (!validateCpfCnpj(cnpjCpfLimpo)) {
      throw new BadRequestException('CPF/CNPJ inválido');
    }

    // Verificar se já existe
    const exists = await this.agricultorRepository.findByCnpjCpf(cnpjCpfLimpo);
    if (exists) {
      throw new ConflictException('CPF/CNPJ já cadastrado');
    }

    // Criar agricultor
    const agricultor = await this.agricultorRepository.create({
      ...createDto,
      cnpjCpf: cnpjCpfLimpo,
    });

    return agricultor;
  }

  async findAll(): Promise<Agricultor[]> {
    return await this.agricultorRepository.findAll();
  }

  async findOne(id: string): Promise<Agricultor> {
    const agricultor = await this.agricultorRepository.findOne(id);
    
    if (!agricultor) {
      throw new NotFoundException(`Agricultor com ID ${id} não encontrado`);
    }

    return agricultor;
  }

  async update(id: string, updateDto: UpdateAgricultorDto): Promise<Agricultor> {
    // Verifica se existe
    await this.findOne(id);

    // Se está atualizando CPF/CNPJ, validar
    if (updateDto.cnpjCpf) {
      const cnpjCpfLimpo = updateDto.cnpjCpf.replace(/\D/g, '');
      
      if (!validateCpfCnpj(cnpjCpfLimpo)) {
        throw new BadRequestException('CPF/CNPJ inválido');
      }

      // Verifica se existe outro com mesmo CPF/CNPJ
      const exists = await this.agricultorRepository.findByCnpjCpf(cnpjCpfLimpo);
      if (exists && exists.id !== id) {
        throw new ConflictException('CPF/CNPJ já cadastrado');
      }

      updateDto.cnpjCpf = cnpjCpfLimpo;
    }

    return await this.agricultorRepository.update(id, updateDto);
  }

  async remove(id: string): Promise<void> {
    // verifica se existe
    await this.findOne(id);
    
    await this.agricultorRepository.remove(id);
  }

  async getStatistics() {
    const total = await this.agricultorRepository.count();
    return {
      total,
      message: `Total de ${total} agricultor(es) cadastrado(s)`,
    };
  }
}