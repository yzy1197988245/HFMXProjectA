import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  public messages: Array<MyMessage> = [];

  constructor() { }

  public addMessage(message: MyMessage): void {
    this.messages.push(message);
    setTimeout(() => {
      this.messages.pop()
    }, 1500)
  }

  public showSuccess(content: string): void {
    this.addMessage({
      type: 'success',
      content: content
    })
  }

  public showWarning(content: string): void {
    this.addMessage({
      type: 'warning',
      content: content
    })
  }

  public showDanger(content: string): void {
    this.addMessage({
      type: 'danger',
      content: content
    })
  }

  public showInfo(content: string): void {
    this.addMessage({
      type: 'info',
      content: content
    })
  }
}

export class MyMessage {
  constructor(
    public type: string,
    public content: string
  ) {
  }
}
