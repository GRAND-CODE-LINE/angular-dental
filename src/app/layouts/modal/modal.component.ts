import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { firstValueFrom } from 'rxjs';
import { Message_I } from 'src/app/models/utils/message_i';
import { LoginService } from 'src/app/security/services/login.service';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {

  config = {
    animated: true
  };
  modalRef?: BsModalRef;

  message!: Message_I;

  @ViewChild('template') modalTemplate!: TemplateRef<any>;

  constructor(public messageService: MessagesService, private modalService: BsModalService, private loginservice: LoginService) {
    if (this.messageService.subsVar == undefined) {
      this.messageService.subsVar = this.messageService.
        invokeFirstComponentFunction.subscribe((message: Message_I) => {
          this.openPopup(message);
        });
    }
  }
  ngInInit() {
    console.log('inicia');
  }

  okButton() {

  }


  openPopup(message: Message_I) {
    this.message = message
    this.modalRef = this.modalService.show(this.modalTemplate, this.config);
  }


  closePopup() {

  }

  async test() {
    let res: any = await firstValueFrom(this.loginservice.test());
    console.log(res);
  }
}
