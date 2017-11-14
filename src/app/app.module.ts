import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {HttpService} from "./http.service";
import {UEditorModule} from "ngx-ueditor";
import {AuthService} from "./auth.service";
import {MyCommonModule} from "./my-common/my-common.module";
import { TestComponent } from './test/test.component';
import {Ng2Webstorage} from "ngx-webstorage";
import {AlertModule} from "ngx-bootstrap";
import {MessageService} from "./my-common/message.service";

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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
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
        initialFrameWidth: 800,
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
