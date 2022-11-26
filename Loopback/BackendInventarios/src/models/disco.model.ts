import {Entity, model, property, hasOne} from '@loopback/repository';
import {Hardware} from './hardware.model';

@model()
export class Disco extends Entity {
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
  tipo: string;

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
  cache: string;

  @hasOne(() => Hardware)
  hardware: Hardware;

  constructor(data?: Partial<Disco>) {
    super(data);
  }
}

export interface DiscoRelations {
  // describe navigational properties here
}

export type DiscoWithRelations = Disco & DiscoRelations;
