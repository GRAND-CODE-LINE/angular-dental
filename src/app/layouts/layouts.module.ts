import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { ModalComponent } from './modal/modal.component';
import { MessagesService } from './services/messages.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from '../security/services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MenuComponent,
    ModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    // HttpClientModule,
    FontAwesomeModule,
    RouterModule

  ],
  providers: [MessagesService, LoginService],
  exports: [ModalComponent, MenuComponent]
})
export class LayoutsModule {


  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
