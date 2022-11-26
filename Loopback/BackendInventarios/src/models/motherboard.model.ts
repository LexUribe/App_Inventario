import {Entity, model, property, hasOne} from '@loopback/repository';
import {Hardware} from './hardware.model';

@model()
export class Motherboard extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  puertos: string;

  @property({
    type: 'string',
    required: true,
  })
  serie: string;

  @property({
    type: 'string',
    required: true,
  })
  socket: string;

  @property({
    type: 'string',
    required: true,
  })
  chipset: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_memoria: string;

  @property({
    type: 'string',
    required: true,
  })
  numero_slots: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  formato: string;

  @hasOne(() => Hardware)
  hardware: Hardware;

  constructor(data?: Partial<Motherboard>) {
    super(data);
  }
}

export interface MotherboardRelations {
  // describe navigational properties here
}

export type MotherboardWithRelations = Motherboard & MotherboardRelations;
