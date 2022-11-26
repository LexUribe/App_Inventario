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
import {Mouse} from '../models';
import {MouseRepository} from '../repositories';

export class MouseController {
  constructor(
    @repository(MouseRepository)
    public mouseRepository : MouseRepository,
  ) {}

  @post('/mice')
  @response(200, {
    description: 'Mouse model instance',
    content: {'application/json': {schema: getModelSchemaRef(Mouse)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mouse, {
            title: 'NewMouse',
            exclude: ['id'],
          }),
        },
      },
    })
    mouse: Omit<Mouse, 'id'>,
  ): Promise<Mouse> {
    return this.mouseRepository.create(mouse);
  }

  @get('/mice/count')
  @response(200, {
    description: 'Mouse model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Mouse) where?: Where<Mouse>,
  ): Promise<Count> {
    return this.mouseRepository.count(where);
  }

  @get('/mice')
  @response(200, {
    description: 'Array of Mouse model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Mouse, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Mouse) filter?: Filter<Mouse>,
  ): Promise<Mouse[]> {
    return this.mouseRepository.find(filter);
  }

  @patch('/mice')
  @response(200, {
    description: 'Mouse PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mouse, {partial: true}),
        },
      },
    })
    mouse: Mouse,
    @param.where(Mouse) where?: Where<Mouse>,
  ): Promise<Count> {
    return this.mouseRepository.updateAll(mouse, where);
  }

  @get('/mice/{id}')
  @response(200, {
    description: 'Mouse model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Mouse, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mouse, {exclude: 'where'}) filter?: FilterExcludingWhere<Mouse>
  ): Promise<Mouse> {
    return this.mouseRepository.findById(id, filter);
  }

  @patch('/mice/{id}')
  @response(204, {
    description: 'Mouse PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mouse, {partial: true}),
        },
      },
    })
    mouse: Mouse,
  ): Promise<void> {
    await this.mouseRepository.updateById(id, mouse);
  }

  @put('/mice/{id}')
  @response(204, {
    description: 'Mouse PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mouse: Mouse,
  ): Promise<void> {
    await this.mouseRepository.replaceById(id, mouse);
  }

  @del('/mice/{id}')
  @response(204, {
    description: 'Mouse DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mouseRepository.deleteById(id);
  }
}
