import { APP_INITIALIZER, LOCALE_ID, NgModule, Provider, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptorService } from './security/services/auth-interceptor.service';
import { LayoutsModule } from './layouts/layouts.module';
import { MessagesService } from './layouts/services/messages.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { LoaderInterceptorService } from './security/services/loader-interceptor.service';

import localeEs from "@angular/common/locales/es";
import { CommonModule, DatePipe, registerLocaleData } from "@angular/common";
import { KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { LoginResponse } from './models/login';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginService } from './security/services/login.service';
registerLocaleData(localeEs, "es");

function initializeKeycloak(keycloak: KeycloakService, loginService: LoginService) {
  return async () =>
    await keycloak.init({
      config: {
        url: 'http://localhost:9090',
        realm: 'DENTAL_DEV',
        clientId: 'dental-security-front'
      },
      initOptions: {
        pkceMethod: 'S256',
        checkLoginIframe: false,
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',

      shouldAddToken: (request) => {
        const { method, url } = request;
        const isGetRequest = 'GET' === method.toUpperCase();
        const acceptablePaths = ['/assets', '/clients/public'];
        const isAcceptablePathMatch = acceptablePaths.some((path) =>
          url.includes(path)
        );

        return !(isGetRequest && isAcceptablePathMatch);
      }
    }).then((authenticated) => {
      console.log(`APP MODULE Keycloak inicializado - Autenticado: ${authenticated}`);
      const keycloakAuth = keycloak.getKeycloakInstance();

      keycloakAuth.onTokenExpired = () => {
        if (keycloakAuth.refreshToken) {
          keycloak.updateToken()
            .then(async (refreshed) => {
              if (refreshed) {

                let res: LoginResponse = await firstValueFrom(loginService.updateTokenRequest());
                if (res) {
                  await (loginService.setTokenToCookies(res))
                }
                console.log('Token was successfully refreshed');
              } else {
                console.log('Token is still valid');
              }
            }).catch(function () {
              console.log('Failed to refresh the token, or the session has expired');
            });
        } else {
          // login();
        }
      }
    }).catch((error) => console.error('Error en la inicialización de Keycloak', error));;
}

// Provider for Keycloak Bearer Interceptor
const KeycloakBearerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true
};

// Provider for Keycloak Initialization
const KeycloakInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  multi: true,
  deps: [KeycloakService]
}


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    LayoutsModule,
    ModalModule.forRoot(),
    FontAwesomeModule,
    KeycloakAngularModule,
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },

    KeycloakInitializerProvider, // Initializes Keycloak
    MessagesService,
    { provide: LOCALE_ID, useValue: "es" },
    DatePipe
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}

