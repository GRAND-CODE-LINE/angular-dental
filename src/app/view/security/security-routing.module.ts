import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';


const routes: Routes = [
    { path: 'user', component: UserComponent },

    { path: 'user/create', component: CreateUserComponent },
    { path: 'user/create/:id', component: CreateUserComponent },
    { path: 'role', component: RoleComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityRoutingModule { }
