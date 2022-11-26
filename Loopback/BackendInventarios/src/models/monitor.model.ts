import {Entity, model, property, hasOne} from '@loopback/repository';
import {Perferico} from './perferico.model';

@model()
export class Monitor extends Entity {
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
  modelo: string;

  @hasOne(() => Perferico)
  perferico: Perferico;

  constructor(data?: Partial<Monitor>) {
    super(data);
  }
}

export interface MonitorRelations {
  // describe navigational properties here
}

export type MonitorWithRelations = Monitor & MonitorRelations;
