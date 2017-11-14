import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {HttpService} from "./http.service";
import {UEditorModule} from "ngx-ueditor";
import {MessageService} from "primeng/components/common/messageservice";
import {GrowlModule} from "primeng/primeng";
import {AuthService} from "./auth.service";
import {MyCommonModule} from "./my-common/my-common.module";
import { TestComponent } from './test/test.component';
import {Ng2Webstorage} from "ngx-webstorage";

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
    MyCommonModule,
    HttpClientModule,
    GrowlModule,
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
    Ng2Webstorage
  ],
  providers: [
    HttpService,
    AuthService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
