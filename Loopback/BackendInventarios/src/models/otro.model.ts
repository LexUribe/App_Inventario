import {Entity, model, property, hasOne} from '@loopback/repository';
import {Perferico} from './perferico.model';

@model()
export class Otro extends Entity {
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
  })
  resolucion?: string;

  @property({
    type: 'string',
  })
  puerto?: string;

  @hasOne(() => Perferico)
  perferico: Perferico;

  constructor(data?: Partial<Otro>) {
    super(data);
  }
}

export interface OtroRelations {
  // describe navigational properties here
}

export type OtroWithRelations = Otro & OtroRelations;
