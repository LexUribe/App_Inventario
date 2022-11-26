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
import {Perferico} from '../models';
import {PerfericoRepository} from '../repositories';

export class PerifericoController {
  constructor(
    @repository(PerfericoRepository)
    public perfericoRepository : PerfericoRepository,
  ) {}

  @post('/perfericos')
  @response(200, {
    description: 'Perferico model instance',
    content: {'application/json': {schema: getModelSchemaRef(Perferico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perferico, {
            title: 'NewPerferico',
            exclude: ['id'],
          }),
        },
      },
    })
    perferico: Omit<Perferico, 'id'>,
  ): Promise<Perferico> {
    return this.perfericoRepository.create(perferico);
  }

  @get('/perfericos/count')
  @response(200, {
    description: 'Perferico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Perferico) where?: Where<Perferico>,
  ): Promise<Count> {
    return this.perfericoRepository.count(where);
  }

  @get('/perfericos')
  @response(200, {
    description: 'Array of Perferico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Perferico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Perferico) filter?: Filter<Perferico>,
  ): Promise<Perferico[]> {
    return this.perfericoRepository.find(filter);
  }

  @patch('/perfericos')
  @response(200, {
    description: 'Perferico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perferico, {partial: true}),
        },
      },
    })
    perferico: Perferico,
    @param.where(Perferico) where?: Where<Perferico>,
  ): Promise<Count> {
    return this.perfericoRepository.updateAll(perferico, where);
  }

  @get('/perfericos/{id}')
  @response(200, {
    description: 'Perferico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Perferico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Perferico, {exclude: 'where'}) filter?: FilterExcludingWhere<Perferico>
  ): Promise<Perferico> {
    return this.perfericoRepository.findById(id, filter);
  }

  @patch('/perfericos/{id}')
  @response(204, {
    description: 'Perferico PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perferico, {partial: true}),
        },
      },
    })
    perferico: Perferico,
  ): Promise<void> {
    await this.perfericoRepository.updateById(id, perferico);
  }

  @put('/perfericos/{id}')
  @response(204, {
    description: 'Perferico PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() perferico: Perferico,
  ): Promise<void> {
    await this.perfericoRepository.replaceById(id, perferico);
  }

  @del('/perfericos/{id}')
  @response(204, {
    description: 'Perferico DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.perfericoRepository.deleteById(id);
  }
}
