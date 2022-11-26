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
import {Motherboard} from '../models';
import {MotherboardRepository} from '../repositories';

export class MotherboardController {
  constructor(
    @repository(MotherboardRepository)
    public motherboardRepository : MotherboardRepository,
  ) {}

  @post('/motherboards')
  @response(200, {
    description: 'Motherboard model instance',
    content: {'application/json': {schema: getModelSchemaRef(Motherboard)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Motherboard, {
            title: 'NewMotherboard',
            exclude: ['id'],
          }),
        },
      },
    })
    motherboard: Omit<Motherboard, 'id'>,
  ): Promise<Motherboard> {
    return this.motherboardRepository.create(motherboard);
  }

  @get('/motherboards/count')
  @response(200, {
    description: 'Motherboard model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Motherboard) where?: Where<Motherboard>,
  ): Promise<Count> {
    return this.motherboardRepository.count(where);
  }

  @get('/motherboards')
  @response(200, {
    description: 'Array of Motherboard model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Motherboard, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Motherboard) filter?: Filter<Motherboard>,
  ): Promise<Motherboard[]> {
    return this.motherboardRepository.find(filter);
  }

  @patch('/motherboards')
  @response(200, {
    description: 'Motherboard PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Motherboard, {partial: true}),
        },
      },
    })
    motherboard: Motherboard,
    @param.where(Motherboard) where?: Where<Motherboard>,
  ): Promise<Count> {
    return this.motherboardRepository.updateAll(motherboard, where);
  }

  @get('/motherboards/{id}')
  @response(200, {
    description: 'Motherboard model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Motherboard, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Motherboard, {exclude: 'where'}) filter?: FilterExcludingWhere<Motherboard>
  ): Promise<Motherboard> {
    return this.motherboardRepository.findById(id, filter);
  }

  @patch('/motherboards/{id}')
  @response(204, {
    description: 'Motherboard PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Motherboard, {partial: true}),
        },
      },
    })
    motherboard: Motherboard,
  ): Promise<void> {
    await this.motherboardRepository.updateById(id, motherboard);
  }

  @put('/motherboards/{id}')
  @response(204, {
    description: 'Motherboard PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() motherboard: Motherboard,
  ): Promise<void> {
    await this.motherboardRepository.replaceById(id, motherboard);
  }

  @del('/motherboards/{id}')
  @response(204, {
    description: 'Motherboard DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.motherboardRepository.deleteById(id);
  }
}
