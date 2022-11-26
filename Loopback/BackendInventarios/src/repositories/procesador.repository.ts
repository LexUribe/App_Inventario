import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Procesador, ProcesadorRelations, Hardware} from '../models';
import {HardwareRepository} from './hardware.repository';

export class ProcesadorRepository extends DefaultCrudRepository<
  Procesador,
  typeof Procesador.prototype.id,
  ProcesadorRelations
> {

  public readonly hardware: HasOneRepositoryFactory<Hardware, typeof Procesador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('HardwareRepository') protected hardwareRepositoryGetter: Getter<HardwareRepository>,
  ) {
    super(Procesador, dataSource);
    this.hardware = this.createHasOneRepositoryFactoryFor('hardware', hardwareRepositoryGetter);
    this.registerInclusionResolver('hardware', this.hardware.inclusionResolver);
  }
}
