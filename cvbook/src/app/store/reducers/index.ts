import * as fromUser from './user.reducer';
import * as fromUsers from './users.reducer';
import * as fromCompany from './company.reducer';
import * as fromChart from './charts.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
    user: fromUser.UserState;
    users: fromUsers.UsersState;
    company: fromCompany.CompanyState;
    chart: fromChart.ChartState;
}

export const reducers: ActionReducerMap<State> = {
    user: fromUser.UserReducer,
    users: fromUsers.UsersReducer,
    company: fromCompany.CompanyReducer,
    chart: fromChart.ChartReducer
};

