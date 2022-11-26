import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Torre, TorreRelations, Hardware} from '../models';
import {HardwareRepository} from './hardware.repository';

export class TorreRepository extends DefaultCrudRepository<
  Torre,
  typeof Torre.prototype.id,
  TorreRelations
> {

  public readonly hardware: HasOneRepositoryFactory<Hardware, typeof Torre.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('HardwareRepository') protected hardwareRepositoryGetter: Getter<HardwareRepository>,
  ) {
    super(Torre, dataSource);
    this.hardware = this.createHasOneRepositoryFactoryFor('hardware', hardwareRepositoryGetter);
    this.registerInclusionResolver('hardware', this.hardware.inclusionResolver);
  }
}
