import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap} from 'rxjs/operators';

import * as actions from '../actions';
import { Store } from '@ngrx/store';
import { ofAction } from 'ngrx-actions/dist';
import { Router } from '@angular/router';
import { CompanyService } from '../../service/company.service';
import { CookieService } from '../../service/cookie.service';

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


  badToken() {
    // console.log('BAD TOKEN COMPANY');
    localStorage.removeItem('CVBook-CurrentCompany');
    this.cookieService.deleteCookie('CVBook-Token');
    this.router.navigate(['/']);
  }
}
