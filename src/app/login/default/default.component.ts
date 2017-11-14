import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../http.service";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import * as md5 from "md5";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  userName: FormControl;
  password: FormControl;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.userName = new FormControl(null, [Validators.required]);
    this.password = new FormControl(null, [Validators.required]);
  }

  login() {
    let params = {
      userName: this.userName.value,
      password: md5(this.password.value)
    };
    this.httpService.login(params)
      .then(response => {
        if (response.code == 101) {
          this.userName.setErrors({
            userNameWrong: true
          })
        } else if (response.code == 102) {
          this.password.setErrors({
            passwordWrong: true
          })
        } else {
          this.authService.isLoggedIn = true;
          this.authService.userInfo = response.data;
          // this.authService.userInfo.save();
          this.router.navigate(['/', 'hfmx', 'step1']);
        }
      })
  }
}
