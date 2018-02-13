import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router} from "@angular/router";
import {SessionStorage} from "ngx-webstorage";
import {isNullOrUndefined} from "util";


@Injectable()
export class AuthService implements CanActivate, CanActivateChild{

  @SessionStorage() userInfo;
  @SessionStorage() isLoggedIn;
  @SessionStorage() token;
  @SessionStorage() guard;
  @SessionStorage() appConfig;

  constructor(
    private router: Router,
  ) {
  }

  canActivate(): boolean {
    if (!this.isLoggedIn) {
      this.router.navigate(['/', 'login']);
    }
    return this.isLoggedIn;
  }

  canActivateChild(): boolean {
    if (!this.isLoggedIn) {
      this.router.navigate(['/', 'login']);
    }
    return this.isLoggedIn;
  }

  getAuthorizationHeader(): any {
    if (!isNullOrUndefined(this.token))
      return this.token.token_type + ' ' + this.token.access_token;
    else
      return '';
  }
}
