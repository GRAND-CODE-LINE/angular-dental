import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlRoutingModule } from './control-routing.module';
import { HistorialComponent } from './historial/historial.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PatientComponent } from './patient/patient.component';


@NgModule({
  declarations: [
    HistorialComponent,
    ConsultaComponent,
    PatientComponent
  ],
  imports: [
    CommonModule,
    ControlRoutingModule,
    FontAwesomeModule
  ]
})
export class ControlModule { }
