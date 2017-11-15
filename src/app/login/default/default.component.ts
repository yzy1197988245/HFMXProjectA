import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import * as md5 from "md5";
import {AuthService} from "../../services/auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  animations: [
    trigger('transform', [
      state('hide', style({opacity: 0})),
      state('show', style({opacity: 1})),
      transition('hide => show', [
        animate(1000)
      ]),
      transition('show => hide', [
        animate(1000)
      ])
    ])
  ]
})
export class DefaultComponent implements OnInit {

  userName: FormControl;
  password: FormControl;
  backgroundImages = [];
  currentBackground;
  backgroundState = 'show';

  constructor(
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.userName = new FormControl(null, [Validators.required]);
    this.password = new FormControl(null, [Validators.required]);
    for (let i = 1; i < 13; i++) {
      // let styleString = "url(\"assets/background/" + i + ".jpg\") no-repeat center/100%";
      // this.backgroundImages.push(this.domSanitizer.bypassSecurityTrustStyle(styleString));
      let urlString = 'assets/background/' + i + '.jpg';
      this.backgroundImages.push(this.domSanitizer.bypassSecurityTrustUrl(urlString));
    }
    this.currentBackground = this.backgroundImages.shift();
    // this.backgroundState = 'hide';
  }

  changeState(): void {
    if (this.backgroundState == 'hide') {
      this.backgroundImages.push(this.currentBackground);
      this.currentBackground = this.backgroundImages.shift();
      setTimeout(() => {
        this.backgroundState = 'show';
      }, 200)
    } else {
      setTimeout(() => {
        this.backgroundState = 'hide';
      }, 2500);
    }
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
          this.router.navigate(['/', 'hfmx', 'step1']);
        }
      })
  }
}

