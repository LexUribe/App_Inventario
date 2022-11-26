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
import {Memoria} from '../models';
import {MemoriaRepository} from '../repositories';

export class MemoriaController {
  constructor(
    @repository(MemoriaRepository)
    public memoriaRepository : MemoriaRepository,
  ) {}

  @post('/memorias')
  @response(200, {
    description: 'Memoria model instance',
    content: {'application/json': {schema: getModelSchemaRef(Memoria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Memoria, {
            title: 'NewMemoria',
            exclude: ['id'],
          }),
        },
      },
    })
    memoria: Omit<Memoria, 'id'>,
  ): Promise<Memoria> {
    return this.memoriaRepository.create(memoria);
  }

  @get('/memorias/count')
  @response(200, {
    description: 'Memoria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Memoria) where?: Where<Memoria>,
  ): Promise<Count> {
    return this.memoriaRepository.count(where);
  }

  @get('/memorias')
  @response(200, {
    description: 'Array of Memoria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Memoria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Memoria) filter?: Filter<Memoria>,
  ): Promise<Memoria[]> {
    return this.memoriaRepository.find(filter);
  }

  @patch('/memorias')
  @response(200, {
    description: 'Memoria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Memoria, {partial: true}),
        },
      },
    })
    memoria: Memoria,
    @param.where(Memoria) where?: Where<Memoria>,
  ): Promise<Count> {
    return this.memoriaRepository.updateAll(memoria, where);
  }

  @get('/memorias/{id}')
  @response(200, {
    description: 'Memoria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Memoria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Memoria, {exclude: 'where'}) filter?: FilterExcludingWhere<Memoria>
  ): Promise<Memoria> {
    return this.memoriaRepository.findById(id, filter);
  }

  @patch('/memorias/{id}')
  @response(204, {
    description: 'Memoria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Memoria, {partial: true}),
        },
      },
    })
    memoria: Memoria,
  ): Promise<void> {
    await this.memoriaRepository.updateById(id, memoria);
  }

  @put('/memorias/{id}')
  @response(204, {
    description: 'Memoria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() memoria: Memoria,
  ): Promise<void> {
    await this.memoriaRepository.replaceById(id, memoria);
  }

  @del('/memorias/{id}')
  @response(204, {
    description: 'Memoria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.memoriaRepository.deleteById(id);
  }
}
