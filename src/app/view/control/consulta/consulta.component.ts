import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Consultation } from 'src/app/models/consultation';
import { Patient } from 'src/app/models/patient';
import { Action } from 'src/app/models/action';
import { Location } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Payment } from 'src/app/models/payment';
import { Message_I } from 'src/app/models/utils/message_i';
import { MessagesService } from 'src/app/layouts/services/messages.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent {

  patientGet: Patient | undefined;

  consultation!: Consultation;
  consultationOld!: Consultation;

  config = {
    animated: true
  };
  modalRef?: BsModalRef;


  actionForm!: FormGroup;
  paymentForm!: FormGroup;
  @ViewChild('modalActions') modalAction!: TemplateRef<any>;
  @ViewChild('modalPayment') modalPayment!: TemplateRef<any>;
  constructor(private location: Location, private modalService: BsModalService,
    private fb: FormBuilder, private messageService: MessagesService) {
  }


  ngOnInit() {
    let state = this.location.getState();
    console.log(state);

    this.patientGet = state as unknown as Patient;
    this.initConsultation();
    this.initForms()
  }

  initConsultation() {
    this.consultation = {
      actions: [],
      attentions: [],
      balance: 0,
      date: new Date(),
      description: '',
      payments: [],
      patient: this.patientGet as Patient,
      price: 0,
      status: 'Creado',
      code: ''
    }


    this.consultationOld = _.clone(this.consultation);
  }

  initForms() {
    this.actionForm = this.fb.group({
      id: [],
      name: [null, Validators.compose([Validators.required])],
      comments: [null],
      price: [null, Validators.compose([Validators.required])],
    })
    this.paymentForm = this.fb.group({
      id: [],
      amount: [null, Validators.compose([Validators.required])]
    })
  }

  newAction(modalTemplate: TemplateRef<any>) {
    if (this.actionForm.invalid) {
      return;
    }
    let item;
    if (this.consultation?.actions.length == 0) {
      item = 1;
    } else {
      item = Math.max(...this.consultation?.actions.map(o => o.item)) + 1
    }
    let action: Action = this.actionForm.value;
    action.item = item
    this.consultation?.actions.push(action)
    this.modalService.hide();
    this.actionForm.reset()
    this.calculateTotalPrice();
  }

  openPopupAction() {
    this.modalRef = this.modalService.show(this.modalAction, this.config);
  }

  openPopupPayment() {
    if (this.consultation.actions.length == 0) {
      let message: Message_I = {
        title: 'Error',
        message: 'No hay cotizaciones.',
        type: 'danger'
      }
      this.messageService.openModal(message);
      return;
    }
    this.modalRef = this.modalService.show(this.modalPayment, this.config);
  }

  deleteAction(action: Action) {
    this.consultation.actions = this.consultation.actions.filter(x => { return x.item !== action.item })
  }


  calculateTotalPrice() {
    let total = 0;
    for (const iterator of this.consultation.actions) {
      total = total + iterator.price
    }
    this.consultation.price = total;
  }


  newPayment(modalTemplate: TemplateRef<any>) {
    if (this.paymentForm.invalid) {
      return;
    }
    let item;
    if (this.consultation?.payments.length == 0) {
      item = 1;
    } else {
      item = Math.max(...this.consultation?.payments.map(o => o.item)) + 1
    }
    let payment: Payment = this.paymentForm.value;
    payment.item = item;
    payment.date = new Date();
    this.consultation?.payments.push(payment)
    this.modalService.hide();
    this.paymentForm.reset()
    this.calculateBalance();
  }

  deletePayment(action: Payment) {
    this.consultation.payments = this.consultation.payments.filter(x => { return x.item !== action.item })
  }

  calculateBalance() {
    let total = 0;
    for (const iterator of this.consultation.payments) {
      total = total + iterator.amount
    }
    this.consultation.balance = total;
  }
  checkForUnSaved() {
    if (!_.isEqual(this.consultation, this.consultationOld)) {
      return true;
    } else {
      return false;
    }

  }
}
