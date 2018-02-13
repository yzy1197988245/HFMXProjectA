import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import * as md5 from "md5"
import {AuthService} from "../../services/auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  animations: [
    trigger('transform', [
      state('hide', style({opacity: 0, transform: 'scale(1, 1)'})),
      state('show', style({opacity: 1, transform: 'scale(1.1, 1.1)'})),
      transition('hide => show', [
        animate('2s')
      ]),
      transition('show => hide', [
        animate('2s')
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
    private messageService: MessageService
  ) {

  }

  ngOnInit() {
    this.userName = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    for (let i = 1; i < 11; i++) {
      let urlString = 'assets/background/' + i + '.jpg';
      this.backgroundImages.push(this.domSanitizer.bypassSecurityTrustUrl(urlString));
    }
    this.currentBackground1 = this.backgroundImages.shift();
    this.backgroundImages.push(this.currentBackground1);
    this.currentBackground2 = this.backgroundImages.shift();
    this.backgroundImages.push(this.currentBackground2);
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
      username: this.userName.value,
      password: md5(this.password.value)
    };
    this.loading = true;
    this.httpService.login(params)
      .then(response => {
        this.authService.token = response.token;
        this.authService.isLoggedIn = true;
        this.authService.guard = response.guard;
        this.httpService.getAppConfig()
          .then(res => {
            this.authService.appConfig = res;
            this.httpService.getUserInfo()
              .then(res => {
                this.authService.userInfo = res;
                switch (this.authService.guard) {
                  case 'api_user':
                    this.router.navigate(['/', 'admin', 'team-list']).then(res => {
                      this.loading = false;
                    });
                    break;
                  case 'api_student':
                    this.router.navigate(['/', 'hfmx', 'team-list']).then(res => {
                      this.loading = false;
                    });
                    break;
                  default:
                    break;
                }
              });
          })
          .catch(error => {
            this.messageService.showDanger('请求出现异常' + error.error);
          });
      })
      .catch(response => {
        this.loading = false;
        if (response.status == 422) {
          let errors = response.error.errors;
          if (errors.hasOwnProperty('username')) {
            this.userName.setErrors({'response': errors.username[0]});
            this.messageService.showDanger(this.userName.getError('response'));
          }
          if (errors.hasOwnProperty('password')) {
            this.password.setErrors({'response': errors.password[0]});
            this.messageService.showDanger(this.password.getError('response'));
          }
        }
      })
  }

  keyDown(event) {
    console.log(event);
    if (event.key == 'Enter' && this.userName.valid && this.password.valid) {
      this.login();
    }
  }
}
