import * as fromUser from './user.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
    user: fromUser.UserState;
}

export const reducers: ActionReducerMap<State> = {
    user: fromUser.UserReducer
};

