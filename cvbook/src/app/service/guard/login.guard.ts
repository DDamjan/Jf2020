import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../models/User';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<any>
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentCompany = localStorage.getItem('currentCompany');
        if (currentCompany != null) {
            this.router.navigate([`/login`]);
            return false;
        }
        return true;
    }
}
