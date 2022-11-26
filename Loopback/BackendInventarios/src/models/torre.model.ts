import {Entity, model, property, hasOne} from '@loopback/repository';
import {Hardware} from './hardware.model';

@model()
export class Torre extends Entity {
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
  modelo: string;

  @property({
    type: 'string',
  })
  color?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @hasOne(() => Hardware)
  hardware: Hardware;

  constructor(data?: Partial<Torre>) {
    super(data);
  }
}

export interface TorreRelations {
  // describe navigational properties here
}

export type TorreWithRelations = Torre & TorreRelations;
