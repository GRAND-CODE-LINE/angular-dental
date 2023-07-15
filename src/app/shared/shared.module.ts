import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniTableComponent } from './mini-table/mini-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MiniFilterComponent } from './mini-filter/mini-filter.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


@NgModule({
  declarations: [
    MiniTableComponent,
    MiniFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule

  ],
  exports: [MiniTableComponent, MiniFilterComponent]
})
export class SharedModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
