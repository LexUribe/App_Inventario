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
  Disco,
  Hardware,
} from '../models';
import {DiscoRepository} from '../repositories';

export class DiscoHardwareController {
  constructor(
    @repository(DiscoRepository) protected discoRepository: DiscoRepository,
  ) { }

  @get('/discos/{id}/hardware', {
    responses: {
      '200': {
        description: 'Disco has one Hardware',
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
    return this.discoRepository.hardware(id).get(filter);
  }

  @post('/discos/{id}/hardware', {
    responses: {
      '200': {
        description: 'Disco model instance',
        content: {'application/json': {schema: getModelSchemaRef(Hardware)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Disco.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hardware, {
            title: 'NewHardwareInDisco',
            exclude: ['id'],
            optional: ['discoId']
          }),
        },
      },
    }) hardware: Omit<Hardware, 'id'>,
  ): Promise<Hardware> {
    return this.discoRepository.hardware(id).create(hardware);
  }

  @patch('/discos/{id}/hardware', {
    responses: {
      '200': {
        description: 'Disco.Hardware PATCH success count',
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
    return this.discoRepository.hardware(id).patch(hardware, where);
  }

  @del('/discos/{id}/hardware', {
    responses: {
      '200': {
        description: 'Disco.Hardware DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Hardware)) where?: Where<Hardware>,
  ): Promise<Count> {
    return this.discoRepository.hardware(id).delete(where);
  }
}
