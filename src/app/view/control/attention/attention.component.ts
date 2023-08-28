import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Consultation } from 'src/app/models/consultation';
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
  constructor(
    private route : ActivatedRoute,
    private modalService: BsModalService,
    private consultationService: ConsultationService,
    private patientService: PatientService
    ) {

  }

  ngOnInit(): void {
    console.log('Init');
    this.initData();
  }

  initData() { 
    //llenarData(this.route.snapshot.paramMap.get())
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
  onEditClick(event: Procedure): void {

  }

  onDeleteClick(event: Procedure): void {
  }
  
  llenarData(data : Consultation) {
    //this.patientForm.patchValue(data);
  }
}


