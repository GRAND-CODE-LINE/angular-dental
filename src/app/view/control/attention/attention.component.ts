import { Location } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Consultation } from 'src/app/models/consultation';
import { Patient } from 'src/app/models/patient';
import { Procedure } from 'src/app/models/procedure';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.scss']
})
export class AttentionComponent {
  modalRef?: BsModalRef;
  
  @ViewChild('modalActions') modalAction!: TemplateRef<any>;
  config = {
    animated: true
  };
  Cards:any[]=[];
  items:Procedure[]=[];
  consultation:Consultation|undefined;
  patient :Patient|undefined;
  procedures:Procedure[]=[];
  procedureselected!:FormGroup;
  constructor(
    private route : ActivatedRoute,
    private modalService: BsModalService,
    private consultationService: ConsultationService,
    private patientService: PatientService,
    private location :Location,
    private fb: FormBuilder
    ) {

  }

  ngOnInit(): void {
    console.log('Init');
    let state = this.location.getState();
    this.consultation=state as unknown as Consultation;
    this.patient=this.consultation.patient;
  }

  initData() { 
    
  }

  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy person');
  }

  onProcedureClick(){
 this.modalRef = this.modalService.show(this.modalAction,this.config)
  }
  onAddProcedure(event : Procedure){
  this.procedureselected= this.fb.group({
    id:[null, Validators.compose([Validators.required])],
    Comments:[null, Validators.compose([Validators.required])],
  })
  
  this.procedures.push()
  }

  onEditClick(event: Procedure): void {

  }

  onDeleteClick(event: Procedure): void {
  }
  
  llenarData(data : Consultation) {
    //this.patientForm.patchValue(data);
  }
}


