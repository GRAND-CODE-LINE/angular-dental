import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComponent } from './historial/historial.component';
import { PatientComponent } from './patient/patient.component';
import { CreatepatientComponent } from './patient/createpatient/createpatient.component';
import { SymbolComponent } from './symbol/symbol.component';
import { CreateSymbolComponent } from './symbol/create-symbol/create-symbol.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { AttentionComponent } from './attention/attention.component';
import { PendingChangesGuard } from 'src/app/security/guards/PendingChangesGuard';

const routes: Routes = [
  { path: 'historial', component: HistorialComponent },
  { path: 'historial/:id', component: HistorialComponent },
  { path: 'symbol', component: SymbolComponent },
  { path: 'symbol/create', component: CreateSymbolComponent },
  { path: 'symbol/edit/:id', component: CreateSymbolComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'patient/create', component: CreatepatientComponent },
  { path: 'patient/edit/:id', component: CreatepatientComponent },
  { path: 'consultation/create', component: ConsultaComponent, canDeactivate: [PendingChangesGuard] },
  { path: 'consultation/edit/:id', component: ConsultaComponent, canDeactivate: [PendingChangesGuard] },
  { path: 'attention/create', component: AttentionComponent, canDeactivate: [PendingChangesGuard] },
  { path: 'attention/edit/:id', component: AttentionComponent, canDeactivate: [PendingChangesGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule { }
