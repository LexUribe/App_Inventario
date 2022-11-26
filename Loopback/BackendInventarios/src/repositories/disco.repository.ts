import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Disco, DiscoRelations, Hardware} from '../models';
import {HardwareRepository} from './hardware.repository';

export class DiscoRepository extends DefaultCrudRepository<
  Disco,
  typeof Disco.prototype.id,
  DiscoRelations
> {

  public readonly hardware: HasOneRepositoryFactory<Hardware, typeof Disco.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('HardwareRepository') protected hardwareRepositoryGetter: Getter<HardwareRepository>,
  ) {
    super(Disco, dataSource);
    this.hardware = this.createHasOneRepositoryFactoryFor('hardware', hardwareRepositoryGetter);
    this.registerInclusionResolver('hardware', this.hardware.inclusionResolver);
  }
}
