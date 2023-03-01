import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { PersonComponent } from './person/person.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    PersonComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    AdmRoutingModule,
    FormsModule
  ]
})
export class AdmModule { }
