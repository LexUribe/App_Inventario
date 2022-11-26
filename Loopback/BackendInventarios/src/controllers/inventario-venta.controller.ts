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
  Venta,
} from '../models';
import {InventarioRepository} from '../repositories';

export class InventarioVentaController {
  constructor(
    @repository(InventarioRepository) protected inventarioRepository: InventarioRepository,
  ) { }

  @get('/inventarios/{id}/venta', {
    responses: {
      '200': {
        description: 'Inventario has one Venta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Venta),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Venta>,
  ): Promise<Venta> {
    return this.inventarioRepository.venta(id).get(filter);
  }

  @post('/inventarios/{id}/venta', {
    responses: {
      '200': {
        description: 'Inventario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Venta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inventario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {
            title: 'NewVentaInInventario',
            exclude: ['id'],
            optional: ['inventarioId']
          }),
        },
      },
    }) venta: Omit<Venta, 'id'>,
  ): Promise<Venta> {
    return this.inventarioRepository.venta(id).create(venta);
  }

  @patch('/inventarios/{id}/venta', {
    responses: {
      '200': {
        description: 'Inventario.Venta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {partial: true}),
        },
      },
    })
    venta: Partial<Venta>,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.inventarioRepository.venta(id).patch(venta, where);
  }

  @del('/inventarios/{id}/venta', {
    responses: {
      '200': {
        description: 'Inventario.Venta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.inventarioRepository.venta(id).delete(where);
  }
}
