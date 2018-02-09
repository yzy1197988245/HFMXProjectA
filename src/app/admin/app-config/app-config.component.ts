import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-app-config',
  templateUrl: './app-config.component.html',
  styleUrls: ['./app-config.component.scss']
})
export class AppConfigComponent implements OnInit {

  calendarConfig;
  configForm: FormGroup;
  imageSrc;

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.calendarConfig = {
      firstDayOfWeek: 1,
      dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      monthNames: [ "1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月" ],
      monthNamesShort: [ "1", "2", "3", "4", "5", "6","7", "8", "9", "10", "1", "12" ],
      today: '今天',
      clear: '清除'
    };
    this.configForm = this.formBuilder.group({
      'enrollStartDate': [this.authService.appConfig.enrollStartDate, [Validators.required]],
      'enrollEndDate': [this.authService.appConfig.enrollEndDate, [Validators.required]],
      'returnStartDate': [this.authService.appConfig.returnStartDate, [Validators.required]],
      'returnEndDate': [this.authService.appConfig.returnEndDate, [Validators.required]],
      'exchangeCode': [this.authService.appConfig.exchangeCode, [Validators.required]],
      'exchangeCodeImage': [this.authService.appConfig.exchangeCodeImage, [Validators.required]]
    });
    this.imageSrc = HttpService.base_url + 'uploads/' + this.authService.appConfig.exchangeCodeImage;
  }

  updateConfigs() {
    if (this.configForm.valid) {
      const configs = this.configForm.value;
      this.httpService.updateAppConfig(configs)
        .then(res => {
          this.messageService.showSuccess(res);
          this.authService.appConfig = configs;
        })
        .catch(error => {
          this.messageService.showDanger('更新失败:'+error.error);
        });
    }
  }

  uploadExchangeCodeImage(image): void {
    let formData = new FormData();
    if (image.files[0]) {
      formData.append('exchangeCodeImage', image.files[0]);
      this.httpService.uploadExchangeCodeImage(formData)
        .then(res => {
          this.imageSrc = HttpService.base_url + 'uploads/' + res;
          this.authService.appConfig.exchangeCodeImage = res;
          this.configForm.controls['exchangeCodeImage'].setValue(res);
        })
        .catch(error => {
          this.messageService.showWarning('上传异常' + error.error);
        })
    }
  }
}
