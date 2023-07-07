import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./view/home/home.module').then(m => m.HomeModule) },
  { path: 'adm', loadChildren: () => import('./view/adm/adm.module').then(m => m.AdmModule) },
  { path: 'security', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) },
  { path: 'securityadm', loadChildren: () => import('./view/security/securityadm.module').then(m => m.SecurityAdmModule) },
  { path: '', redirectTo: '/security/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
