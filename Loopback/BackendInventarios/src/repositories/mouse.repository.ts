import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mouse, MouseRelations, Perferico} from '../models';
import {PerfericoRepository} from './perferico.repository';

export class MouseRepository extends DefaultCrudRepository<
  Mouse,
  typeof Mouse.prototype.id,
  MouseRelations
> {

  public readonly perferico: HasOneRepositoryFactory<Perferico, typeof Mouse.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PerfericoRepository') protected perfericoRepositoryGetter: Getter<PerfericoRepository>,
  ) {
    super(Mouse, dataSource);
    this.perferico = this.createHasOneRepositoryFactoryFor('perferico', perfericoRepositoryGetter);
    this.registerInclusionResolver('perferico', this.perferico.inclusionResolver);
  }
}
