import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { ModalComponent } from './modal/modal.component';
import { MessagesService } from './services/messages.service';



@NgModule({
  declarations: [
    MenuComponent,
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [MessagesService],
  exports: [ModalComponent]
})
export class LayoutsModule { }
