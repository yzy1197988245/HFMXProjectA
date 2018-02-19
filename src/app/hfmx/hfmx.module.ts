import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import {AddMemberDialog, Step1Component} from './step1/step1.component';
import {RouterModule, Routes} from "@angular/router";
import {MyCommonModule} from "../my-common/my-common.module";
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { UpdateTeamComponent } from './update-team/update-team.component';
import { TeamInfoComponent } from './team-info/team-info.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { AddMemberDialogComponent } from './team-form/add-member-dialog/add-member-dialog.component';
import { TeamReceiptComponent } from './team-receipt/team-receipt.component';
import {FileUploaderComponent} from "../my-common/file-uploader/file-uploader.component";

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
        path: 'team-info/:id',
      },
      {
        path: 'create-team',
        component: CreateTeamComponent
      },
      {
        path: 'update-team/:id',
        component: UpdateTeamComponent
      },
      {
        path: 'team-receipt/:id',
        component: TeamReceiptComponent
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
  declarations: [DefaultComponent, Step1Component, AddMemberDialog, TeamComponent, TeamListComponent, CreateTeamComponent, UpdateTeamComponent, TeamInfoComponent, TeamFormComponent, AddMemberDialogComponent, TeamReceiptComponent],
  entryComponents: [AddMemberDialog, AddMemberDialogComponent, TeamInfoComponent]
})
export class HfmxModule { }
