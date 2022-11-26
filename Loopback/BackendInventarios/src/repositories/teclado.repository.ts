import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Teclado, TecladoRelations, Perferico} from '../models';
import {PerfericoRepository} from './perferico.repository';

export class TecladoRepository extends DefaultCrudRepository<
  Teclado,
  typeof Teclado.prototype.id,
  TecladoRelations
> {

  public readonly perferico: HasOneRepositoryFactory<Perferico, typeof Teclado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PerfericoRepository') protected perfericoRepositoryGetter: Getter<PerfericoRepository>,
  ) {
    super(Teclado, dataSource);
    this.perferico = this.createHasOneRepositoryFactoryFor('perferico', perfericoRepositoryGetter);
    this.registerInclusionResolver('perferico', this.perferico.inclusionResolver);
  }
}
