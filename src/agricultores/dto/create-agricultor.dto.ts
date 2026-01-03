import {
  IsString,
  IsNotEmpty,
  Matches,
  IsOptional,
  Length,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAgricultorDto {
  @IsString({ message: 'Razão Social deve ser um texto' })
  @IsNotEmpty({ message: 'Razão Social é obrigatória' })
  @MinLength(3, { message: 'Razão Social deve ter no mínimo 3 caracteres' })
  razaoSocial: string;

  @IsString({ message: 'Nome Fantasia deve ser um texto' })
  @IsNotEmpty({ message: 'Nome Fantasia é obrigatório' })
  @MinLength(3, { message: 'Nome Fantasia deve ter no mínimo 3 caracteres' })
  nomeFantasia: string;

  @IsString({ message: 'CPF/CNPJ deve ser um texto' })
  @IsNotEmpty({ message: 'CPF/CNPJ é obrigatório' })
  @Transform(({ value }) => value?.replace(/\D/g, ''))
  cnpjCpf: string;

  @IsOptional()
  @IsString({ message: 'Celular deve ser um texto' })
  @Matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, {
    message: 'Celular deve estar no formato (XX) XXXXX-XXXX',
  })
  celular?: string;

  @IsString({ message: 'Cidade deve ser um texto' })
  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  @MinLength(2, { message: 'Cidade deve ter no mínimo 2 caracteres' })
  cidade: string;

  @IsString({ message: 'Estado deve ser um texto' })
  @IsNotEmpty({ message: 'Estado é obrigatório' })
  @Length(2, 2, { message: 'Estado deve ter 2 caracteres (sigla)' })
  @Matches(/^[A-Z]{2}$/, {
    message: 'Estado deve ser uma sigla válida (ex: SP, RJ, MG)',
  })
  estado: string;
}