import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inventario, InventarioRelations, Venta, Compra} from '../models';
import {VentaRepository} from './venta.repository';
import {CompraRepository} from './compra.repository';

export class InventarioRepository extends DefaultCrudRepository<
  Inventario,
  typeof Inventario.prototype.id,
  InventarioRelations
> {

  public readonly venta: HasOneRepositoryFactory<Venta, typeof Inventario.prototype.id>;

  public readonly compra: HasOneRepositoryFactory<Compra, typeof Inventario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>, @repository.getter('CompraRepository') protected compraRepositoryGetter: Getter<CompraRepository>,
  ) {
    super(Inventario, dataSource);
    this.compra = this.createHasOneRepositoryFactoryFor('compra', compraRepositoryGetter);
    this.registerInclusionResolver('compra', this.compra.inclusionResolver);
    this.venta = this.createHasOneRepositoryFactoryFor('venta', ventaRepositoryGetter);
    this.registerInclusionResolver('venta', this.venta.inclusionResolver);
  }
}
