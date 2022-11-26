import {Entity, model, property, hasOne} from '@loopback/repository';
import {Persona} from './persona.model';

@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_nacimiento: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_contrato: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'date',
    required: true,
  })
  horas_trabajadas: string;

  @hasOne(() => Persona)
  persona: Persona;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
