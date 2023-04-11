import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { ModalComponent } from './modal/modal.component';
import { MessagesService } from './services/messages.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from '../security/services/login.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    MenuComponent,
    ModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [MessagesService, LoginService],
  exports: [ModalComponent]
})
export class LayoutsModule { }
