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
import { LoaderComponent } from './loader/loader.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';



@NgModule({
  declarations: [
    MenuComponent,
    ModalComponent,
    LoaderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    // HttpClientModule,
    FontAwesomeModule,
    RouterModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: "rgba(0,0,0,0.1)",
      backdropBorderRadius: "40px",
      primaryColour: "#f6b162",
      secondaryColour: "#82d0fb",
      tertiaryColour: "#ffffff",
      fullScreenBackdrop: true
    })

  ],
  providers: [MessagesService, LoginService],
  exports: [ModalComponent, MenuComponent, LoaderComponent]
})
export class LayoutsModule {


  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
