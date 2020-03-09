import * as fromUser from './user.reducer';
import * as fromUsers from './users.reducer';
import * as fromCompany from './company.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
    user: fromUser.UserState;
    users: fromUsers.UsersState;
    company: fromCompany.CompanyState;
}

export const reducers: ActionReducerMap<State> = {
    user: fromUser.UserReducer,
    users: fromUsers.UsersReducer,
    company: fromCompany.CompanyReducer
};

