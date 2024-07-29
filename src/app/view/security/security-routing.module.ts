import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { CreateRoleComponent } from './role/create-role/create-role.component';


const routes: Routes = [
    { path: 'user', component: UserComponent },

    { path: 'user/create', component: CreateUserComponent },
    { path: 'user/create/:id', component: CreateUserComponent },
    { path: 'role', component: RoleComponent },
    { path: 'role/create', component: CreateRoleComponent },
    { path: 'role/create/:id', component: CreateRoleComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityRoutingModule { }
