import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { PersonComponent } from './person/person.component';
import { MenuComponent } from './menu/menu.component';
import { CreatePersonComponent } from './person/create-person/create-person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from 'src/app/services/role/role.service';
import { MiniTableComponent } from 'src/app/shared/mini-table/mini-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreatemenuComponent } from './menu/createmenu/createmenu.component';
@NgModule({
  declarations: [
    PersonComponent,
    MenuComponent,
    CreatePersonComponent,
    CreatemenuComponent,
    //MiniTableComponent
  ],
  imports: [
    CommonModule,
    AdmRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [AdmRoutingModule],
  providers: [RoleService]
})
export class AdmModule { }
