import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  logout(event) {
    event.preventDefault();
    this.authService.isLoggedIn = false;
    this.authService.userInfo = {};
    // this.authService.userInfo.save();
    this.router.navigate(['/', 'login']);
  }
}
