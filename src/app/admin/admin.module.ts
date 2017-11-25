import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import {MyCommonModule} from "../my-common/my-common.module";
import {RouterModule, Routes} from "@angular/router";
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'team-list',
        component: TeamListComponent
      },
      {
        path: '',
        redirectTo: 'team-list',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MyCommonModule,
  ],
  declarations: [DefaultComponent, TeamListComponent, TeamDetailComponent]
})
export class AdminModule { }
