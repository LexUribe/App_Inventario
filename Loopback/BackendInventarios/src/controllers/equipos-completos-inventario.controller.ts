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
  EquiposCompletos,
  Inventario,
} from '../models';
import {EquiposCompletosRepository} from '../repositories';

export class EquiposCompletosInventarioController {
  constructor(
    @repository(EquiposCompletosRepository) protected equiposCompletosRepository: EquiposCompletosRepository,
  ) { }

  @get('/equipos-completos/{id}/inventario', {
    responses: {
      '200': {
        description: 'EquiposCompletos has one Inventario',
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
    return this.equiposCompletosRepository.inventario(id).get(filter);
  }

  @post('/equipos-completos/{id}/inventario', {
    responses: {
      '200': {
        description: 'EquiposCompletos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inventario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof EquiposCompletos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventario, {
            title: 'NewInventarioInEquiposCompletos',
            exclude: ['id'],
            optional: ['equiposCompletosId']
          }),
        },
      },
    }) inventario: Omit<Inventario, 'id'>,
  ): Promise<Inventario> {
    return this.equiposCompletosRepository.inventario(id).create(inventario);
  }

  @patch('/equipos-completos/{id}/inventario', {
    responses: {
      '200': {
        description: 'EquiposCompletos.Inventario PATCH success count',
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
    return this.equiposCompletosRepository.inventario(id).patch(inventario, where);
  }

  @del('/equipos-completos/{id}/inventario', {
    responses: {
      '200': {
        description: 'EquiposCompletos.Inventario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inventario)) where?: Where<Inventario>,
  ): Promise<Count> {
    return this.equiposCompletosRepository.inventario(id).delete(where);
  }
}
