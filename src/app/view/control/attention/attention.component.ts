import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  Cards: any[] = [];
  items: any[] = [];
  consulta : Consultation;
  @Input() edit: boolean = false
  @Input() delete: boolean = false


  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private consultationService: ConsultationService,
    private patientService: PatientService
    ) {

  }

  ngOnInit(): void {
    console.log('Init');
    this.initCols();
  }

  initCols() {
    const id = this.route.snapshot.paramMap.get('id')!
     this.consulta=this.consultationService.getByid(id);
    
  }

  ngOnChanges() {
    console.log('Changes');
  }

  ngOnDestroy() {
    console.log('Destroy person');
  }

  onEditClick(event: Procedure): void {

  }

  onDeleteClick(event: Procedure): void {
  }
}