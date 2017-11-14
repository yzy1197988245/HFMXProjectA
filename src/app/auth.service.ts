import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router} from "@angular/router";
import {LocalStorage, SessionStorage} from "ngx-webstorage";


@Injectable()
export class AuthService implements CanActivate, CanActivateChild{

  @SessionStorage() userInfo;
  @SessionStorage() isLoggedIn;

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
}
