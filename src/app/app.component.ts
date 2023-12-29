import { Component, OnInit } from '@angular/core';
import { AuthInterceptorService } from './security/services/auth-interceptor.service';
import { LoginService } from './security/services/login.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'minita_front';


  constructor(public authService: AuthInterceptorService, private loginservice: LoginService, private router: Router) {
    this.router.events.subscribe(async (event: Event) => {
      if (event instanceof NavigationStart) {
        if (this.loginservice.checkAuthStatus()) {
          let res = await this.loginservice.validateToken()
        }
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }

  async ngOnInit() {
    if (this.loginservice.checkAuthStatus()) {
      let res = await this.loginservice.validateToken()
    }
  }
}
