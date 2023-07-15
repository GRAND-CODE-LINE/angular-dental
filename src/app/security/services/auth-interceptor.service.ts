import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError, } from 'rxjs';
import { MessagesService } from 'src/app/layouts/services/messages.service';
import { LoginResponse } from 'src/app/models/login';
import { Message_I } from 'src/app/models/utils/message_i';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private messageService: MessagesService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    const token: any = localStorage.getItem('minita_user');
    const loginobj: LoginResponse = JSON.parse(token)

    let request = req;
    console.log("--------------Aqui token", token);

    if (token) {


      request = req.clone({
        //headers: new HttpHeaders({ Authorization: loginobj.tokenType + ' ' + loginobj.accessToken }),
        // setHeaders: {
        //   'Authorization': loginobj.tokenType + ' ' + loginobj.accessToken
        // }
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

        catchError((err: HttpErrorResponse) => {
          console.log(err);
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
              message: 'Seson ha expirado, ingresar nuevamente.',
              type: 'danger'
            }
            this.messageService.openModal(message);
            this.router.navigateByUrl('/security/login');
          }
          return throwError(() => new Error('Error Login:' + err.message));

        })
      );
  }

}

