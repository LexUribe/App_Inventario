import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Memoria, MemoriaRelations, Hardware} from '../models';
import {HardwareRepository} from './hardware.repository';

export class MemoriaRepository extends DefaultCrudRepository<
  Memoria,
  typeof Memoria.prototype.id,
  MemoriaRelations
> {

  public readonly hardware: HasOneRepositoryFactory<Hardware, typeof Memoria.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('HardwareRepository') protected hardwareRepositoryGetter: Getter<HardwareRepository>,
  ) {
    super(Memoria, dataSource);
    this.hardware = this.createHasOneRepositoryFactoryFor('hardware', hardwareRepositoryGetter);
    this.registerInclusionResolver('hardware', this.hardware.inclusionResolver);
  }
}
