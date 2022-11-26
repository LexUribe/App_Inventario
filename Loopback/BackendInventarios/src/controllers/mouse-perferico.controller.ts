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
  Mouse,
  Perferico,
} from '../models';
import {MouseRepository} from '../repositories';

export class MousePerfericoController {
  constructor(
    @repository(MouseRepository) protected mouseRepository: MouseRepository,
  ) { }

  @get('/mice/{id}/perferico', {
    responses: {
      '200': {
        description: 'Mouse has one Perferico',
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
    return this.mouseRepository.perferico(id).get(filter);
  }

  @post('/mice/{id}/perferico', {
    responses: {
      '200': {
        description: 'Mouse model instance',
        content: {'application/json': {schema: getModelSchemaRef(Perferico)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mouse.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perferico, {
            title: 'NewPerfericoInMouse',
            exclude: ['id'],
            optional: ['mouseId']
          }),
        },
      },
    }) perferico: Omit<Perferico, 'id'>,
  ): Promise<Perferico> {
    return this.mouseRepository.perferico(id).create(perferico);
  }

  @patch('/mice/{id}/perferico', {
    responses: {
      '200': {
        description: 'Mouse.Perferico PATCH success count',
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
    return this.mouseRepository.perferico(id).patch(perferico, where);
  }

  @del('/mice/{id}/perferico', {
    responses: {
      '200': {
        description: 'Mouse.Perferico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Perferico)) where?: Where<Perferico>,
  ): Promise<Count> {
    return this.mouseRepository.perferico(id).delete(where);
  }
}
