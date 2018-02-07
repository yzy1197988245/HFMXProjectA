import {Injectable} from "@angular/core";
import * as Pusher from "pusher-js"

@Injectable()
export class NotificationService {

  channel;

  constructor() {
    const socket = new Pusher('ea3de6c68fe66743c711', {
      cluster: 'ap1',
      encrypted: true
    });
    socket.logToConsole = true;
    this.channel = socket.subscribe('test');
  }

  receiveMessage(callback): void {
    this.channel.bind('schedule.updated', callback);
  }
}
