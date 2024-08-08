import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { AuthGuard } from 'src/app/security/guards/KeycloakAuthGuard';

const routes: Routes = [
  { path: 'principal', component: PrincipalComponent , canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
