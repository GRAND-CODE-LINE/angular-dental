import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError, } from 'rxjs';
import { MessagesService } from 'src/app/layouts/services/messages.service';
import { Message_I } from 'src/app/models/utils/message_i';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private messageService: MessagesService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string | null = localStorage.getItem('token');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }
    console.log(this.router.url);
    return next.handle(request).pipe(

      catchError((err: HttpErrorResponse) => {

        if (err.status === 401 && this.router.url == '/security/login') {
          let message: Message_I = {
            title: 'Error',
            message: 'Usuario y/o contraseña incorrectos',
            type: 'danger'
          }
          this.messageService.openModal(message);
        } else if (err.status === 401) {

          this.router.navigateByUrl('/security/login');
        }
        return throwError(() => new Error('Error Login:' + err.message));

      })
    );
  }

}

