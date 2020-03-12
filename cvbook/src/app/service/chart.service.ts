import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError, tap, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import * as conn from '../../constants/server-urls';
import { CookieService } from './cookie.service';

@Injectable()
export class ChartService {

    // private serverURL = conn.PUBLIC_SERVER_DAMJAN + 'kompanija/';
    private serverURL = conn.LOCAL_SERVER + 'kompanija/';

    constructor(
        private http: HttpClient,
        private httpService: HttpService) { }


    /* GET user by id. */
    getChart(): Observable<any> {
        const url = `${this.serverURL}`;
        return this.http.get<any>(url).pipe(
            catchError(this.handleError<any>(`getChart`))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
