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
    TOKEN_EXPIRED
} from '../../constants/reducers-constants';
import { Company } from '../models/Company';

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
    constructor() { }
}

export class GetUsersSuccess implements Action {
    readonly type = GET_USERS_SUCCESS;
    constructor(public payload: any) { }
}

export class TokenExpired implements Action {
    readonly type = TOKEN_EXPIRED;
    constructor() { }
}
