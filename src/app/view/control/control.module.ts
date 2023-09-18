import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlRoutingModule } from './control-routing.module';
import { HistorialComponent } from './historial/historial.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PatientComponent } from './patient/patient.component';
import { CreatepatientComponent } from './patient/createpatient/createpatient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { PersonService } from 'src/app/services/person/person.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';
import { HttpClientModule } from '@angular/common/http';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { SymbolComponent } from './symbol/symbol.component';
import { TimeAgoDetailedPipe } from 'src/app/pipes/time-ago-detailed.pipe';
import { CreateSymbolComponent } from './symbol/create-symbol/create-symbol.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AttentionComponent } from './attention/attention.component';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [
    HistorialComponent,
    ConsultaComponent,
    PatientComponent,
    CreatepatientComponent,
    AgePipe,
    TimeAgoDetailedPipe,
    SymbolComponent,
    CreateSymbolComponent,
    AttentionComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ControlRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
    WebcamModule,
  ],
})
export class ControlModule {}
