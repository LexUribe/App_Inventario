import {Entity, model, property, hasOne} from '@loopback/repository';
import {Perferico} from './perferico.model';

@model()
export class Mouse extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  distancia_max?: string;

  @property({
    type: 'string',
  })
  tipo_mano?: string;

  @property({
    type: 'string',
  })
  dpi?: string;

  @hasOne(() => Perferico)
  perferico: Perferico;

  constructor(data?: Partial<Mouse>) {
    super(data);
  }
}

export interface MouseRelations {
  // describe navigational properties here
}

export type MouseWithRelations = Mouse & MouseRelations;
