import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PersonComponent } from './person/person.component';
import { CreatePersonComponent } from './person/create-person/create-person.component';
import { CreatemenuComponent } from './menu/createmenu/createmenu.component';
import { PendingChangesGuard } from 'src/app/security/guards/PendingChangesGuard';

const routes: Routes = [
  { path: 'person', component: PersonComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'person/create', component: CreatePersonComponent },
  { path: 'person/edit/:id', component: CreatePersonComponent },
  {
    path: 'menu/create',
    component: CreatemenuComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'menu/edit/:id',
    component: CreatemenuComponent,
    canDeactivate: [PendingChangesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmRoutingModule {}
