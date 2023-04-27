import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniTableComponent } from './mini-table/mini-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MiniFilterComponent } from './mini-filter/mini-filter.component';



@NgModule({
  declarations: [
    MiniTableComponent,
    MiniFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    
  ], 
  exports: [MiniTableComponent, MiniFilterComponent]
})
export class SharedModule { }
