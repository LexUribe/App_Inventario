import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {EquiposCompletos} from '../models';
import {EquiposCompletosRepository} from '../repositories';

export class EquiposCompletosController {
  constructor(
    @repository(EquiposCompletosRepository)
    public equiposCompletosRepository : EquiposCompletosRepository,
  ) {}

  @post('/equipos-completos')
  @response(200, {
    description: 'EquiposCompletos model instance',
    content: {'application/json': {schema: getModelSchemaRef(EquiposCompletos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquiposCompletos, {
            title: 'NewEquiposCompletos',
            exclude: ['id'],
          }),
        },
      },
    })
    equiposCompletos: Omit<EquiposCompletos, 'id'>,
  ): Promise<EquiposCompletos> {
    return this.equiposCompletosRepository.create(equiposCompletos);
  }

  @get('/equipos-completos/count')
  @response(200, {
    description: 'EquiposCompletos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EquiposCompletos) where?: Where<EquiposCompletos>,
  ): Promise<Count> {
    return this.equiposCompletosRepository.count(where);
  }

  @get('/equipos-completos')
  @response(200, {
    description: 'Array of EquiposCompletos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EquiposCompletos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EquiposCompletos) filter?: Filter<EquiposCompletos>,
  ): Promise<EquiposCompletos[]> {
    return this.equiposCompletosRepository.find(filter);
  }

  @patch('/equipos-completos')
  @response(200, {
    description: 'EquiposCompletos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquiposCompletos, {partial: true}),
        },
      },
    })
    equiposCompletos: EquiposCompletos,
    @param.where(EquiposCompletos) where?: Where<EquiposCompletos>,
  ): Promise<Count> {
    return this.equiposCompletosRepository.updateAll(equiposCompletos, where);
  }

  @get('/equipos-completos/{id}')
  @response(200, {
    description: 'EquiposCompletos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EquiposCompletos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EquiposCompletos, {exclude: 'where'}) filter?: FilterExcludingWhere<EquiposCompletos>
  ): Promise<EquiposCompletos> {
    return this.equiposCompletosRepository.findById(id, filter);
  }

  @patch('/equipos-completos/{id}')
  @response(204, {
    description: 'EquiposCompletos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EquiposCompletos, {partial: true}),
        },
      },
    })
    equiposCompletos: EquiposCompletos,
  ): Promise<void> {
    await this.equiposCompletosRepository.updateById(id, equiposCompletos);
  }

  @put('/equipos-completos/{id}')
  @response(204, {
    description: 'EquiposCompletos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() equiposCompletos: EquiposCompletos,
  ): Promise<void> {
    await this.equiposCompletosRepository.replaceById(id, equiposCompletos);
  }

  @del('/equipos-completos/{id}')
  @response(204, {
    description: 'EquiposCompletos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.equiposCompletosRepository.deleteById(id);
  }
}
