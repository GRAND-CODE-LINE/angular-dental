import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesService } from '../layouts/services/messages.service';
import { ModalComponent } from '../layouts/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    // HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [LoginService],
  exports: [SecurityRoutingModule]
})
export class SecurityModule { }
