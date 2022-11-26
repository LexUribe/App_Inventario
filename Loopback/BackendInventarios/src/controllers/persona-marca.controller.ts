import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Persona,
  Marca,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaMarcaController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/marcas', {
    responses: {
      '200': {
        description: 'Array of Persona has many Marca',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Marca)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Marca>,
  ): Promise<Marca[]> {
    return this.personaRepository.marcas(id).find(filter);
  }

  @post('/personas/{id}/marcas', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Marca)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marca, {
            title: 'NewMarcaInPersona',
            exclude: ['id'],
            optional: ['proveedorId']
          }),
        },
      },
    }) marca: Omit<Marca, 'id'>,
  ): Promise<Marca> {
    return this.personaRepository.marcas(id).create(marca);
  }

  @patch('/personas/{id}/marcas', {
    responses: {
      '200': {
        description: 'Persona.Marca PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marca, {partial: true}),
        },
      },
    })
    marca: Partial<Marca>,
    @param.query.object('where', getWhereSchemaFor(Marca)) where?: Where<Marca>,
  ): Promise<Count> {
    return this.personaRepository.marcas(id).patch(marca, where);
  }

  @del('/personas/{id}/marcas', {
    responses: {
      '200': {
        description: 'Persona.Marca DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Marca)) where?: Where<Marca>,
  ): Promise<Count> {
    return this.personaRepository.marcas(id).delete(where);
  }
}
