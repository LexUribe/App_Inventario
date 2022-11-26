import {Entity, model, property, hasMany} from '@loopback/repository';
import {Hardware} from './hardware.model';
import {EquiposCompletos} from './equipos-completos.model';
import {Perferico} from './perferico.model';

@model()
export class Marca extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  pais_origen: string;

  @property({
    type: 'string',
    required: true,
  })
  web: string;

  @property({
    type: 'string',
  })
  proveedorId?: string;

  @hasMany(() => Hardware)
  hardware: Hardware[];

  @hasMany(() => EquiposCompletos)
  equiposCompletos: EquiposCompletos[];

  @hasMany(() => Perferico)
  perfericos: Perferico[];

  constructor(data?: Partial<Marca>) {
    super(data);
  }
}

export interface MarcaRelations {
  // describe navigational properties here
}

export type MarcaWithRelations = Marca & MarcaRelations;
