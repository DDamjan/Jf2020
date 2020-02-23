import { Action } from '@ngrx/store';
import {
    GET_COMPANY,
    GET_COMPANY_SUCCESS,
    AUTH_COMPANY,
    AUTH_COMPANY_SUCCESS,
    AUTH_COMPANY_FAIL
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
