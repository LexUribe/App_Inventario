import {Entity, model, property, hasOne} from '@loopback/repository';
import {Inventario} from './inventario.model';

@model()
export class EquiposCompletos extends Entity {
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
  memoria: string;

  @property({
    type: 'string',
    required: true,
  })
  disco: string;

  @property({
    type: 'string',
    required: true,
  })
  numero_serie: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  procesador: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
  })
  comentarios?: string;

  @property({
    type: 'string',
  })
  marcaId?: string;

  @hasOne(() => Inventario)
  inventario: Inventario;

  constructor(data?: Partial<EquiposCompletos>) {
    super(data);
  }
}

export interface EquiposCompletosRelations {
  // describe navigational properties here
}

export type EquiposCompletosWithRelations = EquiposCompletos & EquiposCompletosRelations;
