import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrincipalComponent } from './view/home/principal/principal.component';
import { PersonComponent } from './view/adm/person/person.component';
import { AdmModule } from './view/adm/adm.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './security/services/auth-interceptor.service';
import { LayoutsModule } from './layouts/layouts.module';
import { MessagesService } from './layouts/services/messages.service';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AdmModule,
    RouterModule.forRoot([
      {path: 'principal', component:PrincipalComponent},
      {path: 'person', component:PersonComponent},
      {path: '**', redirectTo:'/,', pathMatch:'full'}
    ]),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),LayoutsModule, ModalModule.forRoot()
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
