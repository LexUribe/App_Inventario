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
  Motherboard,
  Hardware,
} from '../models';
import {MotherboardRepository} from '../repositories';

export class MotherboardHardwareController {
  constructor(
    @repository(MotherboardRepository) protected motherboardRepository: MotherboardRepository,
  ) { }

  @get('/motherboards/{id}/hardware', {
    responses: {
      '200': {
        description: 'Motherboard has one Hardware',
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
    return this.motherboardRepository.hardware(id).get(filter);
  }

  @post('/motherboards/{id}/hardware', {
    responses: {
      '200': {
        description: 'Motherboard model instance',
        content: {'application/json': {schema: getModelSchemaRef(Hardware)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Motherboard.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hardware, {
            title: 'NewHardwareInMotherboard',
            exclude: ['id'],
            optional: ['motherboardId']
          }),
        },
      },
    }) hardware: Omit<Hardware, 'id'>,
  ): Promise<Hardware> {
    return this.motherboardRepository.hardware(id).create(hardware);
  }

  @patch('/motherboards/{id}/hardware', {
    responses: {
      '200': {
        description: 'Motherboard.Hardware PATCH success count',
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
    return this.motherboardRepository.hardware(id).patch(hardware, where);
  }

  @del('/motherboards/{id}/hardware', {
    responses: {
      '200': {
        description: 'Motherboard.Hardware DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Hardware)) where?: Where<Hardware>,
  ): Promise<Count> {
    return this.motherboardRepository.hardware(id).delete(where);
  }
}
