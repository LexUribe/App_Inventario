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
  Compra,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaCompraController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/compra', {
    responses: {
      '200': {
        description: 'Persona has one Compra',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Compra),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Compra>,
  ): Promise<Compra> {
    return this.personaRepository.compra(id).get(filter);
  }

  @post('/personas/{id}/compra', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Compra)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compra, {
            title: 'NewCompraInPersona',
            exclude: ['id'],
            optional: ['proveedorId']
          }),
        },
      },
    }) compra: Omit<Compra, 'id'>,
  ): Promise<Compra> {
    return this.personaRepository.compra(id).create(compra);
  }

  @patch('/personas/{id}/compra', {
    responses: {
      '200': {
        description: 'Persona.Compra PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compra, {partial: true}),
        },
      },
    })
    compra: Partial<Compra>,
    @param.query.object('where', getWhereSchemaFor(Compra)) where?: Where<Compra>,
  ): Promise<Count> {
    return this.personaRepository.compra(id).patch(compra, where);
  }

  @del('/personas/{id}/compra', {
    responses: {
      '200': {
        description: 'Persona.Compra DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Compra)) where?: Where<Compra>,
  ): Promise<Count> {
    return this.personaRepository.compra(id).delete(where);
  }
}
