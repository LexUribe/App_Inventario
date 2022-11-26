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
import {Teclado} from '../models';
import {TecladoRepository} from '../repositories';

export class TecladoController {
  constructor(
    @repository(TecladoRepository)
    public tecladoRepository : TecladoRepository,
  ) {}

  @post('/teclados')
  @response(200, {
    description: 'Teclado model instance',
    content: {'application/json': {schema: getModelSchemaRef(Teclado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Teclado, {
            title: 'NewTeclado',
            exclude: ['id'],
          }),
        },
      },
    })
    teclado: Omit<Teclado, 'id'>,
  ): Promise<Teclado> {
    return this.tecladoRepository.create(teclado);
  }

  @get('/teclados/count')
  @response(200, {
    description: 'Teclado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Teclado) where?: Where<Teclado>,
  ): Promise<Count> {
    return this.tecladoRepository.count(where);
  }

  @get('/teclados')
  @response(200, {
    description: 'Array of Teclado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Teclado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Teclado) filter?: Filter<Teclado>,
  ): Promise<Teclado[]> {
    return this.tecladoRepository.find(filter);
  }

  @patch('/teclados')
  @response(200, {
    description: 'Teclado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Teclado, {partial: true}),
        },
      },
    })
    teclado: Teclado,
    @param.where(Teclado) where?: Where<Teclado>,
  ): Promise<Count> {
    return this.tecladoRepository.updateAll(teclado, where);
  }

  @get('/teclados/{id}')
  @response(200, {
    description: 'Teclado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Teclado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Teclado, {exclude: 'where'}) filter?: FilterExcludingWhere<Teclado>
  ): Promise<Teclado> {
    return this.tecladoRepository.findById(id, filter);
  }

  @patch('/teclados/{id}')
  @response(204, {
    description: 'Teclado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Teclado, {partial: true}),
        },
      },
    })
    teclado: Teclado,
  ): Promise<void> {
    await this.tecladoRepository.updateById(id, teclado);
  }

  @put('/teclados/{id}')
  @response(204, {
    description: 'Teclado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() teclado: Teclado,
  ): Promise<void> {
    await this.tecladoRepository.replaceById(id, teclado);
  }

  @del('/teclados/{id}')
  @response(204, {
    description: 'Teclado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tecladoRepository.deleteById(id);
  }
}
