import * as fromUser from './user.reducer';
import * as fromCompany from './company.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
    user: fromUser.UserState;
    company: fromCompany.CompanyState;
}

export const reducers: ActionReducerMap<State> = {
    user: fromUser.UserReducer,
    company: fromCompany.CompanyReducer
};

