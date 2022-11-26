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
  Marca,
  Hardware,
} from '../models';
import {MarcaRepository} from '../repositories';

export class MarcaHardwareController {
  constructor(
    @repository(MarcaRepository) protected marcaRepository: MarcaRepository,
  ) { }

  @get('/marcas/{id}/hardware', {
    responses: {
      '200': {
        description: 'Array of Marca has many Hardware',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Hardware)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Hardware>,
  ): Promise<Hardware[]> {
    return this.marcaRepository.hardware(id).find(filter);
  }

  @post('/marcas/{id}/hardware', {
    responses: {
      '200': {
        description: 'Marca model instance',
        content: {'application/json': {schema: getModelSchemaRef(Hardware)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Marca.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hardware, {
            title: 'NewHardwareInMarca',
            exclude: ['id'],
            optional: ['marcaId']
          }),
        },
      },
    }) hardware: Omit<Hardware, 'id'>,
  ): Promise<Hardware> {
    return this.marcaRepository.hardware(id).create(hardware);
  }

  @patch('/marcas/{id}/hardware', {
    responses: {
      '200': {
        description: 'Marca.Hardware PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hardware, {partial: true}),
        },
      },
    })
    hardware: Partial<Hardware>,
    @param.query.object('where', getWhereSchemaFor(Hardware)) where?: Where<Hardware>,
  ): Promise<Count> {
    return this.marcaRepository.hardware(id).patch(hardware, where);
  }

  @del('/marcas/{id}/hardware', {
    responses: {
      '200': {
        description: 'Marca.Hardware DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Hardware)) where?: Where<Hardware>,
  ): Promise<Count> {
    return this.marcaRepository.hardware(id).delete(where);
  }
}
