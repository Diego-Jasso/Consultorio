import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedAppRoutingModule } from './protected-app-routing.module';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { BodyComponent } from './body/body.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MicasComponent } from './mica/mica.component';
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
import { MicaListComponent } from './mica/mica-list/mica-list.component';
import { MicaFormComponent } from './mica/mica-form/mica-form.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { CotizacionFormComponent } from './cotizacion-form/cotizacion-form.component';
import { ListDialogComponent } from './shared/list-dialog/list-dialog.component';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';


@NgModule({
  declarations: [
    SidenavComponent,
    ArmazonesComponent,
    MicasComponent,
    StatisticsComponent,
    BodyComponent,
    LayoutComponent,
    HeaderComponent,
    PerfilComponent,
    ArmazonListComponent,
    ArmazonFormComponent,
    BusquedaPipe,
    MicaListComponent,
    MicaFormComponent,
    CotizacionComponent,
    CotizacionFormComponent,
    ListDialogComponent,
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
  ]
})
export class ProtectedAppModule { }
