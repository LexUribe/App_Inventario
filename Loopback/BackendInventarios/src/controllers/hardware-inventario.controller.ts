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
  Hardware,
  Inventario,
} from '../models';
import {HardwareRepository} from '../repositories';

export class HardwareInventarioController {
  constructor(
    @repository(HardwareRepository) protected hardwareRepository: HardwareRepository,
  ) { }

  @get('/hardware/{id}/inventario', {
    responses: {
      '200': {
        description: 'Hardware has one Inventario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Inventario),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inventario>,
  ): Promise<Inventario> {
    return this.hardwareRepository.inventario(id).get(filter);
  }

  @post('/hardware/{id}/inventario', {
    responses: {
      '200': {
        description: 'Hardware model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inventario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Hardware.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventario, {
            title: 'NewInventarioInHardware',
            exclude: ['id'],
            optional: ['hardwareId']
          }),
        },
      },
    }) inventario: Omit<Inventario, 'id'>,
  ): Promise<Inventario> {
    return this.hardwareRepository.inventario(id).create(inventario);
  }

  @patch('/hardware/{id}/inventario', {
    responses: {
      '200': {
        description: 'Hardware.Inventario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventario, {partial: true}),
        },
      },
    })
    inventario: Partial<Inventario>,
    @param.query.object('where', getWhereSchemaFor(Inventario)) where?: Where<Inventario>,
  ): Promise<Count> {
    return this.hardwareRepository.inventario(id).patch(inventario, where);
  }

  @del('/hardware/{id}/inventario', {
    responses: {
      '200': {
        description: 'Hardware.Inventario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inventario)) where?: Where<Inventario>,
  ): Promise<Count> {
    return this.hardwareRepository.inventario(id).delete(where);
  }
}
