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
  Teclado,
  Perferico,
} from '../models';
import {TecladoRepository} from '../repositories';

export class TecladoPerfericoController {
  constructor(
    @repository(TecladoRepository) protected tecladoRepository: TecladoRepository,
  ) { }

  @get('/teclados/{id}/perferico', {
    responses: {
      '200': {
        description: 'Teclado has one Perferico',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Perferico),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Perferico>,
  ): Promise<Perferico> {
    return this.tecladoRepository.perferico(id).get(filter);
  }

  @post('/teclados/{id}/perferico', {
    responses: {
      '200': {
        description: 'Teclado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Perferico)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Teclado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perferico, {
            title: 'NewPerfericoInTeclado',
            exclude: ['id'],
            optional: ['tecladoId']
          }),
        },
      },
    }) perferico: Omit<Perferico, 'id'>,
  ): Promise<Perferico> {
    return this.tecladoRepository.perferico(id).create(perferico);
  }

  @patch('/teclados/{id}/perferico', {
    responses: {
      '200': {
        description: 'Teclado.Perferico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perferico, {partial: true}),
        },
      },
    })
    perferico: Partial<Perferico>,
    @param.query.object('where', getWhereSchemaFor(Perferico)) where?: Where<Perferico>,
  ): Promise<Count> {
    return this.tecladoRepository.perferico(id).patch(perferico, where);
  }

  @del('/teclados/{id}/perferico', {
    responses: {
      '200': {
        description: 'Teclado.Perferico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Perferico)) where?: Where<Perferico>,
  ): Promise<Count> {
    return this.tecladoRepository.perferico(id).delete(where);
  }
}
