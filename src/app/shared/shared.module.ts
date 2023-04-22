import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniTableComponent } from './mini-table/mini-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MiniTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    
  ], 
  exports: [MiniTableComponent]
})
export class SharedModule { }
