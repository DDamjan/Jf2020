import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError, tap, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import * as conn from '../../constants/server-urls';
import { CookieService } from './cookie.service';

@Injectable()
export class CompanyService {

    // private serverURL = conn.LOCAL_SERVER + 'kompanija/';
    private serverURL = conn.LOCAL_SERVER + 'kompanija/';

    constructor(
        private http: HttpClient,
        private httpService: HttpService) { }


    /* GET user by id. */
    getCompany(payload: any): Observable<any> {
        const url = `${this.serverURL}?id=${payload.id}&auth=${payload.auth}`;
        return this.http.get<any>(url).pipe(
            catchError(this.handleError<any>(`getCompany id=${payload.id}`))
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
    authCompany(data: object): Observable<any> {
        const url = `${this.serverURL}auth`;
        return this.http.post<any>(url, data, this.httpService.httpOptions()).pipe(
            catchError(this.handleError<any>('authCompany'))
        );
    }

     /* POST: Check the username */
     checkUsername(data: object): Observable<boolean> {
        const url = `${this.serverURL}checkuser`;
        return this.http.post<boolean>(url, data, this.httpService.httpOptions()).pipe(
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
