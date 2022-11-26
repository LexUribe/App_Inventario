import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Motherboard, MotherboardRelations, Hardware} from '../models';
import {HardwareRepository} from './hardware.repository';

export class MotherboardRepository extends DefaultCrudRepository<
  Motherboard,
  typeof Motherboard.prototype.id,
  MotherboardRelations
> {

  public readonly hardware: HasOneRepositoryFactory<Hardware, typeof Motherboard.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('HardwareRepository') protected hardwareRepositoryGetter: Getter<HardwareRepository>,
  ) {
    super(Motherboard, dataSource);
    this.hardware = this.createHasOneRepositoryFactoryFor('hardware', hardwareRepositoryGetter);
    this.registerInclusionResolver('hardware', this.hardware.inclusionResolver);
  }
}
