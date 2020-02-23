import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, tap, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import * as conn from '../../constants/server-urls';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    private serverURL = conn.LOCAL_SERVER + 'user/';

    constructor(
        private http: HttpClient) { }

    /* GET user by id. */
    getUser(payload: any): Observable<any> {
        const url = `${this.serverURL}?id=${payload.id}&auth=${payload.auth}`;
        return this.http.get<any>(url).pipe(
            catchError(this.handleError<any>(`getUser id=${payload.id}`))
        );
    }

    getUsers(data: any): Observable<any> {
        const url = `${this.serverURL}getUsers`;
        return this.http.post<any>(url, data, httpOptions).pipe(
            catchError(this.handleError<any>('getUsers'))
        );
    }

    // /* GET last ID */
    // getLastID(): Observable<any> {
    //     const url = `${this.serverURL}currentid`;
    //     return this.http.get<any>(url).pipe(
    //         catchError(this.handleError<any>('getLastID'))
    //     );
    // }

    /* POST: Authenticate a user */
    authUser(data: object): Observable<any> {
        const url = `${this.serverURL}auth`;
        return this.http.post<any>(url, data, httpOptions).pipe(
            catchError(this.handleError<any>('authUser'))
        );
    }

     /* POST: Check the username */
     checkUsername(data: object): Observable<boolean> {
        const url = `${this.serverURL}checkuser`;
        return this.http.post<boolean>(url, data, httpOptions).pipe(
            catchError(this.handleError<boolean>('authUser'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
