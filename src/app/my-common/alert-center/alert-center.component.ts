import { Component, OnInit } from '@angular/core';
import {MessageService} from "../message.service";

@Component({
  selector: 'app-alert-center',
  templateUrl: './alert-center.component.html',
  styleUrls: ['./alert-center.component.scss']
})
export class AlertCenterComponent implements OnInit {

  messages = [];

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.messages = this.messageService.messages;
  }
}
