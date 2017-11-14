import {Component, OnInit} from '@angular/core';
import {MessageService} from "../message.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-alert-center',
  templateUrl: './alert-center.component.html',
  styleUrls: ['./alert-center.component.scss'],
  animations: [
    trigger('transform', [
      transition(':enter', [
        style({opacity: 0}),
        animate(200, style({opacity: 1}))
      ]),
      transition(':leave', [
        animate(200, style({opacity: 0}))
      ])
    ])
  ]
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
