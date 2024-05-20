import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ArmazonesComponent } from './armazon/armazon.component';
import { MicasComponent } from './mica/mica.component';
import { StatisticsComponent } from './statistics/statistics.component';

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
