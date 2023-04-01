import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { PersonComponent } from './person/person.component';
import { MenuComponent } from './menu/menu.component';
import { CreatePersonComponent } from './person/create-person/create-person.component';
import { PersonNewComponent } from './person/person-new/person-new.component';
@NgModule({
  declarations: [
    PersonComponent,
    MenuComponent,
    CreatePersonComponent,
    PersonNewComponent
  ],
  imports: [
    CommonModule,
    AdmRoutingModule
  ],
  exports: [AdmRoutingModule]
})
export class AdmModule { }
