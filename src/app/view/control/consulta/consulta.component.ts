import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, firstValueFrom, map } from 'rxjs';
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
import { Attention } from 'src/app/models/attention';
import { ComponentCanDeactivate } from 'src/app/security/guards/PendingChangesGuard';
import { AttentionService } from 'src/app/services/attention/attention.service';
import { SymbolService } from 'src/app/services/symbol/symbol.service';
import { SymbolFilter } from 'src/app/models/symbol';
import { Paginate_I } from 'src/app/models/utils/filter_i';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements ComponentCanDeactivate {
  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    if (!this.edit) {
      return true
    }
    return !this.checkForUnSaved()
  }

  @ViewChild('modalActions') modalAction!: TemplateRef<any>;
  @ViewChild('modalPayment') modalPayment!: TemplateRef<any>;
  patientGet: Patient | undefined;
  consultation!: Consultation;
  consultationOld!: Consultation;
  config = {
    animated: true
  };
  modalRef?: BsModalRef;
  actionForm!: FormGroup;
  paymentForm!: FormGroup;

  edit: boolean = false;
  canEdit: boolean = true;
  numRegex = /^-?\d*[.,]?\d{0,2}$/;

  constructor(private location: Location, private modalService: BsModalService,
    private fb: FormBuilder, private messageService: MessagesService, private consultationService: ConsultationService,
    private router: Router, private route: ActivatedRoute, private attentionService: AttentionService, private symbolService: SymbolService) {
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
      code: 0
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

    if (consultation.status == 'Cerrado') {
      this.canEdit = false
    }

  }

  initForms() {
    this.actionForm = this.fb.group({
      id: [],
      name: [null, Validators.compose([Validators.required])],
      comments: [null],
      price: [null, Validators.compose([Validators.required, Validators.pattern(this.numRegex)])],
    })
    this.paymentForm = this.fb.group({
      id: [],
      amount: [null, Validators.compose([Validators.required])]
    })
  }

  newAction(modalTemplate: TemplateRef<any>) {
    if (this.actionForm.invalid) {

      console.log(this.actionForm);

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

    if (this.consultation.balance == this.consultation.price) {
      this.consultation.status = 'Completado'
    } else if (this.consultation.balance < this.consultation.price) {
      this.consultation.status = 'Pendiente'
    }

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

  async newAttention() {
    if (this.edit) {
      this.router.navigateByUrl('control/attention/create', { state: this.consultation });
    } else {
      this.consultation.patient = this.patientGet as Patient
      let res = await firstValueFrom(this.consultationService.create(this.consultation));
      const consultation: Consultation = res as Consultation;
      this.router.navigateByUrl('control/attention/create', { state: consultation });
    }

  }

  detailAttention(item: Attention) {
    this.router.navigateByUrl('control/attention/edit/' + item.id, { state: this.consultation });
  }


  calculateRemaining() {
    this.paymentForm.patchValue({ amount: this.consultation.price - this.consultation.balance })
  }


  closeConsultation() {
    this.consultation.status = 'Cerrado'
    this.updateConsultation()
  }

  async deleteAtention(item: Attention) {
    await firstValueFrom(this.attentionService.delete(item.id));

    this.reload()
  }

  backHistory() {
    console.log(this.consultation);

    this.router.navigateByUrl('control/historial/' + this.consultation.patient.persona.numeroDocumento);
  }


  async getSymbols() {
    let filter: SymbolFilter = {
      page: 0,
      size: 100,
      sortOrder: 1,
      active: true,
      name: undefined
    };
    let res: Paginate_I = await firstValueFrom(
      this.symbolService.paginate(filter)
    );

    // this.symbolsList = res.content;
  }
}
