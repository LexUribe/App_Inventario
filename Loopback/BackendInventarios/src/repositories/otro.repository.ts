import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Otro, OtroRelations, Perferico} from '../models';
import {PerfericoRepository} from './perferico.repository';

export class OtroRepository extends DefaultCrudRepository<
  Otro,
  typeof Otro.prototype.id,
  OtroRelations
> {

  public readonly perferico: HasOneRepositoryFactory<Perferico, typeof Otro.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PerfericoRepository') protected perfericoRepositoryGetter: Getter<PerfericoRepository>,
  ) {
    super(Otro, dataSource);
    this.perferico = this.createHasOneRepositoryFactoryFor('perferico', perfericoRepositoryGetter);
    this.registerInclusionResolver('perferico', this.perferico.inclusionResolver);
  }
}
