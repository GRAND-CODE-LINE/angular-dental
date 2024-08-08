import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PersonComponent } from './person/person.component';
import { CreatePersonComponent } from './person/create-person/create-person.component';
import { CreatemenuComponent } from './menu/createmenu/createmenu.component';
import { PendingChangesGuard } from 'src/app/security/guards/PendingChangesGuard';
import { AuthGuard } from 'src/app/security/guards/KeycloakAuthGuard';

const routes: Routes = [
  { path: 'person', component: PersonComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'person/create', component: CreatePersonComponent, canActivate: [AuthGuard] },
  { path: 'person/edit/:id', component: CreatePersonComponent, canActivate: [AuthGuard] },
  { path: 'menu/create', component: CreatemenuComponent, canActivate: [AuthGuard] },
  { path: 'menu/edit/:id', component: CreatemenuComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmRoutingModule { }
