import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
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
import { ConsultationService } from 'src/app/services/consultation/consultation.service';

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
  edit: boolean = false;
  constructor(private location: Location, private modalService: BsModalService,
    private fb: FormBuilder, private messageService: MessagesService, private consultationService: ConsultationService,
    private router: Router, private route: ActivatedRoute) {
  }


  async ngOnInit() {
    this.initForms();
    if (this.route.snapshot.params['id'] != undefined) {
      this.edit = true;
      await this.getConsultationById(this.route.snapshot.params['id'])
    } else {
      this.edit = false;
      this.initConsultation();
      let state = this.location.getState();
      this.patientGet = _.clone(state) as unknown as Patient;
      if (!this.patientGet.id) {
        this.router.navigate(['control/historial'])
      }
    }
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

  async getConsultationById(id: any) {
    let res = await firstValueFrom(this.consultationService.getById(id));
    console.log(res);

    const consultation: Consultation = res as Consultation;
    this.consultation = consultation;
    this.consultationOld = _.clone(this.consultation);
    this.patientGet = _.clone(consultation.patient) as unknown as Patient;
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
    this.calculateTotalPrice();
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
    this.calculateBalance();
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

  saveChanges() {
    if (this.edit) {
      this.updateConsultation();
    } else {
      this.createConsultation();
    }
  }

  async createConsultation() {
    this.consultation.patient = this.patientGet as Patient
    let res = await firstValueFrom(this.consultationService.create(this.consultation));
    const consultation: Consultation = res as Consultation;
    this.router.navigate(['control/consultation/edit', consultation.id])
  }

  async updateConsultation() {
    this.consultation.patient = this.patientGet as Patient
    let res = await firstValueFrom(this.consultationService.update(this.consultation.id, this.consultation));
    const consultation: Consultation = res as Consultation;
    this.router.navigate(['control/consultation/edit', consultation.id])
    this.getConsultationById(this.consultation.id)
  }

  reload() {
    this.getConsultationById(this.consultation.id)
  }
}
