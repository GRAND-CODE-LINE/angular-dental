import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {

  patientGet!: Patient;

  nroDocumento: string = ''


  constructor(private consultationService: ConsultationService, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    //let resp = await this.consultationService.test()
  }



  async getConsultation() {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

    let res = await firstValueFrom(this.consultationService.searhConsultationByPatientNroDocumento(this.nroDocumento));

    this.patientGet = res as Patient
    console.log(this.patientGet);
  }
}
