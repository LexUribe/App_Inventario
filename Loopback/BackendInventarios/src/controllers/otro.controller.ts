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
import {Otro} from '../models';
import {OtroRepository} from '../repositories';

export class OtroController {
  constructor(
    @repository(OtroRepository)
    public otroRepository : OtroRepository,
  ) {}

  @post('/otros')
  @response(200, {
    description: 'Otro model instance',
    content: {'application/json': {schema: getModelSchemaRef(Otro)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Otro, {
            title: 'NewOtro',
            exclude: ['id'],
          }),
        },
      },
    })
    otro: Omit<Otro, 'id'>,
  ): Promise<Otro> {
    return this.otroRepository.create(otro);
  }

  @get('/otros/count')
  @response(200, {
    description: 'Otro model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Otro) where?: Where<Otro>,
  ): Promise<Count> {
    return this.otroRepository.count(where);
  }

  @get('/otros')
  @response(200, {
    description: 'Array of Otro model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Otro, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Otro) filter?: Filter<Otro>,
  ): Promise<Otro[]> {
    return this.otroRepository.find(filter);
  }

  @patch('/otros')
  @response(200, {
    description: 'Otro PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Otro, {partial: true}),
        },
      },
    })
    otro: Otro,
    @param.where(Otro) where?: Where<Otro>,
  ): Promise<Count> {
    return this.otroRepository.updateAll(otro, where);
  }

  @get('/otros/{id}')
  @response(200, {
    description: 'Otro model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Otro, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Otro, {exclude: 'where'}) filter?: FilterExcludingWhere<Otro>
  ): Promise<Otro> {
    return this.otroRepository.findById(id, filter);
  }

  @patch('/otros/{id}')
  @response(204, {
    description: 'Otro PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Otro, {partial: true}),
        },
      },
    })
    otro: Otro,
  ): Promise<void> {
    await this.otroRepository.updateById(id, otro);
  }

  @put('/otros/{id}')
  @response(204, {
    description: 'Otro PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() otro: Otro,
  ): Promise<void> {
    await this.otroRepository.replaceById(id, otro);
  }

  @del('/otros/{id}')
  @response(204, {
    description: 'Otro DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.otroRepository.deleteById(id);
  }
}
