import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {Ng2Webstorage} from "ngx-webstorage";
import {UEditorModule} from "ngx-ueditor";
import {AlertModule} from "ngx-bootstrap/alert";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {ConfirmationService} from "primeng/api";

import { AppComponent } from './app.component';
import {HttpService} from "./services/http.service";
import {AuthService} from "./services/auth.service";
import {MyCommonModule} from "./my-common/my-common.module";
import { TestComponent } from './test/test.component';
import {MessageService} from "./services/message.service";
import {NotificationService} from "./services/notification.service";
import {AuthInterceptor} from "./services/auth-interceptor";
import {LoadingService} from "./services/loading.service";
import {SourceViewerService} from "./services/source-viewer.service";


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
    HttpClientModule,
    BrowserAnimationsModule,
    MyCommonModule,

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
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  providers: [
    AuthService,
    MessageService,
    HttpService,
    NotificationService,
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ConfirmationService,
    SourceViewerService
    // {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }


