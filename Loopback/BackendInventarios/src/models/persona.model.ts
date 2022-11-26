import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Factura} from './factura.model';
import {Venta} from './venta.model';
import {Compra} from './compra.model';
import {Marca} from './marca.model';

@model()
export class Persona extends Entity {
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
  tipo_documento: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
    required: true,
  })
  genero: string;

  @hasMany(() => Factura, {keyTo: 'clienteId'})
  facturas: Factura[];

  @hasMany(() => Venta, {keyTo: 'empleadoId'})
  ventas: Venta[];

  @hasMany(() => Compra, {keyTo: 'empleadoId'})
  compras: Compra[];

  @hasMany(() => Marca, {keyTo: 'proveedorId'})
  marcas: Marca[];

  @property({
    type: 'string',
  })
  clienteId?: string;

  @property({
    type: 'string',
  })
  empleadoId?: string;

  @property({
    type: 'string',
  })
  proveedorId?: string;

  @hasOne(() => Compra, {keyTo: 'proveedorId'})
  compra: Compra;

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
