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
  Perferico,
  Inventario,
} from '../models';
import {PerfericoRepository} from '../repositories';

export class PerfericoInventarioController {
  constructor(
    @repository(PerfericoRepository) protected perfericoRepository: PerfericoRepository,
  ) { }

  @get('/perfericos/{id}/inventario', {
    responses: {
      '200': {
        description: 'Perferico has one Inventario',
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
    return this.perfericoRepository.inventario(id).get(filter);
  }

  @post('/perfericos/{id}/inventario', {
    responses: {
      '200': {
        description: 'Perferico model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inventario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Perferico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventario, {
            title: 'NewInventarioInPerferico',
            exclude: ['id'],
            optional: ['perfericoId']
          }),
        },
      },
    }) inventario: Omit<Inventario, 'id'>,
  ): Promise<Inventario> {
    return this.perfericoRepository.inventario(id).create(inventario);
  }

  @patch('/perfericos/{id}/inventario', {
    responses: {
      '200': {
        description: 'Perferico.Inventario PATCH success count',
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
    return this.perfericoRepository.inventario(id).patch(inventario, where);
  }

  @del('/perfericos/{id}/inventario', {
    responses: {
      '200': {
        description: 'Perferico.Inventario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inventario)) where?: Where<Inventario>,
  ): Promise<Count> {
    return this.perfericoRepository.inventario(id).delete(where);
  }
}
