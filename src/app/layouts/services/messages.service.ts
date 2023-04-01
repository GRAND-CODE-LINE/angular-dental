import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  invokeFirstComponentFunction = new EventEmitter();    
  subsVar: Subscription | undefined 
  constructor() { }


  openModal() {

    this.invokeFirstComponentFunction.emit();    
  }



}
