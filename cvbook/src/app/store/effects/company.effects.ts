import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

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

  @Effect()
  authCompany$ = this.update$.pipe(
    ofAction(actions.AuthCompany),
    switchMap(data => this.companyService.authCompany(data.payload)),
    map(response => {
      console.log(response);
      if (response !== undefined && response.status === undefined) {
        console.log(response[0]);
        localStorage.setItem('CVBook-CurrentCompany',
        JSON.stringify({ username: response[0].username, kompanijaID: response[0].kompanijaID }));
        this.cookieService.setCookie('CVBook-Token', response[0].token, 8);
        this.router.navigate([`/dashboard`]);
        return new actions.AuthCompanySuccess(response[0]);
      } else {
        const fail = {
          kompanijaID: -1,
          username: 'error'
      };
        return new actions.AuthCompanyFail(fail);
      }
    })
  );

  // @Effect()
  // getHistory$ = this.update$.pipe(
  //   ofAction(actions.GetHistory),
  //   switchMap(company => this.companyService.getHistory(company.payload)),
  //   map(response => {
  //     if (response !== undefined && response.status === undefined) {
  //       this.badToken();
  //       return new actions.TokenExpired();
  //     } else {
  //       return new actions.GetHistorySuccess(response);
  //     }
  //   })
  // );

  badToken() {
    localStorage.removeItem('CVBook-CurrentCompany');
    this.cookieService.deleteCookie('CVBook-Token');
    this.router.navigate(['/']);
  }
}
