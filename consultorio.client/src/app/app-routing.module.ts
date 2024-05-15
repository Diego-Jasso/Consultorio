import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArmazonesComponent } from './armazon/armazon.component';
import { MicasComponent } from './mica/mica.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'layout', component: LayoutComponent, children: [
      { path: 'armazon', component: ArmazonesComponent },
      { path: 'mica', component: MicasComponent },
      { path: 'statistics', component: StatisticsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
