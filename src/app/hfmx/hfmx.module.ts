import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import {AddMemberDialog, Step1Component} from './step1/step1.component';
import {RouterModule, Routes} from "@angular/router";
import {MyCommonModule} from "../my-common/my-common.module";
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team-list/team-list.component';

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
        path: 'step1',
        component: Step1Component
      },
      {
        path: '',
        redirectTo: 'step1',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'step1'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MyCommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [DefaultComponent, Step1Component, AddMemberDialog, TeamComponent, TeamListComponent],
  entryComponents: [AddMemberDialog]
})
export class HfmxModule { }
