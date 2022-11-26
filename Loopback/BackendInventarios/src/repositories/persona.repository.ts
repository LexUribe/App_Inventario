import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Factura, Venta, Compra, Marca} from '../models';
import {FacturaRepository} from './factura.repository';
import {VentaRepository} from './venta.repository';
import {CompraRepository} from './compra.repository';
import {MarcaRepository} from './marca.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly facturas: HasManyRepositoryFactory<Factura, typeof Persona.prototype.id>;

  public readonly ventas: HasManyRepositoryFactory<Venta, typeof Persona.prototype.id>;

  public readonly compras: HasManyRepositoryFactory<Compra, typeof Persona.prototype.id>;

  public readonly marcas: HasManyRepositoryFactory<Marca, typeof Persona.prototype.id>;

  public readonly compra: HasOneRepositoryFactory<Compra, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>, @repository.getter('CompraRepository') protected compraRepositoryGetter: Getter<CompraRepository>, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>,
  ) {
    super(Persona, dataSource);
    this.compra = this.createHasOneRepositoryFactoryFor('compra', compraRepositoryGetter);
    this.registerInclusionResolver('compra', this.compra.inclusionResolver);
    this.marcas = this.createHasManyRepositoryFactoryFor('marcas', marcaRepositoryGetter,);
    this.registerInclusionResolver('marcas', this.marcas.inclusionResolver);
    this.compras = this.createHasManyRepositoryFactoryFor('compras', compraRepositoryGetter,);
    this.registerInclusionResolver('compras', this.compras.inclusionResolver);
    this.ventas = this.createHasManyRepositoryFactoryFor('ventas', ventaRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
    this.facturas = this.createHasManyRepositoryFactoryFor('facturas', facturaRepositoryGetter,);
    this.registerInclusionResolver('facturas', this.facturas.inclusionResolver);
  }
}
