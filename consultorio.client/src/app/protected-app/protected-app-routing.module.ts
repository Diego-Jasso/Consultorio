import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ArmazonesComponent } from './armazon/armazon.component';
import { AccesoriosComponent } from './accesorio/accesorio.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { CotizacionFormComponent } from './cotizacion-form/cotizacion-form.component';
import { MicasComponent } from './mica/mica.component';
import { LenteDeContactoComponent } from './lente-de-contacto/lente-de-contacto.component';
import { MicaCotizacionFormComponent } from './mica-cotizacion-form/mica-cotizacion-form.component';

const routes: Routes = [
  {
    path: ''
    , children: [
      {
        path: '', component: LayoutComponent, children: [
          { path: 'armazon', component: ArmazonesComponent },
          { path: 'accesorio', component: AccesoriosComponent },
          { path: 'statistics', component: StatisticsComponent },
          { path: 'perfil', component: PerfilComponent },
          { path: 'cotizacion', component: CotizacionComponent },
          { path: 'cotizacionform/:id', component: CotizacionFormComponent },
          { path: 'mica', component: MicasComponent },
          { path: 'lenteDeContacto', component: LenteDeContactoComponent },
          { path: 'micaform', component: MicaCotizacionFormComponent },
          { path: '**', redirectTo: 'cotizacion'}
        ]
      },
      { path:'**', redirectTo:''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedAppRoutingModule { }
