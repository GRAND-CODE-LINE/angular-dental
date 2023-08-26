import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlRoutingModule } from './control-routing.module';
import { HistorialComponent } from './historial/historial.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PatientComponent } from './patient/patient.component';
import { CreatepatientComponent } from './patient/createpatient/createpatient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";
import { PersonService } from 'src/app/services/person/person.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';
import { HttpClientModule } from '@angular/common/http';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { ProcedureComponent } from './procedure/procedure.component';
import { AttentionComponent } from './attention/attention.component';


@NgModule({
    declarations: [
        HistorialComponent,
        ConsultaComponent,
        PatientComponent,
        CreatepatientComponent,
        AgePipe,
        ProcedureComponent,
        AttentionComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ControlRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class ControlModule { }
