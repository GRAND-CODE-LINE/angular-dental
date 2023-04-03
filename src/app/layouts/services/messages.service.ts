import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Message_I } from 'src/app/models/utils/message_i';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  invokeFirstComponentFunction = new EventEmitter();
  subsVar: Subscription | undefined
  constructor() { }


  openModal(message: Message_I) {

    this.invokeFirstComponentFunction.emit(message);
  }



}
