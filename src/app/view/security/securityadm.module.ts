import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { RoleComponent } from './role/role.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateRoleComponent } from './role/create-role/create-role.component';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule} from 'primeng/buttongroup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    RoleComponent,
    CreateRoleComponent,
    UserComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    ButtonModule,
    ButtonGroupModule
  ]
})
export class SecurityAdmModule { }
