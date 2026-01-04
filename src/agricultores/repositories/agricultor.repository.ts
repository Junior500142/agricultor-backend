import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agricultor } from '../entities/agricultor.entity';
import { CreateAgricultorDto } from '../dto/create-agricultor.dto';
import { UpdateAgricultorDto } from '../dto/update-agricultor.dto';

@Injectable()
export class AgricultorRepository {
  constructor(
    @InjectRepository(Agricultor)
    private readonly repository: Repository<Agricultor>,
  ) {}

  async create(createDto: CreateAgricultorDto): Promise<Agricultor> {
    // usar Query Builder direto para não dar problema de mapeamento
    const id = this.generateUUID();
    
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(Agricultor)
      .values({
        id,
        razaoSocial: createDto.razaoSocial,
        nomeFantasia: createDto.nomeFantasia,
        cnpjCpf: createDto.cnpjCpf,
        celular: createDto.celular || undefined,
        cidade: createDto.cidade,
        estado: createDto.estado,
      })
      .execute();

    const created = await this.findOne(id);
    if (!created) {
      throw new Error('Failed to create agricultor');
    }
    return created;
  }

  async findAll(): Promise<Agricultor[]> {
    // usar query raw para não dar problema de alias
    return await this.repository.query(`
      SELECT 
        id,
        razaoSocial,
        nomeFantasia,
        cnpjCpf,
        celular,
        cidade,
        estado,
        createdAt,
        updatedAt
      FROM agricultores
      ORDER BY createdAt DESC
    `);
  }

  async findOne(id: string): Promise<Agricultor | null> {
    const result = await this.repository.query(`
      SELECT 
        id,
        razaoSocial,
        nomeFantasia,
        cnpjCpf,
        celular,
        cidade,
        estado,
        createdAt,
        updatedAt
      FROM agricultores
      WHERE id = ?
    `, [id]);
    
    return result[0] || null;
  }

  async findByCnpjCpf(cnpjCpf: string): Promise<Agricultor | null> {
    const result = await this.repository.query(`
      SELECT 
        id,
        razaoSocial,
        nomeFantasia,
        cnpjCpf,
        celular,
        cidade,
        estado,
        createdAt,
        updatedAt
      FROM agricultores
      WHERE cnpjCpf = ?
      LIMIT 1
    `, [cnpjCpf]);
    
    return result[0] || null;
  }

  async update(id: string, updateDto: UpdateAgricultorDto): Promise<Agricultor> {
    // construir query dinamicamente apenas com campos presentes
    const updates: string[] = [];
    const values: any[] = [];

    if (updateDto.razaoSocial !== undefined) {
      updates.push('razaoSocial = ?');
      values.push(updateDto.razaoSocial);
    }
    if (updateDto.nomeFantasia !== undefined) {
      updates.push('nomeFantasia = ?');
      values.push(updateDto.nomeFantasia);
    }
    if (updateDto.cnpjCpf !== undefined) {
      updates.push('cnpjCpf = ?');
      values.push(updateDto.cnpjCpf);
    }
    if (updateDto.celular !== undefined) {
      updates.push('celular = ?');
      values.push(updateDto.celular);
    }
    if (updateDto.cidade !== undefined) {
      updates.push('cidade = ?');
      values.push(updateDto.cidade);
    }
    if (updateDto.estado !== undefined) {
      updates.push('estado = ?');
      values.push(updateDto.estado);
    }

    if (updates.length > 0) {
      values.push(id); // Para o where
      
      await this.repository.query(`
        UPDATE agricultores 
        SET ${updates.join(', ')}
        WHERE id = ?
      `, values);
    }

    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error('Agricultor not found after update');
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    await this.repository.query(`
      DELETE FROM agricultores WHERE id = ?
    `, [id]);
  }

  async count(): Promise<number> {
    const result = await this.repository.query(`
      SELECT COUNT(*) as total FROM agricultores
    `);
    return result[0].total;
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}