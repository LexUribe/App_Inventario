import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {EquiposCompletos, EquiposCompletosRelations, Inventario} from '../models';
import {InventarioRepository} from './inventario.repository';

export class EquiposCompletosRepository extends DefaultCrudRepository<
  EquiposCompletos,
  typeof EquiposCompletos.prototype.id,
  EquiposCompletosRelations
> {

  public readonly inventario: HasOneRepositoryFactory<Inventario, typeof EquiposCompletos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InventarioRepository') protected inventarioRepositoryGetter: Getter<InventarioRepository>,
  ) {
    super(EquiposCompletos, dataSource);
    this.inventario = this.createHasOneRepositoryFactoryFor('inventario', inventarioRepositoryGetter);
    this.registerInclusionResolver('inventario', this.inventario.inclusionResolver);
  }
}
