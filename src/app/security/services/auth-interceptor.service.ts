import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, Subject, tap, throwError, } from 'rxjs';
import { MessagesService } from 'src/app/layouts/services/messages.service';
import { LoginResponse } from 'src/app/models/login';
import { Message_I } from 'src/app/models/utils/message_i';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router, private messageService: MessagesService, private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: any = localStorage.getItem('minita_user');
    const loginobj: LoginResponse = JSON.parse(token)

    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${loginobj.accessToken}`,
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    console.log(loginobj);
    console.log(request.headers);
    return next.handle(request)
      .pipe(
        tap(event => {
          // Realizar acciones en caso de éxito (por ejemplo, registro de la respuesta).
          if (event instanceof HttpResponse && event.body.error) {
            let message: Message_I = {
              title: 'Error',
              message: event.body.error,
              type: 'danger'
            }
            this.messageService.openModal(message);
            throw new Error('Error Login:' + event.body.error)
          }
        }),
        catchError((err: HttpErrorResponse, res: any) => {
          if ((err.status === 401 || err.status === 403) && this.router.url == '/security/login') {
            let message: Message_I = {
              title: 'Error',
              message: 'Usuario y/o contraseña incorrectos',
              type: 'danger'
            }
            this.messageService.openModal(message);
          } else if (err.status === 401 || err.status === 403) {
            let message: Message_I = {
              title: 'Error',
              message: 'Sesión ha expirado, ingresar nuevamente.',
              type: 'danger'
            }

            this.messageService.openModal(message);
            this.loginService.logOut();
            this.router.navigateByUrl('/security/login');
          } else if (err.status === 500) {
            let message: Message_I = {
              title: 'Error',
              message: 'Error no controlado.',
              type: 'danger'
            }
            this.messageService.openModal(message);
          }
          return throwError(() => new Error('Error Login:' + err.message));

        })
      );
  }


}

