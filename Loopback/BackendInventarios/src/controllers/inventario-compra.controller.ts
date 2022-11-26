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
  Inventario,
  Compra,
} from '../models';
import {InventarioRepository} from '../repositories';

export class InventarioCompraController {
  constructor(
    @repository(InventarioRepository) protected inventarioRepository: InventarioRepository,
  ) { }

  @get('/inventarios/{id}/compra', {
    responses: {
      '200': {
        description: 'Inventario has one Compra',
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
    return this.inventarioRepository.compra(id).get(filter);
  }

  @post('/inventarios/{id}/compra', {
    responses: {
      '200': {
        description: 'Inventario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Compra)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inventario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compra, {
            title: 'NewCompraInInventario',
            exclude: ['id'],
            optional: ['inventarioId']
          }),
        },
      },
    }) compra: Omit<Compra, 'id'>,
  ): Promise<Compra> {
    return this.inventarioRepository.compra(id).create(compra);
  }

  @patch('/inventarios/{id}/compra', {
    responses: {
      '200': {
        description: 'Inventario.Compra PATCH success count',
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
    return this.inventarioRepository.compra(id).patch(compra, where);
  }

  @del('/inventarios/{id}/compra', {
    responses: {
      '200': {
        description: 'Inventario.Compra DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Compra)) where?: Where<Compra>,
  ): Promise<Count> {
    return this.inventarioRepository.compra(id).delete(where);
  }
}
