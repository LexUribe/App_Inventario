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
import {Disco} from '../models';
import {DiscoRepository} from '../repositories';

export class DiscoController {
  constructor(
    @repository(DiscoRepository)
    public discoRepository : DiscoRepository,
  ) {}

  @post('/discos')
  @response(200, {
    description: 'Disco model instance',
    content: {'application/json': {schema: getModelSchemaRef(Disco)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Disco, {
            title: 'NewDisco',
            exclude: ['id'],
          }),
        },
      },
    })
    disco: Omit<Disco, 'id'>,
  ): Promise<Disco> {
    return this.discoRepository.create(disco);
  }

  @get('/discos/count')
  @response(200, {
    description: 'Disco model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Disco) where?: Where<Disco>,
  ): Promise<Count> {
    return this.discoRepository.count(where);
  }

  @get('/discos')
  @response(200, {
    description: 'Array of Disco model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Disco, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Disco) filter?: Filter<Disco>,
  ): Promise<Disco[]> {
    return this.discoRepository.find(filter);
  }

  @patch('/discos')
  @response(200, {
    description: 'Disco PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Disco, {partial: true}),
        },
      },
    })
    disco: Disco,
    @param.where(Disco) where?: Where<Disco>,
  ): Promise<Count> {
    return this.discoRepository.updateAll(disco, where);
  }

  @get('/discos/{id}')
  @response(200, {
    description: 'Disco model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Disco, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Disco, {exclude: 'where'}) filter?: FilterExcludingWhere<Disco>
  ): Promise<Disco> {
    return this.discoRepository.findById(id, filter);
  }

  @patch('/discos/{id}')
  @response(204, {
    description: 'Disco PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Disco, {partial: true}),
        },
      },
    })
    disco: Disco,
  ): Promise<void> {
    await this.discoRepository.updateById(id, disco);
  }

  @put('/discos/{id}')
  @response(204, {
    description: 'Disco PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() disco: Disco,
  ): Promise<void> {
    await this.discoRepository.replaceById(id, disco);
  }

  @del('/discos/{id}')
  @response(204, {
    description: 'Disco DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.discoRepository.deleteById(id);
  }
}
