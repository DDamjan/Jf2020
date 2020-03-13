import { Action } from '@ngrx/store';
import {
    GET_COMPANY,
    GET_COMPANY_SUCCESS,
    AUTH_COMPANY,
    AUTH_COMPANY_SUCCESS,
    AUTH_COMPANY_FAIL,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_CHART,
    GET_CHART_SUCCESS,
    GET_CHART_CV,
    GET_CHART_CV_SUCCESS,
    GET_CHART_TOP10,
    GET_CHART_TOP10_SUCCESS,
    GET_CHART_TOTAL_USERS,
    GET_CHART_TOTAL_USERS_SUCCESS,
    TOKEN_EXPIRED,
    FILTER_USERS,
    FILTER_USERS_SUCCESS,
    FILTER_USERS_EMPTY
} from '../../constants/reducers-constants';
import { Company } from '../models/Company';
import { Chart } from '../models/Chart';

export class GetCompany implements Action {
    readonly type = GET_COMPANY;
    constructor(public payload: any) { }
}

export class GetCompanySuccess implements Action {
    readonly type = GET_COMPANY_SUCCESS;
    constructor(public payload: Company) { }
}

export class AuthCompany implements Action {
    readonly type = AUTH_COMPANY;
    constructor(public payload: object) { }
}

export class AuthCompanySuccess implements Action {
    readonly type = AUTH_COMPANY_SUCCESS;
    constructor(public payload: Company) { }
}

export class AuthCompanyFail implements Action {
    readonly type = AUTH_COMPANY_FAIL;
    constructor(public payload: Company) { }
}



export class GetUser implements Action {
    readonly type = GET_USER;
    constructor(public payload: any) { }
}

export class GetUserSuccess implements Action {
    readonly type = GET_USER_SUCCESS;
    constructor(public payload: any) { }
}

export class GetUsers implements Action {
    readonly type = GET_USERS;
    constructor(public payload: any) { }
}

export class GetUsersSuccess implements Action {
    readonly type = GET_USERS_SUCCESS;
    constructor(public payload: any) { }
}

export class FilterUsers implements Action {
    readonly type = FILTER_USERS;
    constructor(public payload: any) { }
}

export class FilterUsersSuccess implements Action {
    readonly type = FILTER_USERS_SUCCESS;
    constructor(public payload: any) { }
}

export class FilterUsersEmpty implements Action {
    readonly type = FILTER_USERS_EMPTY;
    constructor() { }
}

// ------------------------------------------------------------------------------

export class GetChart implements Action {
    readonly type = GET_CHART;
    constructor(public payload: any) { }
}

export class GetChartSuccess implements Action {
    readonly type = GET_CHART_SUCCESS;
    constructor(public payload: Chart[]) { }
}

export class GetChartCV implements Action {
    readonly type = GET_CHART_CV;
    constructor(public payload: any) { }
}

export class GetChartCVSuccess implements Action {
    readonly type = GET_CHART_CV_SUCCESS;
    constructor(public payload: Chart) { }
}

export class GetChartTop10 implements Action {
    readonly type = GET_CHART_TOP10;
    constructor(public payload: any) { }
}

export class GetChartTop10Success implements Action {
    readonly type = GET_CHART_TOP10_SUCCESS;
    constructor(public payload: Chart) { }
}

export class GetChartTotalUsers implements Action {
    readonly type = GET_CHART_TOTAL_USERS;
    constructor(public payload: any) { }
}

export class GetChartTotalUsersSuccess implements Action {
    readonly type = GET_CHART_TOTAL_USERS_SUCCESS;
    constructor(public payload: Chart) { }
}

// ------------------------------------------------------------------------------

export class TokenExpired implements Action {
    readonly type = TOKEN_EXPIRED;
    constructor() { }
}
