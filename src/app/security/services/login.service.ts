import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { firstValueFrom, Observable } from 'rxjs';
import { Login, LoginResponse as LoginResponse } from 'src/app/models/login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router, private keycloakService: KeycloakService) {
  }
  // http://localhost:9090/realms/DENTAL_DEV/protocol/openid-connect/token
  URL_BASE = environment.URL_SECURITY + '/api';

  checkAuthStatus(): boolean {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      console.log('tiene localStorage');
      return true
    } else {
      console.log('no tiene localStorage');
      return false
    }
  }


  public loginRequest(login: Login): Observable<LoginResponse> {
    console.log('services');
    login.client_id = 'dental-security-front'
    login.grant_type = 'password'
    login.client_secret = 'AhU7m7V6W7PY8Xd1pKPhzG7X0Hz4TjP2'
    const body = new HttpParams()
      .set('username', login.username)
      .set('password', login.password)
      .set('grant_type', 'password')
      .set('client_id', login.client_id)
    // .set('client_secret', login.client_secret);

    return this.http.post<any>('http://localhost:9090/realms/DENTAL_DEV/protocol/openid-connect/token', body)
  }

  public updateTokenRequest(): Observable<LoginResponse> {
    const token: any = localStorage.getItem('token');
    const loginobj: LoginResponse = JSON.parse(token)

    const username: any = localStorage.getItem('username');
    let login: Login = { username: username, password: '' };
    login.client_id = 'dental-security-front'
    login.grant_type = 'refresh_token'
    const body = new HttpParams()
      .set('username', login.username)
      .set('grant_type', 'refresh_token')
      .set('client_id', login.client_id)
      .set('refresh_token', loginobj.refresh_token)
    return this.http.post<any>('http://localhost:9090/realms/DENTAL_DEV/protocol/openid-connect/token', body)
  }



  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('');
  }

  async setTokenToCookies(resp: any) {
    console.log(resp);
    await localStorage.setItem('token', JSON.stringify(resp));
    await this.loadKeycloak(resp.access_token, resp.refresh_token)

  }

  isLogged() {
    return !!localStorage.getItem("token");
  }




  openTab(access_token: any, refresh_token: any) {
    this.loadKeycloak(access_token, refresh_token)
  }

  async loadKeycloak(access_token: any, refresh_token: any) {
    await this.keycloakService.init({
      config: {
        url: 'http://localhost:9090',
        realm: 'DENTAL_DEV',
        clientId: 'dental-security-front'
      },
      initOptions: {
        pkceMethod: 'S256',
        checkLoginIframe: false,
        token: access_token,
        refreshToken: refresh_token,
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',

    }).then((authenticated) => {
      console.log(`LOGIN SERVICE Keycloak inicializado - Autenticado: ${authenticated}`);
      if (!authenticated) {
        localStorage.clear();
        this.router.navigateByUrl('/security/login');
      }



      this.keycloakService.keycloakEvents$.subscribe({
        next: (e) => {
          if (e.type == KeycloakEventType.OnTokenExpired) {
            console.log('Token EXPIRED !!!!!!!!!!!!!!');
            this.keycloakService.updateToken(20).then(async refreshed => {
              console.log('refreshed');
              console.log(refreshed);

              if (refreshed) {
                let res: LoginResponse = await firstValueFrom(this.updateTokenRequest());
                if (res) {
                  await (this.setTokenToCookies(res))
                }
                console.log('Token was successfully refreshed');
              } else {
                console.log('Token is still valid');
              }
            });
          }
        }
      });
    }).catch((error) => console.error('Error en la inicialización de Keycloak', error));;
  }

}
