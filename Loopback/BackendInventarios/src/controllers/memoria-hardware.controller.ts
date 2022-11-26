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
  Memoria,
  Hardware,
} from '../models';
import {MemoriaRepository} from '../repositories';

export class MemoriaHardwareController {
  constructor(
    @repository(MemoriaRepository) protected memoriaRepository: MemoriaRepository,
  ) { }

  @get('/memorias/{id}/hardware', {
    responses: {
      '200': {
        description: 'Memoria has one Hardware',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Hardware),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Hardware>,
  ): Promise<Hardware> {
    return this.memoriaRepository.hardware(id).get(filter);
  }

  @post('/memorias/{id}/hardware', {
    responses: {
      '200': {
        description: 'Memoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Hardware)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Memoria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hardware, {
            title: 'NewHardwareInMemoria',
            exclude: ['id'],
            optional: ['memoriaId']
          }),
        },
      },
    }) hardware: Omit<Hardware, 'id'>,
  ): Promise<Hardware> {
    return this.memoriaRepository.hardware(id).create(hardware);
  }

  @patch('/memorias/{id}/hardware', {
    responses: {
      '200': {
        description: 'Memoria.Hardware PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hardware, {partial: true}),
        },
      },
    })
    hardware: Partial<Hardware>,
    @param.query.object('where', getWhereSchemaFor(Hardware)) where?: Where<Hardware>,
  ): Promise<Count> {
    return this.memoriaRepository.hardware(id).patch(hardware, where);
  }

  @del('/memorias/{id}/hardware', {
    responses: {
      '200': {
        description: 'Memoria.Hardware DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Hardware)) where?: Where<Hardware>,
  ): Promise<Count> {
    return this.memoriaRepository.hardware(id).delete(where);
  }
}
