import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap} from 'rxjs/operators';

import * as actions from '../actions';
import { Store } from '@ngrx/store';
import { ofAction } from 'ngrx-actions/dist';
import { Router } from '@angular/router';
import { CompanyService } from 'app/service/company.service';

@Injectable()
export class CompanyEffects {
  constructor(
    private store: Store<any>,
    private update$: Actions,
    private router: Router,
    private companyService: CompanyService) { }

  @Effect()
  getCompany$ = this.update$.pipe(
    ofAction(actions.GetCompany),
    switchMap(company => this.companyService.getCompany(company.payload)),
    map(response => {
      return new actions.GetCompanySuccess(response);
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
        localStorage.setItem('CVBook-CurrentCompany', response[0].kompanijaID);
        sessionStorage.setItem('CVBook-Token', response[0].token);
        this.router.navigate([`/dashboard`]);
        return new actions.AuthCompanySuccess(response);
      } else {
        return new actions.AuthCompanyFail(response);
      }
    })
  );
}
