import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Hardware, HardwareRelations, Inventario} from '../models';
import {InventarioRepository} from './inventario.repository';

export class HardwareRepository extends DefaultCrudRepository<
  Hardware,
  typeof Hardware.prototype.id,
  HardwareRelations
> {

  public readonly inventario: HasOneRepositoryFactory<Inventario, typeof Hardware.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InventarioRepository') protected inventarioRepositoryGetter: Getter<InventarioRepository>,
  ) {
    super(Hardware, dataSource);
    this.inventario = this.createHasOneRepositoryFactoryFor('inventario', inventarioRepositoryGetter);
    this.registerInclusionResolver('inventario', this.inventario.inclusionResolver);
  }
}
