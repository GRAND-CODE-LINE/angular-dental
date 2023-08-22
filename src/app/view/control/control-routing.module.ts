import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComponent } from './historial/historial.component';
import { PatientComponent } from './patient/patient.component';
import { CreatepatientComponent } from './patient/createpatient/createpatient.component';
import { SymbolComponent } from './symbol/symbol.component';
import { CreateSymbolComponent } from './symbol/create-symbol/create-symbol.component';

const routes: Routes = [
  { path: 'historial', component: HistorialComponent },
  { path: 'symbol', component: SymbolComponent },
  { path: 'symbol/create', component: CreateSymbolComponent },
  { path: 'symbol/edit/:id', component: CreateSymbolComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'patient/create', component: CreatepatientComponent },
  { path: 'patient/edit/:id', component: CreatepatientComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule { }
