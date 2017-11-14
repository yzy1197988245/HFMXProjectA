import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import {RouterModule, Routes} from "@angular/router";
import {MyCommonModule} from "../my-common/my-common.module";

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    MyCommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DefaultComponent]
})
export class LoginModule { }
