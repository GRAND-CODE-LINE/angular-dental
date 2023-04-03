import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  config = {
    animated: true
  };
  modalRef?: BsModalRef;
  
  @ViewChild('template') modalTemplate!: TemplateRef<any>;

  constructor(public messageService: MessagesService, private modalService: BsModalService) {
    if (this.messageService.subsVar == undefined) {
      this.messageService.subsVar = this.messageService.
        invokeFirstComponentFunction.subscribe((name: string) => {
          this.openPopup();
        });
    }
  }
  ngInInit() {
    console.log('inicia');
  }

  okButton() {

  }


  openPopup() {
    console.log('aaaaaaaaaasdasdas');
    this.modalRef = this.modalService.show(this.modalTemplate, this.config);
  }


  closePopup() {
  }




}
