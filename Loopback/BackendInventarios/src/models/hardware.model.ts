import {Entity, model, property, hasOne} from '@loopback/repository';
import {Inventario} from './inventario.model';

@model()
export class Hardware extends Entity {
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
  descripcion?: string;

  @property({
    type: 'string',
  })
  marcaId?: string;

  @hasOne(() => Inventario)
  inventario: Inventario;

  @property({
    type: 'string',
  })
  memoriaId?: string;

  @property({
    type: 'string',
  })
  discoId?: string;

  @property({
    type: 'string',
  })
  torreId?: string;

  @property({
    type: 'string',
  })
  procesadorId?: string;

  @property({
    type: 'string',
  })
  motherboardId?: string;

  constructor(data?: Partial<Hardware>) {
    super(data);
  }
}

export interface HardwareRelations {
  // describe navigational properties here
}

export type HardwareWithRelations = Hardware & HardwareRelations;
