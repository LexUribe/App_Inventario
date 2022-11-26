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
  Marca,
  Perferico,
} from '../models';
import {MarcaRepository} from '../repositories';

export class MarcaPerfericoController {
  constructor(
    @repository(MarcaRepository) protected marcaRepository: MarcaRepository,
  ) { }

  @get('/marcas/{id}/perfericos', {
    responses: {
      '200': {
        description: 'Array of Marca has many Perferico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Perferico)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Perferico>,
  ): Promise<Perferico[]> {
    return this.marcaRepository.perfericos(id).find(filter);
  }

  @post('/marcas/{id}/perfericos', {
    responses: {
      '200': {
        description: 'Marca model instance',
        content: {'application/json': {schema: getModelSchemaRef(Perferico)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Marca.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perferico, {
            title: 'NewPerfericoInMarca',
            exclude: ['id'],
            optional: ['marcaId']
          }),
        },
      },
    }) perferico: Omit<Perferico, 'id'>,
  ): Promise<Perferico> {
    return this.marcaRepository.perfericos(id).create(perferico);
  }

  @patch('/marcas/{id}/perfericos', {
    responses: {
      '200': {
        description: 'Marca.Perferico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perferico, {partial: true}),
        },
      },
    })
    perferico: Partial<Perferico>,
    @param.query.object('where', getWhereSchemaFor(Perferico)) where?: Where<Perferico>,
  ): Promise<Count> {
    return this.marcaRepository.perfericos(id).patch(perferico, where);
  }

  @del('/marcas/{id}/perfericos', {
    responses: {
      '200': {
        description: 'Marca.Perferico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Perferico)) where?: Where<Perferico>,
  ): Promise<Count> {
    return this.marcaRepository.perfericos(id).delete(where);
  }
}
