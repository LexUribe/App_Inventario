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
  EquiposCompletos,
} from '../models';
import {MarcaRepository} from '../repositories';

export class MarcaEquiposCompletosController {
  constructor(
    @repository(MarcaRepository) protected marcaRepository: MarcaRepository,
  ) { }

  @get('/marcas/{id}/equipos-completos', {
    responses: {
      '200': {
        description: 'Array of Marca has many EquiposCompletos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EquiposCompletos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<EquiposCompletos>,
  ): Promise<EquiposCompletos[]> {
    return this.marcaRepository.equiposCompletos(id).find(filter);
  }

  @post('/marcas/{id}/equipos-completos', {
    responses: {
      '200': {
        description: 'Marca model instance',
        content: {'application/json': {schema: getModelSchemaRef(EquiposCompletos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Marca.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquiposCompletos, {
            title: 'NewEquiposCompletosInMarca',
            exclude: ['id'],
            optional: ['marcaId']
          }),
        },
      },
    }) equiposCompletos: Omit<EquiposCompletos, 'id'>,
  ): Promise<EquiposCompletos> {
    return this.marcaRepository.equiposCompletos(id).create(equiposCompletos);
  }

  @patch('/marcas/{id}/equipos-completos', {
    responses: {
      '200': {
        description: 'Marca.EquiposCompletos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquiposCompletos, {partial: true}),
        },
      },
    })
    equiposCompletos: Partial<EquiposCompletos>,
    @param.query.object('where', getWhereSchemaFor(EquiposCompletos)) where?: Where<EquiposCompletos>,
  ): Promise<Count> {
    return this.marcaRepository.equiposCompletos(id).patch(equiposCompletos, where);
  }

  @del('/marcas/{id}/equipos-completos', {
    responses: {
      '200': {
        description: 'Marca.EquiposCompletos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EquiposCompletos)) where?: Where<EquiposCompletos>,
  ): Promise<Count> {
    return this.marcaRepository.equiposCompletos(id).delete(where);
  }
}
