import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComponent } from './historial/historial.component';
import { PatientComponent } from './patient/patient.component';
import { CreatepatientComponent } from './patient/createpatient/createpatient.component';

const routes: Routes = [
  { path: 'historial', component: HistorialComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'patient/create', component: CreatepatientComponent },
  { path: 'patient/edit/:id',component:CreatepatientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule { }
