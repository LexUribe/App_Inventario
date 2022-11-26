import {Entity, model, property, hasOne} from '@loopback/repository';
import {Hardware} from './hardware.model';

@model()
export class Procesador extends Entity {
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
  velocidad: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  referencia: string;

  @hasOne(() => Hardware)
  hardware: Hardware;

  constructor(data?: Partial<Procesador>) {
    super(data);
  }
}

export interface ProcesadorRelations {
  // describe navigational properties here
}

export type ProcesadorWithRelations = Procesador & ProcesadorRelations;
