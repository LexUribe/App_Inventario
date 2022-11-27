import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEquipoCompletoComponent } from './equipoCompleto/crear-equipo-completo/crear-equipo-completo.component';
import { EditarEquipoCompletoComponent } from './equipoCompleto/editar-equipo-completo/editar-equipo-completo.component';
import { EliminarEquipoCompletoComponent } from './equipoCompleto/eliminar-equipo-completo/eliminar-equipo-completo.component';
import { ListarEquipoCompletoComponent } from './equipoCompleto/listar-equipo-completo/listar-equipo-completo.component';
import { CrearInventarioComponent } from './inventario/crear-inventario/crear-inventario.component';
import { EditarInventarioComponent } from './inventario/editar-inventario/editar-inventario.component';
import { EliminarInventarioComponent } from './inventario/eliminar-inventario/eliminar-inventario.component';
import { ListarInventarioComponent } from './inventario/listar-inventario/listar-inventario.component';

const routes: Routes = [
  {
    path: 'listar-equipo-completo',
    component: ListarEquipoCompletoComponent
  },
  {
    path: 'agregar-equipo-completo',
    component: CrearEquipoCompletoComponent
  },
  {
    path: 'editar-equipo-completo',
    component: EditarEquipoCompletoComponent
  },
  {
    path: 'eliminar-equipo-completo',
    component: EliminarEquipoCompletoComponent
  },
  {
    path: 'listar-inventario',
    component: ListarInventarioComponent
  },
  {
    path: 'agregar-inventario',
    component: CrearInventarioComponent
  },
  {
    path: 'editar-inventario',
    component: EditarInventarioComponent
  },
  {
    path: 'eliminar-inventario',
    component: EliminarInventarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
