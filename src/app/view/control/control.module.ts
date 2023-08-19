import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlRoutingModule } from './control-routing.module';
import { HistorialComponent } from './historial/historial.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PatientComponent } from './patient/patient.component';
import { CreatepatientComponent } from './patient/createpatient/createpatient.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";
import { PersonService } from 'src/app/services/person/person.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ConsultationService } from 'src/app/services/consultation/consultation.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [
        HistorialComponent,
        ConsultaComponent,
        PatientComponent,
        CreatepatientComponent
    ],
    imports: [

        CommonModule,
        ControlRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class ControlModule { }
