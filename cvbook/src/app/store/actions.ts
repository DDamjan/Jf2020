import { Action } from '@ngrx/store';
import {
    ADD_DRIVER,
    DELETE_DRIVER,
    UPDATE_DRIVER,
    ADD_DRIVER_SUCCESS,
    GET_DRIVERS,
    GET_DRIVERS_SUCCESS,
    UPDATE_DRIVER_SUCCESS,
    DELETE_DRIVER_SUCCESS,
    GET_USER,
    GET_USER_SUCCESS,
    AUTH_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAIL,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    CANCEL_RIDE,
    CANCEL_RIDE_SUCCESS,
    REQUEST_RIDE,
    REQUEST_RIDE_SUCCESS,
    ACCEPT_RIDE,
    ACCEPT_RIDE_SUCCESS,
    ARRIVE,
    ARRIVE_SUCCESS
} from '../../constants/reducers-constants';
import { User } from '../models/User';

export class GetUser implements Action {
    readonly type = GET_USER;
    constructor(public payload: any) { }
}

export class GetUserSuccess implements Action {
    readonly type = GET_USER_SUCCESS;
    constructor(public payload: User) { }
}

export class AuthUser implements Action {
    readonly type = AUTH_USER;
    constructor(public payload: object) { }
}

export class AuthUserSuccess implements Action {
    readonly type = AUTH_USER_SUCCESS;
    constructor(public payload: User) { }
}

export class AuthUserFail implements Action {
    readonly type = AUTH_USER_FAIL;
    constructor(public payload: User) { }
}

export class RegisterUser implements Action {
    readonly type = REGISTER_USER;
    constructor(public payload: User) { }
}

export class RegisterUserSuccess implements Action {
    readonly type = REGISTER_USER_SUCCESS;
    constructor(public payload: User) { }
}

export class UpdateUser implements Action {
    readonly type = UPDATE_USER;
    constructor(public payload: any) { }
}

export class UpdateUserSuccess implements Action {
    readonly type = UPDATE_USER_SUCCESS;
    constructor(public payload: User) { }
}

export class CancelRide implements Action {
    readonly type = CANCEL_RIDE;
    constructor(public payload: any) { }
}

export class CancelRideSuccess implements Action {
    readonly type = CANCEL_RIDE_SUCCESS;
    constructor(public payload: any) { }
}

export class RequestRide implements Action {
    readonly type = REQUEST_RIDE;
    constructor(public payload: any) { }
}

export class RequestRideSuccess implements Action {
    readonly type = REQUEST_RIDE_SUCCESS;
    constructor(public payload: any) { }
}

export class AcceptRide implements Action {
    readonly type = ACCEPT_RIDE;
    constructor(public payload: any) { }
}

export class AcceptRideSuccess implements Action {
    readonly type = ACCEPT_RIDE_SUCCESS;
    constructor(public payload: any) { }
}

export class Arrive implements Action {
    readonly type = ARRIVE;
    constructor(public payload: any) { }
}

export class ArriveSuccess implements Action {
    readonly type = ARRIVE_SUCCESS;
    constructor(public payload: any) { }
}
