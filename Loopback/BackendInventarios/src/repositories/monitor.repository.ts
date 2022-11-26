import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Monitor, MonitorRelations, Perferico} from '../models';
import {PerfericoRepository} from './perferico.repository';

export class MonitorRepository extends DefaultCrudRepository<
  Monitor,
  typeof Monitor.prototype.id,
  MonitorRelations
> {

  public readonly perferico: HasOneRepositoryFactory<Perferico, typeof Monitor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PerfericoRepository') protected perfericoRepositoryGetter: Getter<PerfericoRepository>,
  ) {
    super(Monitor, dataSource);
    this.perferico = this.createHasOneRepositoryFactoryFor('perferico', perfericoRepositoryGetter);
    this.registerInclusionResolver('perferico', this.perferico.inclusionResolver);
  }
}
