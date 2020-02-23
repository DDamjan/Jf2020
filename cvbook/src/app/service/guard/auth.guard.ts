import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentCompany = localStorage.getItem('CVBook-CurrentCompany');
        if (currentCompany) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
