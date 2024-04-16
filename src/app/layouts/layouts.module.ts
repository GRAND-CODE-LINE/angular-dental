import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { ModalComponent } from './modal/modal.component';
import { MessagesService } from './services/messages.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from '../security/services/login.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BrowserModule } from '@angular/platform-browser';

import { BlockUIModule } from 'primeng/blockui';

@NgModule({
  declarations: [
    MenuComponent,
    ModalComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule,
    ProgressSpinnerModule,
    BlockUIModule
  ],
  providers: [MessagesService, LoginService],
  exports: [ModalComponent, MenuComponent, LoaderComponent]
})
export class LayoutsModule {


  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
