import { isStandalone, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { PersonComponent } from './person/person.component';
import { MenuComponent } from './menu/menu.component';
import { CreatePersonComponent } from './person/create-person/create-person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from 'src/app/services/role/role.service';
import { MiniTableComponent } from 'src/app/shared/mini-table/mini-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { TreeSelectModule } from 'primeng/treeselect';
import { CreatemenuComponent } from './menu/createmenu/createmenu.component';
import { ExpressionType } from '@angular/compiler';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonGroupModule } from 'primeng/buttongroup';

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
    SharedModule,
    FloatLabelModule,
    DropdownModule,
    TreeSelectModule,
    InputSwitchModule,
    FontAwesomeModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ButtonGroupModule,
  ],
  exports: [AdmRoutingModule],
  providers: [RoleService],
})
export class AdmModule {}
