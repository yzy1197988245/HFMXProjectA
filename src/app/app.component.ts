import { Component } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  logout(event) {
    event.preventDefault();
    this.authService.isLoggedIn = false;
    this.authService.userInfo = {};
    // this.authService.userInfo.save();
    this.router.navigate(['/', 'login']);
  }
}
