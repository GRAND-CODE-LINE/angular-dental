import { Component, OnInit } from '@angular/core';
import { AuthInterceptorService } from './security/services/auth-interceptor.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'minita_front';


  constructor(public authService: AuthInterceptorService) { }

  ngOnInit() {
  }
}
