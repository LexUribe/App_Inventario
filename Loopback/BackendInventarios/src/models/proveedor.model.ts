import {Entity, model, property, hasOne} from '@loopback/repository';
import {Persona} from './persona.model';

@model()
export class Proveedor extends Entity {
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
  rut: string;

  @property({
    type: 'string',
  })
  telefono2?: string;

  @property({
    type: 'string',
  })
  telefono3?: string;

  @hasOne(() => Persona)
  persona: Persona;

  constructor(data?: Partial<Proveedor>) {
    super(data);
  }
}

export interface ProveedorRelations {
  // describe navigational properties here
}

export type ProveedorWithRelations = Proveedor & ProveedorRelations;
