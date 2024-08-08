import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { LoginService } from '../services/login.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
    constructor(protected override readonly router: Router, protected keycloak: KeycloakService, private loginService: LoginService) {
        super(router, keycloak);
    }

    public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('authenticated');
        console.log(this.authenticated);
        // Force the user to log in if currently unauthenticated.
        let token = localStorage.getItem('token') ? localStorage.getItem('token') : undefined
        // if (token) {
        //     let obj = JSON.parse(token)
        //     this.loginService.openTab(obj.access_token, obj.refresh_token)
        // }
        if (!this.authenticated && !token) {
            localStorage.clear();
            this.router.navigateByUrl('/security/login');
            return false;
        }
        return true;

        // // Get the roles required from the route.
        // const requiredRoles = route.data['roles'];
        // console.log('rolessssssssssssss');
        // console.log(route.data);

        // // Allow the user to proceed if no additional roles are required to access the route.
        // if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
        //     return true;
        // }

        // // Allow the user to proceed if all the required roles are present.
        // return requiredRoles.every((role) => this.roles.includes(role));
    }
}