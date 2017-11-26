import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {HttpService} from "./services/http.service";
import {UEditorModule} from "ngx-ueditor";
import {AuthService} from "./services/auth.service";
import {MyCommonModule} from "./my-common/my-common.module";
import { TestComponent } from './test/test.component';
import {Ng2Webstorage} from "ngx-webstorage";
import {AlertModule} from "ngx-bootstrap";
import {MessageService} from "./services/message.service";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'hfmx',
    canActivate: [AuthService],
    canActivateChild: [AuthService],
    loadChildren: 'app/hfmx/hfmx.module#HfmxModule'
  },
  {
    path: 'admin',
    canActivate: [AuthService],
    canActivateChild: [AuthService],
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   redirectTo: 'login'
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MyCommonModule,

    // GrowlModule,
    RouterModule.forRoot(routes, {useHash: true}),
    UEditorModule.forRoot({
      path: '/assets/ueditor/',
      options: {
        themePath: '/assets/ueditor/themes/',
        listiconpath: '/assets/ueditor/themes/ueditor-list/',
        emotionLocalization: true,
        serverUrl: HttpService.base_url+'laravel-u-editor-server/server',
        autoHeightEnable: false,
        initialFrameHeight: 400,
        initialFrameWidth: '100%',
        autoFloatEnabled: false,
      }
    }),
    Ng2Webstorage,
    AlertModule.forRoot(),
  ],
  providers: [
    HttpService,
    AuthService,
    MessageService
    // MessageService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
