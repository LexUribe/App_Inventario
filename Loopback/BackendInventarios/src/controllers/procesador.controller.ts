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
import {Procesador} from '../models';
import {ProcesadorRepository} from '../repositories';

export class ProcesadorController {
  constructor(
    @repository(ProcesadorRepository)
    public procesadorRepository : ProcesadorRepository,
  ) {}

  @post('/procesadors')
  @response(200, {
    description: 'Procesador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Procesador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Procesador, {
            title: 'NewProcesador',
            exclude: ['id'],
          }),
        },
      },
    })
    procesador: Omit<Procesador, 'id'>,
  ): Promise<Procesador> {
    return this.procesadorRepository.create(procesador);
  }

  @get('/procesadors/count')
  @response(200, {
    description: 'Procesador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Procesador) where?: Where<Procesador>,
  ): Promise<Count> {
    return this.procesadorRepository.count(where);
  }

  @get('/procesadors')
  @response(200, {
    description: 'Array of Procesador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Procesador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Procesador) filter?: Filter<Procesador>,
  ): Promise<Procesador[]> {
    return this.procesadorRepository.find(filter);
  }

  @patch('/procesadors')
  @response(200, {
    description: 'Procesador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Procesador, {partial: true}),
        },
      },
    })
    procesador: Procesador,
    @param.where(Procesador) where?: Where<Procesador>,
  ): Promise<Count> {
    return this.procesadorRepository.updateAll(procesador, where);
  }

  @get('/procesadors/{id}')
  @response(200, {
    description: 'Procesador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Procesador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Procesador, {exclude: 'where'}) filter?: FilterExcludingWhere<Procesador>
  ): Promise<Procesador> {
    return this.procesadorRepository.findById(id, filter);
  }

  @patch('/procesadors/{id}')
  @response(204, {
    description: 'Procesador PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Procesador, {partial: true}),
        },
      },
    })
    procesador: Procesador,
  ): Promise<void> {
    await this.procesadorRepository.updateById(id, procesador);
  }

  @put('/procesadors/{id}')
  @response(204, {
    description: 'Procesador PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() procesador: Procesador,
  ): Promise<void> {
    await this.procesadorRepository.replaceById(id, procesador);
  }

  @del('/procesadors/{id}')
  @response(204, {
    description: 'Procesador DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.procesadorRepository.deleteById(id);
  }
}
