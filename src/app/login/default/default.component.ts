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
      state('hide', style({opacity: 0, transform: 'scale(1, 1)'})),
      state('show', style({opacity: 1, transform: 'scale(1.1, 1.1)'})),
      transition('hide => show', [
        animate('1s ease-in-out')
      ]),
      transition('show => hide', [
        animate('1s ease-in-out')
      ])
    ]),
    trigger('test', [
      transition(':enter', [
        animate('5s ease-out', style({'transform': 'scale(1.3, 1.3)'})),
        animate('5s ease-out', style({transform: 'scale(1, 1)'}))
      ])
    ])
  ]
})

export class DefaultComponent implements OnInit {

  userName: FormControl;
  password: FormControl;
  backgroundImages = [];
  currentBackground1;
  currentBackground2;
  background1State;
  background2State;
  loading = false;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.userName = new FormControl(null, [Validators.required]);
    this.password = new FormControl(null, [Validators.required]);
    for (let i = 1; i < 11; i++) {
      let urlString = 'assets/background/' + i + '.jpg';
      this.backgroundImages.push(this.domSanitizer.bypassSecurityTrustUrl(urlString));
    }
    this.currentBackground1 = this.backgroundImages.shift();
    this.backgroundImages.push(this.currentBackground1);
    this.background1State = 'show';
    this.background2State = 'hide';
  }

  changeState1(): void {
    if (this.background1State == 'hide') {
      this.currentBackground1 = this.backgroundImages.shift();
      if (this.currentBackground1 != null)
        this.backgroundImages.push(this.currentBackground1);
      setTimeout(() => {
        this.background1State = 'show';
      }, 2000)
    } else {
      setTimeout(() => {
        this.background1State = 'hide';
      },  2000);
    }
  }

  changeState2(): void {
    if (this.background2State == 'hide') {
      this.currentBackground2 = this.backgroundImages.shift();
      if (this.currentBackground2 != null)
        this.backgroundImages.push(this.currentBackground2);
      setTimeout(() => {
        this.background2State = 'show';
      }, 2000)
    } else {
      setTimeout(() => {
        this.background2State = 'hide';
      }, 2000);
    }
  }

  login() {
    let params = {
      userName: this.userName.value,
      password: md5(this.password.value)
    };
    this.loading = true;
    this.httpService.login(params)
      .then(response => {
        this.loading = false;
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
          this.router.navigate([response.data.redirect]);
        }
      })
  }
}
