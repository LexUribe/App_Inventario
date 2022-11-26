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
  Procesador,
  Hardware,
} from '../models';
import {ProcesadorRepository} from '../repositories';

export class ProcesadorHardwareController {
  constructor(
    @repository(ProcesadorRepository) protected procesadorRepository: ProcesadorRepository,
  ) { }

  @get('/procesadors/{id}/hardware', {
    responses: {
      '200': {
        description: 'Procesador has one Hardware',
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
    return this.procesadorRepository.hardware(id).get(filter);
  }

  @post('/procesadors/{id}/hardware', {
    responses: {
      '200': {
        description: 'Procesador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Hardware)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Procesador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hardware, {
            title: 'NewHardwareInProcesador',
            exclude: ['id'],
            optional: ['procesadorId']
          }),
        },
      },
    }) hardware: Omit<Hardware, 'id'>,
  ): Promise<Hardware> {
    return this.procesadorRepository.hardware(id).create(hardware);
  }

  @patch('/procesadors/{id}/hardware', {
    responses: {
      '200': {
        description: 'Procesador.Hardware PATCH success count',
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
    return this.procesadorRepository.hardware(id).patch(hardware, where);
  }

  @del('/procesadors/{id}/hardware', {
    responses: {
      '200': {
        description: 'Procesador.Hardware DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Hardware)) where?: Where<Hardware>,
  ): Promise<Count> {
    return this.procesadorRepository.hardware(id).delete(where);
  }
}
