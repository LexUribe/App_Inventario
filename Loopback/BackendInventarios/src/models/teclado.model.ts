import {Entity, model, property, hasOne} from '@loopback/repository';
import {Perferico} from './perferico.model';

@model()
export class Teclado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  peso?: string;

  @hasOne(() => Perferico)
  perferico: Perferico;

  constructor(data?: Partial<Teclado>) {
    super(data);
  }
}

export interface TecladoRelations {
  // describe navigational properties here
}

export type TecladoWithRelations = Teclado & TecladoRelations;
