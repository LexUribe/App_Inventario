import {Entity, model, property, hasOne} from '@loopback/repository';
import {Hardware} from './hardware.model';

@model()
export class Memoria extends Entity {
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
  capacidad: string;

  @property({
    type: 'string',
    required: true,
  })
  velocidad: string;

  @property({
    type: 'string',
    required: true,
  })
  formato: string;

  @property({
    type: 'string',
    required: true,
  })
  tecnologia: string;

  @hasOne(() => Hardware)
  hardware: Hardware;

  constructor(data?: Partial<Memoria>) {
    super(data);
  }
}

export interface MemoriaRelations {
  // describe navigational properties here
}

export type MemoriaWithRelations = Memoria & MemoriaRelations;
