import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap} from 'rxjs/operators';

import * as actions from '../actions';
import { Store } from '@ngrx/store';
import { ofAction } from 'ngrx-actions/dist';
import { Router } from '@angular/router';
import { CompanyService } from '../../service/company.service';
import { CookieService } from '../../service/cookie.service';
import { stringify } from '@angular/compiler/src/util';

@Injectable()
export class CompanyEffects {
  constructor(
    private store: Store<any>,
    private update$: Actions,
    private router: Router,
    private companyService: CompanyService,
    private cookieService: CookieService) { }

  @Effect()
  getCompany$ = this.update$.pipe(
    ofAction(actions.GetCompany),
    switchMap(company => this.companyService.getCompany(company.payload)),
    map(response => {
      if (response[0].success !== undefined && response[0].success === false) {
        this.badToken();
        return new actions.TokenExpired();
      } else {
        return new actions.GetCompanySuccess(response[0]);
      }
    })
  );

  @Effect()
  authCompany$ = this.update$.pipe(
    ofAction(actions.AuthCompany),
    switchMap(data => this.companyService.authCompany(data.payload)),
    map(response => {
      console.log('company.effects.authCompany response');
      console.log(response);
      if (response[0].username !== 'error') {
        localStorage.setItem('CVBook-CurrentCompany', JSON.stringify(response[0]));
        this.cookieService.setCookie('CVBook-Token', response[0].token, 8);
        this.router.navigate([`/dashboard`]);
        return new actions.AuthCompanySuccess(response[0]);
      } else {
        return new actions.AuthCompanyFail(response[0]);
      }
    })
  );

  badToken() {
    console.log('BAD TOKEN COMPANY');
    localStorage.removeItem('CVBook-CurrentCompany');
    this.cookieService.deleteCookie('CVBook-Token');
    this.router.navigate(['/']);
  }
}
