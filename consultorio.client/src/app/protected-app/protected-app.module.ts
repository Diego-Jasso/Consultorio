import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedAppRoutingModule } from './protected-app-routing.module';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { BodyComponent } from './body/body.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AccesoriosComponent } from './accesorio/accesorio.component';
import { ArmazonesComponent } from './armazon/armazon.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { ArmazonListComponent } from './armazon/armazon-list/armazon-list.component';
import { ArmazonFormComponent } from './armazon/armazon-form/armazon-form.component';
import { BusquedaPipe } from '../compartido/Pipe/busqueda.pipe';
import { AccesorioListComponent } from './accesorio/accesorio-list/accesorio-list.component';
import { AccesorioFormComponent } from './accesorio/accesorio-form/accesorio-form.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { CotizacionFormComponent } from './cotizacion-form/cotizacion-form.component';
import { ListDialogComponent } from './shared/list-dialog/list-dialog.component';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MicasComponent } from './mica/mica.component';
import { MicaListComponent } from './mica/mica-list/mica-list.component';
import { MicaFormComponent } from './mica/mica-form/mica-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LenteDeContactoComponent } from './lente-de-contacto/lente-de-contacto.component';
import { LenteDeContactoListComponent } from './lente-de-contacto/lente-de-contacto-list/lente-de-contacto-list.component';
import { LenteDeContactoFormComponent } from './lente-de-contacto/lente-de-contacto-form/lente-de-contacto-form.component';
import { MicaCotizacionFormComponent } from './mica-cotizacion-form/mica-cotizacion-form.component';
import { NuevoLenteFormComponent } from './nuevo-lente-form/nuevo-lente-form.component';
import { ModalEliminarComponent } from './shared/modal-eliminar/modal-eliminar.component';
import { MatSelectModule } from '@angular/material/select'


@NgModule({
  declarations: [
    SidenavComponent,
    ArmazonesComponent,
    AccesoriosComponent,
    StatisticsComponent,
    BodyComponent,
    LayoutComponent,
    HeaderComponent,
    PerfilComponent,
    ArmazonListComponent,
    ArmazonFormComponent,
    BusquedaPipe,
    AccesorioListComponent,
    AccesorioFormComponent,
    CotizacionComponent,
    CotizacionFormComponent,
    ListDialogComponent,
    MicasComponent,
    MicaListComponent,
    MicaFormComponent,
    LenteDeContactoComponent,
    LenteDeContactoListComponent,
    LenteDeContactoFormComponent,
    MicaCotizacionFormComponent,
    NuevoLenteFormComponent,
    ModalEliminarComponent,
  ],
  imports: [
    CommonModule,
    ProtectedAppRoutingModule,
    MatIconModule,
    MatProgressBarModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatTabsModule,
    MatSelectModule,
  ]
})
export class ProtectedAppModule { }
