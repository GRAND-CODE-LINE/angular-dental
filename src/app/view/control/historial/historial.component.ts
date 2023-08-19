import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {

  paciente = {
    nombres: 'Carlos Mercado Baca',
    nroDocumento: '74870538',
    tipoDoc: 'DNI',
    fechaNacimiento: '10/02/1997',
    edad: '26 años',
    genero: 'Masculino',
    celular: '973669525',
    email: 'cmb1197@hotmail.com',
    direccion: 'Urb. Santa Rosa pasaje Chávez 347 - Wanchaq, Cusco'
  }

  nroDocumento: string = ''


  constructor(private consultationService: ConsultationService, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

    //let resp = await this.consultationService.test()
  }



  async getConsulta() {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    let res = await firstValueFrom(this.consultationService.searhConsultationByPatientNroDocumento(this.nroDocumento));
    console.log(res);
  }
}
