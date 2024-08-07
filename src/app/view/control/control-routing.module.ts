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
import { AuthGuard } from 'src/app/security/guards/KeycloakAuthGuard';

const routes: Routes = [
  { path: 'historial', component: HistorialComponent, canActivate: [AuthGuard]  },
  { path: 'historial/:id', component: HistorialComponent, canActivate: [AuthGuard]  },
  { path: 'symbol', component: SymbolComponent , canActivate: [AuthGuard] },
  { path: 'symbol/create', component: CreateSymbolComponent , canActivate: [AuthGuard] },
  { path: 'symbol/edit/:id', component: CreateSymbolComponent, canActivate: [AuthGuard]  },
  { path: 'patient', component: PatientComponent, canActivate: [AuthGuard] },
  { path: 'patient/create', component: CreatepatientComponent , canActivate: [AuthGuard] },
  { path: 'patient/edit/:id', component: CreatepatientComponent, canActivate: [AuthGuard]  },
  {
    path: 'consultation/create',
    component: ConsultaComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'consultation/edit/:id',
    component: ConsultaComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'attention/create',
    component: AttentionComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'attention/edit/:id',
    component: AttentionComponent,
    canDeactivate: [PendingChangesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlRoutingModule {}
