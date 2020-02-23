import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as actions from '../actions';
import { Store } from '@ngrx/store';
import { ofAction } from 'ngrx-actions/dist';
import { Router } from '@angular/router';
import { UserService } from 'app/service/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private store: Store<any>,
    private update$: Actions,
    private router: Router,
    private userService: UserService) { }

  // @Effect()
  // getUser$ = this.update$.pipe(
  //   ofAction(actions.GetUser),
  //   switchMap(user => this.userService.getUser(user.payload)),
  //   map(response => {
  //     return new actions.GetUserSuccess(response);
  //   })
  // );

  // @Effect()
  // authUser$ = this.update$.pipe(
  //   ofAction(actions.AuthUser),
  //   switchMap(data => this.userService.authUser(data.payload)),
  //   map(response => {
  //     console.log('user effects authUser response');
  //     console.log(response);
  //     this.router.navigate([`/dashboard`]);
  //   })
  // );
}
