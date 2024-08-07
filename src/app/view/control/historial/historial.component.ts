import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';
import { trigger, state, animate, style, transition } from '@angular/animations'
import { Patient } from 'src/app/models/patient';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  animations: [
    trigger('dosearch', [
      state('novalue', style({
        transform: 'translateY(40vh)'
      })),
      state('withvalue', style({
        transform: 'translateY(0)'
      })),
      transition('novalue -> withvalue', animate('200ms ease-in')),
      transition('withvalue -> novalue', animate('600ms ease-out'))
    ])
  ]
})
export class HistorialComponent {

  status: string = 'novalue';
  patientGet: Patient | undefined;

  nroDocumento: string = ''


  constructor(private consultationService: ConsultationService, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    //let resp = await this.consultationService.test()
    if (this.route.snapshot.params['id'] != undefined) {
      this.nroDocumento = this.route.snapshot.params['id']
      this.getConsultation()
    }
  }



  async getConsultation() {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

    let res = await firstValueFrom(this.consultationService.searhConsultationByPatientNroDocumento(this.nroDocumento));
    if (res) {
      this.status = 'withvalue';
    }
    this.patientGet = res as Patient
    this.patientGet.consultations = this.patientGet.consultations?.sort(function (a, b) {
      return b.code - a.code
    })
    console.log(this.patientGet);

  }

  cancel() {
    this.patientGet = undefined;
    this.nroDocumento = '';
    this.status = 'novalue';
  }

  newConsultation() {
    // this.router.navigate(['control/consultation/create'])
    this.router.navigateByUrl('control/consultation/create', { state: this.patientGet });
  }


  editConsultation(idConsultation: any) {
    this.router.navigateByUrl('control/consultation/edit/' + idConsultation, { state: this.patientGet });
  }

  patientEdit() {
    this.router.navigateByUrl('control/patient/edit/' + this.patientGet?.id);
  }
}
