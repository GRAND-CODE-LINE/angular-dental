import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { PersonComponent } from './person/person.component';
import { MenuComponent } from './menu/menu.component';
@NgModule({
  declarations: [
    PersonComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    AdmRoutingModule
  ],
  exports: [AdmRoutingModule]
})
export class AdmModule { }
