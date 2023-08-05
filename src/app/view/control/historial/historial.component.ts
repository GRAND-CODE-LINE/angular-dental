import { Component } from '@angular/core';

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

}
