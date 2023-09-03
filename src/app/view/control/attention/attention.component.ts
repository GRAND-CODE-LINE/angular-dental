import { Location } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { firstValueFrom } from 'rxjs';
import { Attention } from 'src/app/models/attention';
import { Consultation } from 'src/app/models/consultation';
import { Patient } from 'src/app/models/patient';
import { Procedure } from 'src/app/models/procedure';
import { Symbol } from 'src/app/models/symbol';
import { Paginate_I } from 'src/app/models/utils/filter_i';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { SymbolService } from 'src/app/services/symbol/symbol.service';

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.scss']
})
export class AttentionComponent {
  modalRef?: BsModalRef;

  @ViewChild('modalActions') modalAction!: TemplateRef<any>;
  config = {
    animated: true,
    size: 'lg',
    class: 'modal-lg'
  };
  consultation: Consultation | undefined;
  patientGet: Patient | undefined;
  procedures: Procedure[] = [];
  procedureselected!: FormGroup;
  symbolsList: Symbol[] = []
  attention!: Attention
  constructor(
    private route: ActivatedRoute, private modalService: BsModalService, private consultationService: ConsultationService,
    private patientService: PatientService, private location: Location, private fb: FormBuilder, private symbolService: SymbolService
  ) {

  }

  ngOnInit(): void {
    this.initAttention()
    this.getSymbols();
    console.log('Init');
    let state = this.location.getState();
    this.consultation = state as unknown as Consultation;
    this.patientGet = this.consultation.patient;

    this.procedureselected = this.fb.group({
      id: [null],
      name: [null, Validators.compose([Validators.required])],
      comments: [null, Validators.compose([Validators.required])],
    })
  }

  initAttention() {
    this.attention = {
      comments: '',
      status: 'Creado',
      procedures: [],
    }
  }

  initData() {

  }



  onProcedureClick() {
    this.modalRef = this.modalService.show(this.modalAction, this.config)
  }
  onAddProcedure(event: Procedure) {
    let procedure = this.procedureselected.value;

    this.procedures.push(procedure)
    this.procedureselected.reset()
  }

  onEditClick(event: Procedure): void {

  }

  onDeleteClick(event: Procedure): void {
  }

  llenarData(data: Consultation) {
    //this.patientForm.patchValue(data);
  }

  saveChanges() {

  }

  reload() {

  }


  async getSymbols() {
    let filter = {
      page: 0,
      size: 100,
      sortOrder: 1
    }
    let res: Paginate_I = await firstValueFrom(this.symbolService.paginate(filter));

    this.symbolsList = res.content
  }

  selectSymbol(item: any) {

  }
}


