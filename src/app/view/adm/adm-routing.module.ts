import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PersonComponent } from './person/person.component';
import { CreatePersonComponent } from './person/create-person/create-person.component';

const routes: Routes = [
  { path: 'person', component: PersonComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'person/create', component: CreatePersonComponent },
  { path: 'person/create/:id', component: CreatePersonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
