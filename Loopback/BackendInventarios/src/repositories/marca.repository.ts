import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Marca, MarcaRelations, Hardware, EquiposCompletos, Perferico} from '../models';
import {HardwareRepository} from './hardware.repository';
import {EquiposCompletosRepository} from './equipos-completos.repository';
import {PerfericoRepository} from './perferico.repository';

export class MarcaRepository extends DefaultCrudRepository<
  Marca,
  typeof Marca.prototype.id,
  MarcaRelations
> {

  public readonly hardware: HasManyRepositoryFactory<Hardware, typeof Marca.prototype.id>;

  public readonly equiposCompletos: HasManyRepositoryFactory<EquiposCompletos, typeof Marca.prototype.id>;

  public readonly perfericos: HasManyRepositoryFactory<Perferico, typeof Marca.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('HardwareRepository') protected hardwareRepositoryGetter: Getter<HardwareRepository>, @repository.getter('EquiposCompletosRepository') protected equiposCompletosRepositoryGetter: Getter<EquiposCompletosRepository>, @repository.getter('PerfericoRepository') protected perfericoRepositoryGetter: Getter<PerfericoRepository>,
  ) {
    super(Marca, dataSource);
    this.perfericos = this.createHasManyRepositoryFactoryFor('perfericos', perfericoRepositoryGetter,);
    this.registerInclusionResolver('perfericos', this.perfericos.inclusionResolver);
    this.equiposCompletos = this.createHasManyRepositoryFactoryFor('equiposCompletos', equiposCompletosRepositoryGetter,);
    this.registerInclusionResolver('equiposCompletos', this.equiposCompletos.inclusionResolver);
    this.hardware = this.createHasManyRepositoryFactoryFor('hardware', hardwareRepositoryGetter,);
    this.registerInclusionResolver('hardware', this.hardware.inclusionResolver);
  }
}
