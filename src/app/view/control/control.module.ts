import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlRoutingModule } from './control-routing.module';
import { PatientComponent } from './patient/patient.component';


@NgModule({
  declarations: [
    PatientComponent
  ],
  imports: [
    CommonModule,
    ControlRoutingModule
  ]
})
export class ControlModule { }
