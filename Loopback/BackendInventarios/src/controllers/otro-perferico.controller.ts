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
  Otro,
  Perferico,
} from '../models';
import {OtroRepository} from '../repositories';

export class OtroPerfericoController {
  constructor(
    @repository(OtroRepository) protected otroRepository: OtroRepository,
  ) { }

  @get('/otros/{id}/perferico', {
    responses: {
      '200': {
        description: 'Otro has one Perferico',
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
    return this.otroRepository.perferico(id).get(filter);
  }

  @post('/otros/{id}/perferico', {
    responses: {
      '200': {
        description: 'Otro model instance',
        content: {'application/json': {schema: getModelSchemaRef(Perferico)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Otro.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perferico, {
            title: 'NewPerfericoInOtro',
            exclude: ['id'],
            optional: ['otroId']
          }),
        },
      },
    }) perferico: Omit<Perferico, 'id'>,
  ): Promise<Perferico> {
    return this.otroRepository.perferico(id).create(perferico);
  }

  @patch('/otros/{id}/perferico', {
    responses: {
      '200': {
        description: 'Otro.Perferico PATCH success count',
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
    return this.otroRepository.perferico(id).patch(perferico, where);
  }

  @del('/otros/{id}/perferico', {
    responses: {
      '200': {
        description: 'Otro.Perferico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Perferico)) where?: Where<Perferico>,
  ): Promise<Count> {
    return this.otroRepository.perferico(id).delete(where);
  }
}
