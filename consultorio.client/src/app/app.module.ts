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
import { SidenavComponent } from './sidenav/sidenav.component';
import { ArmazonesComponent } from './armazon/armazon.component';
import { MicasComponent } from './mica/mica.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BodyComponent } from './body/body.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ArmazonesComponent,
    MicasComponent,
    StatisticsComponent,
    BodyComponent,
    LoginComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
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
