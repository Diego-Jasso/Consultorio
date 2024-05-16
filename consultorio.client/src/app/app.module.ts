import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './protected-app/sidenav/sidenav.component';
import { ArmazonesComponent } from './protected-app/armazon/armazon.component';
import { MicasComponent } from './protected-app/mica/mica.component';
import { StatisticsComponent } from './protected-app/statistics/statistics.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './protected-app/layout/layout.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BodyComponent } from './protected-app/body/body.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ArmazonesComponent,
    MicasComponent,
    StatisticsComponent,
    BodyComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule, MatIconModule,
    MatProgressBarModule,
    FormsModule,
  ],
  providers: [
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
