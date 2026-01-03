import { PartialType } from '@nestjs/mapped-types';
import { CreateAgricultorDto } from './create-agricultor.dto';

export class UpdateAgricultorDto extends PartialType(CreateAgricultorDto) {}