import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { CreateRoleComponent } from './role/create-role/create-role.component';
import { AuthGuard } from 'src/app/security/guards/KeycloakAuthGuard';


const routes: Routes = [
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },

    { path: 'user/create', component: CreateUserComponent, canActivate: [AuthGuard] },
    { path: 'user/create/:id', component: CreateUserComponent, canActivate: [AuthGuard] },
    { path: 'role', component: RoleComponent, canActivate: [AuthGuard] },
    { path: 'role/create', component: CreateRoleComponent, canActivate: [AuthGuard] },
    { path: 'role/create/:id', component: CreateRoleComponent, canActivate: [AuthGuard] },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityRoutingModule { }
