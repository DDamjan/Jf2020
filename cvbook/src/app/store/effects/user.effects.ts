import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as actions from '../actions';
import { Store } from '@ngrx/store';
import { ofAction } from 'ngrx-actions/dist';
import { Router } from '@angular/router';
import { UserService } from 'app/service/user.service';
import { CookieService } from 'app/service/cookie.service';

@Injectable()
export class UserEffects {
  constructor(
    private store: Store<any>,
    private update$: Actions,
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService) { }

  @Effect()
  getUser$ = this.update$.pipe(
    ofAction(actions.GetUser),
    switchMap(user => this.userService.getUser(user.payload)),
    map(response => {
      if (response.success !== undefined && response.success === false) {
        this.badToken();
        return new actions.TokenExpired();
      } else {
        return new actions.GetUserSuccess(response);
      }
    })
  );

  @Effect()
  getUsers$ = this.update$.pipe(
    ofAction(actions.GetUsers),
    switchMap(users => this.userService.getUsers()),
    map(response => {
      if (response[0].success !== undefined && response[0].success === false) {
        this.badToken();
        return new actions.TokenExpired();
      } else {
        return new actions.GetUsersSuccess(response);
      }
    })
  );

  @Effect()
  filterUsers$ = this.update$.pipe(
    ofAction(actions.FilterUsers),
    switchMap(filters => this.userService.filterUsers(filters.payload)),
    map(response => {
      if (response.success !== undefined && response.success === false) {
        this.badToken();
        return new actions.TokenExpired();
      } else {
        if (response.filteredUsers.length === 0) {
        return new actions.FilterUsersEmpty();
      } else {
        return new actions.FilterUsersSuccess(response);
      }
    }
    })
  );

badToken() {
  localStorage.removeItem('CVBook-CurrentCompany');
  this.cookieService.deleteCookie('CVBook-Token');
  this.router.navigate(['/']);
}
}
