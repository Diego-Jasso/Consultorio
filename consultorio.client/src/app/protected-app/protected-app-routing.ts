import { Route } from '@angular/router';
import { LayoutComponent } from './Components/layout/layout.component';
import { ArmazonesComponent } from './Components/armazon/armazon.component';
import { AccesoriosComponent } from './Components/accesorio/accesorio.component';
import { StatisticsComponent } from './Components/statistics/statistics.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { CotizacionComponent } from './Components/cotizacion/cotizacion.component';
import { CotizacionFormComponent } from './Components/cotizacion-form/cotizacion-form.component';
import { MicasComponent } from './Components/mica/mica.component';
import { LenteDeContactoComponent } from './Components/lente-de-contacto/lente-de-contacto.component';
import { MicaCotizacionFormComponent } from './Components/mica-cotizacion-form/mica-cotizacion-form.component';

export const PROTECTED_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'armazon', component: ArmazonesComponent },
      { path: 'accesorio', component: AccesoriosComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'cotizacion', component: CotizacionComponent },
      { path: 'cotizacionform/:id', component: CotizacionFormComponent },
      { path: 'mica', component: MicasComponent },
      { path: 'lenteDeContacto', component: LenteDeContactoComponent },
      { path: 'micaform', component: MicaCotizacionFormComponent },
      { path: '**', redirectTo: 'cotizacion' }
    ]
  },
  { path: '**', redirectTo: '' }
];
