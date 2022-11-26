import {Entity, model, property, hasOne} from '@loopback/repository';
import {Inventario} from './inventario.model';

@model()
export class Perferico extends Entity {
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
  numero_serie: string;

  @property({
    type: 'string',
  })
  descrpcion?: string;

  @property({
    type: 'string',
  })
  marcaId?: string;

  @hasOne(() => Inventario)
  inventario: Inventario;

  @property({
    type: 'string',
  })
  otroId?: string;

  @property({
    type: 'string',
  })
  tecladoId?: string;

  @property({
    type: 'string',
  })
  mouseId?: string;

  @property({
    type: 'string',
  })
  monitorId?: string;

  constructor(data?: Partial<Perferico>) {
    super(data);
  }
}

export interface PerfericoRelations {
  // describe navigational properties here
}

export type PerfericoWithRelations = Perferico & PerfericoRelations;
