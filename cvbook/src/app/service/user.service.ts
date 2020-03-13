import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

import { catchError, tap, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import * as conn from '../../constants/server-urls';
import { CookieService } from './cookie.service';

@Injectable()
export class UserService {

    // private serverURL = conn.PUBLIC_SERVER_DAMJAN + 'users/';
    // private serverURL = conn.LOCAL_SERVER + 'users/';
    private serverURL = conn.PUBLIC_SERVER + 'users/';

    constructor(
        private http: HttpClient,
        private httpService: HttpService) {}

    getUser(id: any): Observable<any> {
        const url = `${this.serverURL}getbyid`;
        return this.http.post<any>(url, { 'userID': id }, this.httpService.httpOptions()).pipe(
            catchError(this.handleError<any>(`getUser id=${id}`))
        );
    }

    getUsers(): Observable<any> {
        const url = `${this.serverURL}`;
        return this.http.post<any>(url, {}, this.httpService.httpOptions()).pipe(
            catchError(this.handleError<any>('getUsers'))
        );
    }

    filterUsers(data: any): Observable<any> {
        const url = `${this.serverURL}filter`;
        return this.http.post<any>(url, data, this.httpService.httpOptions()).pipe(
            catchError(this.handleError<any>('filterUsers'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
