import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Perferico, PerfericoRelations, Inventario} from '../models';
import {InventarioRepository} from './inventario.repository';

export class PerfericoRepository extends DefaultCrudRepository<
  Perferico,
  typeof Perferico.prototype.id,
  PerfericoRelations
> {

  public readonly inventario: HasOneRepositoryFactory<Inventario, typeof Perferico.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InventarioRepository') protected inventarioRepositoryGetter: Getter<InventarioRepository>,
  ) {
    super(Perferico, dataSource);
    this.inventario = this.createHasOneRepositoryFactoryFor('inventario', inventarioRepositoryGetter);
    this.registerInclusionResolver('inventario', this.inventario.inclusionResolver);
  }
}
