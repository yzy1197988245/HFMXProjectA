import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-alert-center',
  templateUrl: './alert-center.component.html',
  styleUrls: ['./alert-center.component.scss'],
  animations: [
    trigger('transform', [
      transition(':enter', [
        style({'background-color': 'rgba(0, 0, 0, 0)'}),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({'background-color': 'rgba(0, 0, 0, 0)'}))
      ])
    ]),

    trigger('transform2', [
      transition('void => *', [
        style({'transform': 'translate(0, 100px)'}),
        animate(200, style({'transform': 'translate(0, 0)'}))
      ]),
      transition(':leave', [
        animate(200, style({'transform': 'translate(0, 100px)'}))
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

