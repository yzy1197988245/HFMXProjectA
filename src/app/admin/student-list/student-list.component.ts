import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {NotificationService} from "../../services/notification.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  progress = 0;

  constructor(
    private httpService: HttpService,
    private notificationService: NotificationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.notificationService.receiveMessage((message) => {
      console.log(message);
      this.progress = message.data;
    })
  }

  syncStudentInfo(): void {
    console.log('test');
    this.httpService.adminSyncStudentInfo()
      .then(res => {
        if (res.code == 200) {
          this.messageService.showSuccess(res.message);
        }
      })
  }
}
