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
  Torre,
  Hardware,
} from '../models';
import {TorreRepository} from '../repositories';

export class TorreHardwareController {
  constructor(
    @repository(TorreRepository) protected torreRepository: TorreRepository,
  ) { }

  @get('/torres/{id}/hardware', {
    responses: {
      '200': {
        description: 'Torre has one Hardware',
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
    return this.torreRepository.hardware(id).get(filter);
  }

  @post('/torres/{id}/hardware', {
    responses: {
      '200': {
        description: 'Torre model instance',
        content: {'application/json': {schema: getModelSchemaRef(Hardware)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Torre.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hardware, {
            title: 'NewHardwareInTorre',
            exclude: ['id'],
            optional: ['torreId']
          }),
        },
      },
    }) hardware: Omit<Hardware, 'id'>,
  ): Promise<Hardware> {
    return this.torreRepository.hardware(id).create(hardware);
  }

  @patch('/torres/{id}/hardware', {
    responses: {
      '200': {
        description: 'Torre.Hardware PATCH success count',
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
    return this.torreRepository.hardware(id).patch(hardware, where);
  }

  @del('/torres/{id}/hardware', {
    responses: {
      '200': {
        description: 'Torre.Hardware DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Hardware)) where?: Where<Hardware>,
  ): Promise<Count> {
    return this.torreRepository.hardware(id).delete(where);
  }
}
