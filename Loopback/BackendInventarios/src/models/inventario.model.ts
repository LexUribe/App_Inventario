import {Entity, model, property, hasOne} from '@loopback/repository';
import {Venta} from './venta.model';
import {Compra} from './compra.model';

@model()
export class Inventario extends Entity {
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
  unbicacion: string;

  @property({
    type: 'string',
    required: true,
  })
  cantidad_actual: string;

  @property({
    type: 'string',
    required: true,
  })
  cantidad_max: string;

  @property({
    type: 'string',
    required: true,
  })
  cantidad_min: string;

  @hasOne(() => Venta)
  venta: Venta;

  @hasOne(() => Compra)
  compra: Compra;

  @property({
    type: 'string',
  })
  hardwareId?: string;

  @property({
    type: 'string',
  })
  equiposCompletosId?: string;

  @property({
    type: 'string',
  })
  perfericoId?: string;

  constructor(data?: Partial<Inventario>) {
    super(data);
  }
}

export interface InventarioRelations {
  // describe navigational properties here
}

export type InventarioWithRelations = Inventario & InventarioRelations;
