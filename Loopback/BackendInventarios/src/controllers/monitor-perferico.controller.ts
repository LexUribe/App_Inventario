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
  Monitor,
  Perferico,
} from '../models';
import {MonitorRepository} from '../repositories';

export class MonitorPerfericoController {
  constructor(
    @repository(MonitorRepository) protected monitorRepository: MonitorRepository,
  ) { }

  @get('/monitors/{id}/perferico', {
    responses: {
      '200': {
        description: 'Monitor has one Perferico',
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
    return this.monitorRepository.perferico(id).get(filter);
  }

  @post('/monitors/{id}/perferico', {
    responses: {
      '200': {
        description: 'Monitor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Perferico)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Monitor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perferico, {
            title: 'NewPerfericoInMonitor',
            exclude: ['id'],
            optional: ['monitorId']
          }),
        },
      },
    }) perferico: Omit<Perferico, 'id'>,
  ): Promise<Perferico> {
    return this.monitorRepository.perferico(id).create(perferico);
  }

  @patch('/monitors/{id}/perferico', {
    responses: {
      '200': {
        description: 'Monitor.Perferico PATCH success count',
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
    return this.monitorRepository.perferico(id).patch(perferico, where);
  }

  @del('/monitors/{id}/perferico', {
    responses: {
      '200': {
        description: 'Monitor.Perferico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Perferico)) where?: Where<Perferico>,
  ): Promise<Count> {
    return this.monitorRepository.perferico(id).delete(where);
  }
}
