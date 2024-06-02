import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ArmazonesComponent } from './armazon/armazon.component';
import { MicasComponent } from './mica/mica.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { CotizacionFormComponent } from './cotizacion/cotizacion-form/cotizacion-form.component';
import { CotizacionListComponent } from './cotizacion/cotizacion-list/cotizacion-list.component';

const routes: Routes = [
  {
    path: ''
    , children: [
      {
        path: '', component: LayoutComponent, children: [
          { path: '', component: ArmazonesComponent, },
          { path: 'armazon', component: ArmazonesComponent },
          { path: 'mica', component: MicasComponent },
          { path: 'statistics', component: StatisticsComponent },
          { path: 'perfil', component: PerfilComponent },
          {
            path: 'cotizacion', component: CotizacionComponent, children: [
              {
                path: '', component:CotizacionListComponent,
              },
              {
                path: 'cotizacionlist',component:CotizacionListComponent
              },
              {
                path: 'cotizacionform',component: CotizacionFormComponent
              },
              { path: '**', redirectTo: '' }
            ]
          },
          { path: '**', redirectTo: ''}
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
